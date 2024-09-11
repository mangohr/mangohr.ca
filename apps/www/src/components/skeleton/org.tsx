import React from "react";

export default function OrgFormSkeleton() {
  return (
    <div className="flex flex-1 animate-pulse flex-col space-y-6 px-6 py-12">
      <div className="grid grid-cols-3 items-end gap-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-border/50 h-8 w-96" />
          <div className="bg-border/50 h-12 w-full" />
        </div>
        <div>
          <div className="bg-border/50 h-12 w-full" />
        </div>
      </div>
      <div className="bg-border/50 flex-1"></div>
    </div>
  );
}
