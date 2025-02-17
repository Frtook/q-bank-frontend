import Header from "@/components/header";
import Button from "@/components/ui/button";
import TooltipDemo from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div className="">
      <h1>{t("title")}</h1>
      <div className="flex gap-4">
        <Button variant="primary" className="px-6 py-3">Primary</Button>
        <Button variant="secondary" className="px-6 py-3">Secondary</Button>
        <Button variant="destructive" className="px-6 py-3">Destractive</Button>
        <Button variant="disabled" className="px-6 py-3">Disabled</Button>
        <div className="flex items-center gap-4">
          <TooltipDemo className="" content={"This is tooltip"} direction="right" />
          <TooltipDemo content={"This is tooltip"} direction="left" />
          <TooltipDemo content={"This is tooltip"} direction="top" />
          <TooltipDemo content={"This is tooltip"} direction="bottom" />
        </div>

      </div>
    </div>

)
}
