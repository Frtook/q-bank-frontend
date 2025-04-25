"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { ComponentPropsWithoutRef, forwardRef } from "react";

interface SelectProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  placeholder?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ placeholder = "Select...", options, ...props }, ref) => {
    return (
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          ref={ref}
          className="hover:border-primary-500 flex h-12 w-full items-center justify-between rounded-md border border-gray-300 bg-transparent bg-white px-4 py-2 text-sm text-gray-700 transition-all duration-300 ease-in-out focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-[#19191d] dark:text-gray-300"
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-5 w-5 text-gray-500 opacity-70 transition-transform duration-200 group-data-[state=open]:rotate-180 dark:text-gray-300" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            className="relative z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md bg-white shadow-xl animate-in fade-in-80 dark:bg-[#19191d]"
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="group relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-4 text-sm text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-primary"
                >
                  <SelectPrimitive.ItemText className="truncate">
                    {option.label}
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <Check className="h-5 w-5 text-black opacity-0 transition-opacity group-data-[state=checked]:opacity-100 dark:text-white" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  }
);

Select.displayName = "Select";

export { Select };
