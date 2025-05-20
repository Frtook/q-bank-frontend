"use client";
import { ClipboardList, User, Activity, Clock, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DataItem {
  id: number;
  exam: string;
  user: string;
  action: string;
  time: string;
}

interface ActivityCardProps {
  data: DataItem[];
  loading?: boolean;
  onDelete?: (id: number) => void;
}

export default function ActivityCard({
  data,
  loading = false,
  onDelete,
}: ActivityCardProps) {
  if (loading) {
    return (
      <div className="mx-auto max-w-4xl animate-pulse px-4 py-6">
        <div className="grid gap-4 md:gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-gray-200" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-200" />
                  <div className="h-3 w-2/3 rounded bg-gray-200" />
                  <div className="h-3 w-1/4 rounded bg-gray-200" />
                </div>
                <div className="h-6 w-6 rounded-md bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="grid gap-4 md:gap-6">
        {data?.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-100 p-2 md:p-3">
                <ClipboardList className="h-5 w-5 text-blue-600 md:h-6 md:w-6" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate text-base font-semibold text-gray-900 md:text-lg">
                    {item.exam}
                  </h3>
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item.id)}
                      className="rounded-full p-1.5 transition-colors hover:bg-red-50"
                      aria-label="Delete item"
                    >
                      <Trash2 className="h-4 w-4 text-red-600 md:h-5 md:w-5" />
                    </button>
                  )}
                </div>

                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{item.user}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Activity className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{item.action}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span>
                      {formatDistanceToNow(new Date(item.time), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
