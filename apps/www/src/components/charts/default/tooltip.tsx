import { formatNumberToReadable } from "@/lib/number";
import { cn } from "@/lib/utils";

export const CustomizedTooltip = (props: any) => {
  const { active, payload, className } = props;
  if (active && payload && payload.length) {
    return (
      <div
        className={cn(
          "w-fit min-w-24 rounded-md border border-border/40 bg-white/50 p-1 text-sm text-foreground shadow-lg backdrop-blur-sm",
          className
        )}
      >
        <p className="capitalize">{payload[0].payload.name}</p>
        <p>{formatNumberToReadable(payload[0].value)}</p>
      </div>
    );
  }

  return null;
};
