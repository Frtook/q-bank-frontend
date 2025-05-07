import React from "react";

type Props = {
  title: string | undefined;
  count: number | string | undefined;
  icon?: React.ReactNode;
};
export default function CardIcon({ title, count, icon }: Props) {
  return (
    <div className="flex h-36 w-full flex-col gap-6 rounded-xl bg-white p-4 shadow-sm dark:bg-secondary">
      <div className="flex justify-between">
        <h3 className="text-base font-bold text-[#181D27] dark:text-white">
          {title}
        </h3>
        {icon}
      </div>
      <span className="text-3xl font-bold text-[#181D27] dark:text-white">
        {count}
      </span>
    </div>
  );
}
