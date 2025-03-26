import * as React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface TooltipProps {
  content: string;
  direction?: "top" | "bottom" | "left" | "right";
  className?: string;
  children?: React.ReactNode;
}

const TooltipComponent: React.FC<TooltipProps> = ({
  content,
  direction = "top",
  className,
  children,
}) => {
  return (
    <Tooltip.Provider delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children || (
            <QuestionMarkCircledIcon className="h-5 w-5 cursor-pointer" />
          )}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={direction}
            sideOffset={5}
            className={twMerge(
              clsx(
                "z-50 select-none rounded-lg bg-[#0A214C] px-4 py-2 text-sm text-white shadow-lg transition-opacity duration-200 ease-out will-change-[transform,opacity]",
                "data-[state=closed]:opacity-0 data-[state=delayed-open]:opacity-100",
                "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
                "data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
                "data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade",
                "data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade",
                className // Allow custom class overrides
              )
            )}
          >
            {content}
            <Tooltip.Arrow className="fill-[#0A214C]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipComponent;
