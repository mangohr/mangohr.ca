import React from "react";

export default function OrgFormSkeleton() {
  return (
    <div className="flex flex-1 animate-pulse flex-col space-y-6 px-6 py-12">
      <div className="grid grid-cols-3 items-end gap-6">
        <div className="col-span-2 space-y-4">
          <div className="h-8 w-96 bg-border/50" />
          <div className="h-12 w-full bg-border/50" />
        </div>
        <div>
          <div className="h-12 w-full bg-border/50" />
        </div>
      </div>
      <div className="flex-1 bg-border/50"></div>
    </div>
  );
}
