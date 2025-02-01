import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieLocate = (await cookies()).get("locale")?.value || "en";
  const locale = cookieLocate;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
