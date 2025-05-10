"use client";
import CardIcon from "@/components/card-icon";
import { useGetDocument } from "@/hooks/useDocument";
import { FileText } from "lucide-react";
import Image from "next/image";
import { useGetSubject } from "@/hooks/subject/useSubject";
import DeleteDialog from "@/components/DeleteDialog";
import AddDocumentDialog from "./dialogs/AddDocument";

export default function Ai() {
  const { data } = useGetDocument();
  const { data: subjects } = useGetSubject();
  return (
    <div>
      <div className="mb-5 grid grid-cols-1 gap-3 lg:grid-cols-3">
        <CardIcon
          count={data?.length}
          title="Totla Outcoem"
          icon={<FileText />}
        />
      </div>
      <AddDocumentDialog />
      {data?.length === 0 && <p className="mt-5 text-center">No File Found</p>}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {data?.map((file) => (
          <div
            key={file.id}
            className="flex justify-between bg-white p-4"
          >
            <div className="flex items-center gap-5 rounded-2xl">
              <Image
                src="/images/pdf.png"
                alt="pdf"
                width={100}
                height={200}
              />
              <div>
                <p className="font-bold">{file.name} </p>
                <p className="text-gray-500">
                  {subjects?.find((subject) => subject.id === file.id)?.name}
                </p>
              </div>
            </div>
            <DeleteDialog
              id={file.id}
              mutationKey="document"
              url="/bank/document"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
