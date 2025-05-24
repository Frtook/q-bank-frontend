import { User, CheckCircle, XCircle, Shield } from "lucide-react";
import UpdateUserDialog from "./dialogs/updateUser";
import { useGetOneUserPermission } from "@/hooks/permission/useUserPermission";

export const UserProfileCard = ({ id }: { id: string }) => {
  const { data: user, isLoading } = useGetOneUserPermission(id);
  if (isLoading) {
    return (
      <div className="h-32 w-full animate-pulse rounded-xl bg-gray-300"></div>
    );
  }
  if (user)
    return (
      <div className="w-full space-y-4 rounded-xl bg-white p-6 shadow-md dark:bg-secondary">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <User className="h-8 w-8 text-gray-500 dark:text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {user.fullname}
              </h2>
              <p className="text-gray-500 dark:text-white">@{user.username}</p>
            </div>
          </div>

          <UpdateUserDialog
            user={user}
            id={id}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            {user.is_active ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-green-600">Active</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-600">Inactive</span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            <span className="text-purple-600 dark:text-purple-400">
              {user.is_superuser ? "Admin" : "Not Admin"}
            </span>
          </div>
        </div>
      </div>
    );
};
