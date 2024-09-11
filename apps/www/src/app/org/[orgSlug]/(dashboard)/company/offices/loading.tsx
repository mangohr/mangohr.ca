import OrgFormSkeleton from "@/components/skeleton/org";
import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-1 animate-pulse flex-col space-y-6">
      <div className="space-y-2">
        <div className="w-1.2 bg-border/40 h-10" />
        <div className="bg-border/40 h-5 w-1/3" />
      </div>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="bg-border/40 h-20 w-full" />
        ))}
    </div>
  );
}
