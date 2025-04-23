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
import { usePathname } from "next/navigation";
const Breadcrumbs = () => {
  const paths = usePathname()
    .split("/")
    .filter((path) => path);
  console.log(paths);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.length == 0 && (
          <BreadcrumbItem>
            <BreadcrumbPage>Dashbord</BreadcrumbPage>
          </BreadcrumbItem>
        )}
        {paths.length >= 1 && (
          <>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            <BreadcrumbSeparator />
          </>
        )}
        {paths.map((path, index) => {
          const page = navItems.find((item) => item.href === "/" + path);
          return (
            <BreadcrumbItem key={index}>
              {index === paths.length - 1 ? (
                <BreadcrumbPage>{page?.lable}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink href={page?.href}>
                    {page?.lable}
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
