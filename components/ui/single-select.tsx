// src/components/single-select.tsx

import * as React from "react";
import { ChevronDown, XIcon, Circle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type Props = {
  options: {
    label: string;
    value: string;
    icon?: React.ElementType;
  }[];
  onValueChange: (value: string | null) => void;
  initialValue?: string | null;
  placeholder?: string;
  modalPopover?: boolean;
};
export const SingleSelect = ({
  options,
  onValueChange,
  initialValue,
  placeholder = "Select an option",
  modalPopover = false,
  ...props
}: Props) => {
  const [selected, setSelected] = React.useState<string | null>(
    initialValue || null
  );
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    onValueChange(value);
    setIsPopoverOpen(false);
  };

  const handleClear = () => {
    setSelected(null);
    onValueChange(null);
  };

  const selectedOption = options.find((opt) => opt.value === selected);

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
      modal={modalPopover}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          {...props}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          className="flex h-auto min-h-10 w-[250px] items-center justify-between rounded-md border p-2 text-sm"
        >
          {selectedOption ? (
            <>
              <div className="flex items-center gap-2">
                {selectedOption.icon && (
                  <selectedOption.icon className="h-4 w-4" />
                )}
                {selectedOption.label}
              </div>
              <div className="flex items-center gap-1">
                <XIcon
                  className="h-4 w-4 cursor-pointer text-muted-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                />
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[250px] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  className="cursor-pointer"
                  onSelect={() => handleSelect(opt.value)}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-primary",
                      selected === opt.value ? "bg-primary" : ""
                    )}
                  >
                    {selected === opt.value && (
                      <Circle className="h-2 w-2 fill-black" />
                    )}
                  </div>
                  {opt.icon && (
                    <opt.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  )}
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
