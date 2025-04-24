"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { navItems } from "@/lib/constants";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const t = useTranslations("navitems");
  const paths = usePathname()
    .split("/")
    .filter((path) => path);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.length == 0 && (
          <BreadcrumbItem>
            <BreadcrumbPage>{t("dashboard")}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
        {paths.length >= 1 && (
          <>
            <BreadcrumbLink href="/">{t("dashboard")}</BreadcrumbLink>
            <BreadcrumbSeparator />
          </>
        )}
        {paths.map((path, index) => {
          const page = navItems.find((item) => item.href === "/" + path);
          return (
            <BreadcrumbItem key={index}>
              {index === paths.length - 1 ? (
                <BreadcrumbPage>{t(page?.lable)}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink href={page?.href}>
                    {t(page?.lable)}
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
