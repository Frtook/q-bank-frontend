"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetProfile } from "@/hooks/useProfile";
import { logoutAction } from "@/lib/helperServer";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserIcon() {
  const { data: profile } = useGetProfile();
  const router = useRouter();
  const logout = async () => {
    logoutAction();
    router.push("/login");
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="rounded-3xl bg-gray-200 p-2 dark:bg-primary">
          <User />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-52"
      >
        <div>
          <div className="flex items-center gap-2 rounded-md bg-white p-2 shadow-sm dark:bg-primary">
            <User />
            <p className="text-sm font-semibold">
              {profile?.username || "..."}
            </p>
          </div>

          <div
            className="mt-2 flex cursor-pointer justify-center gap-3 px-4"
            onClick={() => logout()}
          >
            <LogOut className="text-red-600" />
            <p>Logout</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
