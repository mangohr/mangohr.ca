import CompanyLayout from "@/components/custom/layouts/company";
import React from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CompanyLayout>{children}</CompanyLayout>;
}
