import { formatNumberToReadable } from "@/lib/number";
import { cn } from "@/lib/utils";

export const CustomizedTooltip = (props: any) => {
  const { active, payload, className } = props;
  if (active && payload && payload.length) {
    return (
      <div
        className={cn(
          "border-border/40 text-foreground w-fit min-w-24 rounded-md border bg-white/50 p-1 text-sm shadow-lg backdrop-blur-sm",
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
