// import { cn } from "@/lib/utils";
// import { Check, ChevronsUpDown } from "lucide-react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { Button } from "./ui/button";
// type Props = {
//   value:number;
//   name:string
// }
// export default function SelectMeue({value , name}:Props) {
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             className={cn(
//               "w-full justify-between",
//               !field.value && "text-muted-foreground"
//             )}
//           >
//             {field.value
//               ? academies?.find((academy) => academy.id === Number(field.value))
//                   ?.name
//               : "Select Academy"}
//             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-full p-0">
//         <Command>
//           <CommandInput placeholder="Search Academy..." />
//           <CommandList>
//             <CommandEmpty>No Academy found.</CommandEmpty>
//             <CommandGroup>
//               {academies?.map((academy) => (
//                 <CommandItem
//                   value={academy.name}
//                   key={academy.id}
//                   onSelect={() => {
//                     form.setValue("academy", academy.id);
//                   }}
//                 >
//                   <Check
//                     className={cn(
//                       "mr-2 h-4 w-4",
//                       academy.id === field.value ? "opacity-100" : "opacity-0"
//                     )}
//                   />
//                   {academy.name}
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }
