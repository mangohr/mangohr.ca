import React from "react";

export default function Loading() {
  return (
    <div className="h-screen w-full max-w-screen-xl animate-pulse text-sm">
      <div className="flex h-screen gap-4">
        <div className="block w-[250px] border-r bg-border/40" />
        <div className="flex flex-1 flex-col space-y-8 p-8">
          <div className="h-10 rounded-md border bg-border/40" />
          <div className="space-y-4">
            <div className="h-14 max-w-xl rounded-md bg-border/40" />
            <div className="h-6 max-w-xs rounded-md bg-border/40" />
          </div>
          <div className="flex-1 rounded-md border bg-border/40" />
        </div>
      </div>
    </div>
  );
}
