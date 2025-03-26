import { CloudUpload } from "lucide-react";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
  id: string;
  url?: string;
  file?: File;
};

export default function UploadFile({ children, id, url, file }: Props) {
  return (
    <div className="flex h-52 w-full items-center justify-center">
      <label
        htmlFor={id}
        className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-800"
      >
        {url && !file && (
          <Image
            alt="logo"
            className="h-52 w-full bg-cover"
            src={url}
            width={50}
            height={50}
          />
        )}
        {file && (
          <Image
            src={URL.createObjectURL(file)}
            className="h-52 w-full bg-cover"
            alt="logo"
            width={50}
            height={50}
          />
        )}
        {!url && !file && (
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <CloudUpload
              className="my-2"
              size={30}
            />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="px-2 font-semibold">Click to upload</span>
              or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or jpeg (MAX. 3MB)
            </p>
          </div>
        )}

        {children}
      </label>
    </div>
  );
}
