"use client";

const Breadcrumb = () => {
  return (
    <nav
      aria-label="breadcrumb"
      className="w-full"
    >
      <ol className="flex space-x-2">
        <li>
          <p className="text-[#16151C] dark:text-[#EAEAEA]">Home</p>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
