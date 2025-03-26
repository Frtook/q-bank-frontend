import { Button } from "@/components/ui/button";
import TooltipDemo from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div className="">
      <h1>{t("title")}</h1>
      <div className="flex gap-4">
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destractive</Button>
        {/* <Button variant="disabled" className="px-6 py-3"> // NOT Implemented
          Disabled
        </Button> */}
        <div className="flex items-center gap-4">
          <TooltipDemo
            className=""
            content={"This is tooltip"}
            direction="right"
          />
          <TooltipDemo
            content={"This is tooltip"}
            direction="left"
          />
          <TooltipDemo
            content={"This is tooltip"}
            direction="top"
          />
          <TooltipDemo
            content={"This is tooltip"}
            direction="bottom"
          />
        </div>
      </div>
    </div>
  );
}
