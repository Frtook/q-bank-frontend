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
    <div className="flex items-center justify-center w-full h-52">
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
      >
        {url && !file && (
          <Image
            alt="logo"
            className="w-full bg-cover h-52"
            src={url}
            width={50}
            height={50}
          />
        )}
        {file && (
          <Image
            src={URL.createObjectURL(file)}
            className="w-full bg-cover h-52"
            alt="logo"
            width={50}
            height={50}
          />
        )}
        {!url && !file && (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudUpload className="my-2" size={30} />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold px-2">Click to upload</span>
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
