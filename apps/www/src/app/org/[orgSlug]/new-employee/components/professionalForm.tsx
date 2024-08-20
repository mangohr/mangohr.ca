import React from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addEmployeeFormSteps } from ".";
import { z } from "zod";

export const EmployeeProfessionalForm = () => {
  const form =
    useFormContext<
      z.infer<typeof addEmployeeFormSteps.professional.validate>
    >();

  return (
    <div className="grid grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="employee_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employee ID</FormLabel>

            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shift_info"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Shift Information</FormLabel>

            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="employee_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employee Type</FormLabel>

            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Department</FormLabel>

            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="job_title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>

            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="reporting_manager"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reporting Manager</FormLabel>

            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="working_days"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Working days</FormLabel>

            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="joining_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Joining Date</FormLabel>

            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="base_salary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Salary</FormLabel>

            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="hourly_salary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Salary Per Hour</FormLabel>

            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="office"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Office</FormLabel>

            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="employee_group"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employee Group</FormLabel>

            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
