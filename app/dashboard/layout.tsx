"use client";

import { UserProvider } from "@/components/providers/user-provider";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {

  return <>
    <UserProvider>

      {children}
    </UserProvider>
  </>;
}

export default DashboardLayout;
