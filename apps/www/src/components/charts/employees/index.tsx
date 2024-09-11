import React from "react";
import { LineChart } from "../default/lineChart";
import { getDaysInMonth } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EmployeeBarChart = () => {
  return (
    <div className="grid grid-cols-5 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Employees</CardDescription>
          <CardTitle className="text-4xl">15</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-xs">Total employees</div>
        </CardContent>
        {/* <CardFooter>
            <Progress value={12} aria-label="12% increase" />
          </CardFooter> */}
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Departments</CardDescription>
          <CardTitle className="text-4xl">15</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-xs">
            Total departments count
          </div>
        </CardContent>
        {/* <CardFooter>
            <Progress value={12} aria-label="12% increase" />
          </CardFooter> */}
      </Card>
    </div>
  );
};

export default EmployeeBarChart;
