import { Check, CloudUpload } from "lucide-react";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
  id: string;
  file: File;
  url?: string;
};

export default function UploadFile({ children, file, id, url }: Props) {
  return (
    <div className="flex items-center justify-center w-full ">
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {file ? (
            <>
              {url ? (
                <Image alt="logo" src={url} width={50} height={50} />
              ) : (
                <Check className="my-2" />
              )}
              <p>{file.name.slice(0, 25)}</p>
            </>
          ) : (
            <>
              <CloudUpload className="my-2" size={30} />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold px-2">Click to upload</span>
                or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or jpeg (MAX. 3MB)
              </p>
            </>
          )}
        </div>
        {children}
      </label>
    </div>
  );
}
