import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import apiClient from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Trash } from "lucide-react";
import { toast } from "sonner";
type Props = {
  id: number;
  url: string;
  mutationKey: string;
};
export default function DeleteDialog({ id, url, mutationKey }: Props) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: async (id: number) => apiClient.delete(`${url}/${id}/`),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [mutationKey] });
      toast.dismiss();
      toast.success("Delete Success");
      return data;
    },
    onError: (error: AxiosError) => {
      toast.dismiss();
      toast.error(
        (error.response?.data as { detail: string })?.detail || error.message
      );
      return error;
    },
  });
  const deleteAcademy = (id: number) => {
    mutate(id);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash
          style={{ width: "20px", height: "20px" }}
          className="cursor-pointer text-red-600"
        />
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Are you sure to delete this academy</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-5">
              <p>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </p>
              <DialogClose asChild>
                <Button
                  className="self-center"
                  onClick={() => deleteAcademy(id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </DialogClose>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
