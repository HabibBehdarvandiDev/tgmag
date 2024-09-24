import { Skeleton } from "@nextui-org/react";

const EditeButtonSkeleton = () => {
  return (
    <>
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-4 w-[150px] rounded-full" />
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-4 w-[150px] rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-4 w-[150px] rounded-full" />
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-6 w-full rounded-lg" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-[120px] rounded-lg" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-4 w-[150px] rounded-full" />
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-4 w-[150px] rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-6 w-[200px] rounded-lg" />
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-6 w-[200px] rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          <Skeleton className="h-10 w-[100px] rounded-lg" />
        </div>
      </div>
    </>
  );
};

export default EditeButtonSkeleton;
