import React from "react";
import {
  MdOutlineTopic,
  MdQuestionAnswer,
  MdOutlineCheckCircle,
  MdOutlineCancel,
} from "react-icons/md";
import { IoIosInformationCircleOutline, IoMdSettings } from "react-icons/io";
import { GrStatusGood } from "react-icons/gr";
import { RxLapTimer } from "react-icons/rx";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GoNumber } from "react-icons/go";

export default function QuestionDetails() {
  return (
    <>
      {/* Ibrahim - Show this card if question is MCQ */}
      <div className="w-full rounded-xl bg-white p-6 shadow-md dark:bg-[#18181b]">
        <div className="space-y-4">
          {/* Question */}
          <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white">
            <MdQuestionAnswer className="text-2xl text-primary" />
            <span>What is 1 + 1?</span>
          </div>

          {/* Answers */}
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-lg text-green-600 dark:text-green-400">
              <MdOutlineCheckCircle className="text-xl" />
              <span>1) Equal 2</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-red-600 dark:text-red-400">
              <MdOutlineCancel className="text-xl" />
              <span>2) Equal 3</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-red-600 dark:text-red-400">
              <MdOutlineCancel className="text-xl" />
              <span>3) Equal 3</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-red-600 dark:text-red-400">
              <MdOutlineCancel className="text-xl" />
              <span>4) Equal 4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Second Card – Question Info and Settings */}
      <div className="h-fit w-full rounded-lg bg-white p-4 shadow-sm dark:bg-[#18181b]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Header */}
          <div className="col-span-2 w-full border-b border-[#A2A1A833]">
            <div className="flex w-fit items-center gap-2 border-b-4 border-primary pb-2">
              <IoIosInformationCircleOutline className="h-7 w-7 text-primary" />
              <h2 className="text-xl font-medium text-gray-800 dark:text-white">
                Question Info
              </h2>
            </div>
          </div>

          {/* Question */}
          <div className="col-span-2 flex flex-col gap-2">
            <h1 className="border-b border-[#A2A1A833] pb-1 text-lg text-[#A2A1A8] dark:text-[#A2A1A8]">
              Question
            </h1>
            <p className="text-gray-900 dark:text-gray-200">
              Question text ...
            </p>
          </div>

          {/* Hint */}
          <div className="col-span-2 flex flex-col gap-2">
            <h1 className="border-b border-[#A2A1A833] pb-1 text-lg text-[#A2A1A8] dark:text-[#A2A1A8]">
              Question Hint
            </h1>
            <p className="text-gray-900 dark:text-gray-200">
              Question hint text ...
            </p>
          </div>

          {/* Settings Header */}
          <div className="col-span-2 mt-3 w-full border-b border-[#A2A1A833]">
            <div className="flex w-fit items-center gap-2 border-b-4 border-primary pb-2">
              <IoMdSettings className="h-7 w-7 text-primary" />
              <h2 className="text-xl font-medium text-gray-800 dark:text-white">
                Question Settings
              </h2>
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <MdQuestionAnswer />
              <h1 className="w-full border-b border-[#A2A1A833] pb-1 text-lg text-[#A2A1A8] dark:text-[#A2A1A8]">
                Answers
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <MdOutlineCheckCircle className="text-xl" />
                <span>1) Equal 2</span>
              </div>
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <MdOutlineCancel className="text-xl" />
                <span>2) Equal 3</span>
              </div>
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <MdOutlineCancel className="text-xl" />
                <span>3) Equal 3</span>
              </div>
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <MdOutlineCancel className="text-xl" />
                <span>4) Equal 4</span>
              </div>
            </div>
          </div>

          {/* Topic */}
          <div className="col-span-2 flex flex-col gap-2 lg:col-span-1">
            <div className="flex items-center gap-1">
              <MdOutlineTopic />
              <h1 className="w-full border-b border-[#A2A1A833] pb-1 text-lg text-[#A2A1A8] dark:text-[#A2A1A8]">
                Topic
              </h1>
            </div>
            <p className="text-gray-900 dark:text-gray-200">Topic Name</p>
          </div>

          {/* Status */}
          <div className="col-span-2 flex flex-col gap-2 lg:col-span-1">
            <div className="flex items-center gap-1">
              <GrStatusGood />
              <h1 className="w-full border-b border-[#A2A1A833] pb-1 text-lg text-[#A2A1A8] dark:text-[#A2A1A8]">
                Question Status
              </h1>
            </div>
            <p className="w-fit rounded-md bg-green-200 px-4 py-1 text-green-600 dark:bg-green-500 dark:text-green-200">
              active
            </p>
          </div>

          {/* Time */}
          <div className="col-span-2 flex flex-col gap-2 lg:col-span-1">
            <div className="flex items-center gap-1">
              <RxLapTimer />
              <h1 className="w-full border-b border-[#A2A1A833] pb-1 text-lg text-[#A2A1A8] dark:text-[#A2A1A8]">
                Period Of Time
              </h1>
            </div>
            <p className="text-gray-900 dark:text-gray-200">3 minutes</p>
          </div>

          {/* Question Type */}
          <div className="col-span-2 flex flex-col gap-2 lg:col-span-1">
            <div className="flex items-center gap-1">
              <BiSolidCategoryAlt />
              <h1 className="w-full border-b border-[#A2A1A833] pb-1 text-lg text-[#A2A1A8] dark:text-[#A2A1A8]">
                Question Type
              </h1>
            </div>
            <p className="text-gray-900 dark:text-gray-200">True or False</p>
          </div>

          <div className="col-span-2 flex flex-col gap-2 lg:col-span-1">
            <div className="flex items-center gap-1">
              <GoNumber />
              <h1 className="w-full border-b border-[#A2A1A833] pb-1 text-lg text-[#A2A1A8] dark:text-[#A2A1A8]">
                Difficulty Level
              </h1>
            </div>
            <p className="text-gray-900 dark:text-gray-200">3/10</p>
          </div>
        </div>
      </div>
    </>
  );
}
