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
import { useDeleteSubject } from "@/hook/useSubject";

export default function DeleteDialog({ id }: { id: number }) {
  const { mutate: DeleteSubject } = useDeleteSubject();

  const deleteSubject = (id: number) => {
    DeleteSubject(id);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="mt-4"
          variant="destructive"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
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
                  onClick={() => deleteSubject(id)}
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
