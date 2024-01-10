"use client";

import Loading from "@/components/ui/Cloading";
import { useRouter } from "next/navigation";
import { useStore } from '@/hooks/use-user';
interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
 const { user, loading } = useStore();

  const router = useRouter();

  if (loading) return <Loading />;
  if (!user) router.push("/login");
  return <>{children}</>;
}

export default DashboardLayout;
