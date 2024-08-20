import OrgFormSkeleton from "@/components/skeleton/org";
import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-1 animate-pulse flex-col space-y-6">
      <div className="space-y-2">
        <div className="w-1.2 h-10 bg-border/40" />
        <div className="h-5 w-1/3 bg-border/40" />
      </div>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="h-20 w-full bg-border/40" />
        ))}
    </div>
  );
}
