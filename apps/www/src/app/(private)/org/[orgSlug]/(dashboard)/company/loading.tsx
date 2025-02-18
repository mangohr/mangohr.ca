import React from "react";

export default function Loading() {
  return (
    <div className="h-screen w-full max-w-screen-xl animate-pulse text-sm">
      <div className="flex h-screen gap-4">
        <div className="bg-border/40 block w-[250px] border-r" />
        <div className="flex flex-1 flex-col space-y-8 p-8">
          <div className="bg-border/40 h-10 rounded-md border" />
          <div className="space-y-4">
            <div className="bg-border/40 h-14 max-w-xl rounded-md" />
            <div className="bg-border/40 h-6 max-w-xs rounded-md" />
          </div>
          <div className="bg-border/40 flex-1 rounded-md border" />
        </div>
      </div>
    </div>
  );
}
