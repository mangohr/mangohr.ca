import OrgFormSkeleton from "@/components/skeleton/org";
import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="animate-pulse space-y-8 px-8 py-12">
      <div className="space-y-4">
        <div className="h-10 max-w-xl bg-border/40" />
        <div className="h-6 w-48 bg-border/40" />
      </div>
      <div className="grid grid-cols-4 rounded-lg border">
        {Array(4)
          .fill(0)
          .map((d, i) => (
            <div
              key={i}
              className="h-96 border-r bg-border/40 last:border-none"
            />
          ))}
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 h-96 rounded-lg border bg-border/40" />
        <div className="col-span-2 h-96 rounded-lg border bg-border/40" />
      </div>
    </div>
  );
}
