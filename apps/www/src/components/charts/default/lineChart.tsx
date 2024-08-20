import { format } from "date-fns/format";
import {
  CartesianGrid,
  LineChart as LChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { CustomizedTooltip } from "./tooltip";

export const LineChart = ({
  data,
  color,
}: {
  color: string;
  data: Array<{ name: string; count: number }>;
}) => {
  return (
    <div>
      <ResponsiveContainer width={"100%"} height={160}>
        <LChart data={data} margin={{ right: 7, top: 5, left: 7, bottom: 5 }}>
          <XAxis
            dataKey="name"
            stroke={color}
            fontSize={12}
            tickLine={false}
            opacity={0.4}
            interval={1}
            tickFormatter={(value) => value && format(new Date(value), "d")}
          />
          {/* <YAxis
                        dataKey={'count'}
                        width={15}
                        stroke={color}
                        fontSize={10}
                        interval={1}
                        tickLine={false}
                        // tickFormatter={formatNumberToReadable}
                        opacity={0.4}
                    /> */}
          <Tooltip content={<CustomizedTooltip />} />

          <CartesianGrid
            vertical={true}
            horizontal={false}
            stroke={color}
            strokeOpacity={0.1}
          />

          <Line
            type="monotone"
            dataKey="count"
            stroke={color}
            dot={false}
            strokeWidth={2}
          />
        </LChart>
      </ResponsiveContainer>
    </div>
  );
};
