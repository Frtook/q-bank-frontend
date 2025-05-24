"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useGetPermissionNested } from "@/hooks/permission/usePermissionNested";
import {
  useGetOneUserPermission,
  useUpdateUserPermission,
} from "@/hooks/permission/useUserPermission";
import { useEffect, useState } from "react";

export const UserPermissionsPanel = ({ id }: { id: string }) => {
  const { data: permission, isLoading: loadingPermission } =
    useGetPermissionNested();
  const {
    data: userPermission,
    isSuccess,
    isLoading,
  } = useGetOneUserPermission(id);
  const { mutate } = useUpdateUserPermission(id);
  const userPermissionID = userPermission?.user_permissions.map(
    (per) => per.id
  );
  const [switches, setSwitches] = useState<number[] | undefined>();

  useEffect(() => {
    if (userPermissionID) {
      setSwitches(userPermissionID);
    }
  }, [isSuccess]);
  const SwitchAuth = ({ id, name }) => {
    return (
      <div className="flex items-center gap-4 space-x-2">
        <Switch
          checked={switches?.includes(id)}
          onCheckedChange={(checked) => {
            if (checked) {
              setSwitches((prev) => [...(prev || []), id]);
            } else {
              setSwitches((prev) =>
                (prev || []).filter((permId) => permId !== id)
              );
            }
          }}
          id={String(id)}
        />
        <Label
          className="text-md cursor-pointer"
          htmlFor={String(id)}
        >
          {name}
        </Label>
      </div>
    );
  };

  if (isLoading || loadingPermission) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }
  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-4 rounded-xl bg-white p-6 md:grid-cols-2 xl:grid-cols-3">
        {permission?.map((object) => (
          <div
            key={object.model}
            className="rounded-2xl bg-gray-100 p-4"
          >
            <h1 className="mb-6 text-xl font-bold">{object.model}</h1>
            <div className="space-y-4">
              {object.permissions.map((perm) => (
                <SwitchAuth
                  id={perm.id}
                  name={perm.name}
                  key={perm.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-row-reverse">
        <Button onClick={() => mutate({ user_permissions: switches })}>
          Save
        </Button>
      </div>
    </>
  );
};
