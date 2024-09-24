import { Divider, Skeleton } from "@nextui-org/react";

const DetailsModalSkeleton = () => {
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center space-x-4 space-x-reverse">
          <Skeleton className="h-28 w-28 rounded-full" />
          <div className="flex flex-col gap-4">
            <h4 className="text-xl font-semibold">
              <Skeleton className="h-4 w-[250px] rounded-full" />
            </h4>
            <p className="text-sm text-muted-foreground">
              <Skeleton className="h-4 w-[200px] rounded-full" />
            </p>
          </div>
        </div>
        <Divider />
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex flex-col gap-4">
            <div>
              <Skeleton className="h-4 w-[350px] rounded-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-[200px] rounded-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-[200px] rounded-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-[80px] rounded-full" />
              <Skeleton className="h-6 w-[80px] rounded-full" />
            </div>
          </div>
        </div>
        <Divider />
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex flex-col gap-4">
            <div>
              <Skeleton className="h-4 w-[350px] rounded-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-[350px] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsModalSkeleton;
