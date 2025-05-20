"use client";
import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { useGetSubject } from "@/hooks/subject/useSubject";
import { useGetQuestion } from "@/hooks/subject/useQuestion";
import { sliceString } from "@/lib/helperClient";

const Breadcrumbs = () => {
  const t = useTranslations("navitems");
  const paths = usePathname()
    .split("/")
    .filter((path) => path);
  const locale = useLocale();
  const { data: subjects } = useGetSubject();
  const { data: question } = useGetQuestion({});
  const navItems = [
    {
      lable: "dashboard",
      href: "/",
    },
    {
      lable: "questions",
      href: "/questions",
    },
    {
      lable: "academy",
      href: "/academy",
    },
    {
      lable: "subject",
      href: "/subject",
    },
    {
      lable: "exams",
      href: "/exams",
    },
    {
      lable: "users",
      href: "/mange-users",
    },
    {
      lable: "settings",
      href: "/profile",
    },
  ];
  const getPath = (id: string): string => {
    if (subjects && question) {
      const subject = subjects?.find((sub) => String(sub.id) === id)?.name;
      if (subject) return sliceString(subject, 0, 10);

      const qusetion = question?.find((qus) => String(qus.id) === id)?.text;
      if (qusetion) return sliceString(qusetion, 0, 10);
      return id;
    }
    return "...";
  };
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-md">
        {paths.length == 0 && (
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Home style={{ width: "28px", height: "28px" }} />
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
        {paths.length >= 1 && (
          <>
            <BreadcrumbLink href="/">
              <Home style={{ width: "28px", height: "28px" }} />
            </BreadcrumbLink>
            <BreadcrumbSeparator
              className={`${locale === "ar" && "rotate-180"}`}
            />
          </>
        )}
        {paths.map((path, index) => {
          const page = navItems.find((item) => item.href === "/" + path);
          const isLast = index === paths.length - 1;
          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {page ? t(page.lable) : getPath(path)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={page?.href}>
                    {page ? t(page.lable) : getPath(path)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator
                  className={`${locale === "ar" && "rotate-180"}`}
                />
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
