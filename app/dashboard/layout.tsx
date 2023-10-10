'use client'
import { useUserContext } from "@/components/UserContext";
import Loading from "@/components/ui/Cloading";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading } = useUserContext();
  const router = useRouter();
  // useEffect(() => {
  //   if (!loading && !user) {
  //     Router.replace('/login');
  //   }
  // }, [loading, user]);

  if (loading) return <Loading />;
  if(!user) return router.push('/login');
  return (
    <>
    
   
    
      
              <div className=" min-h-[70vh]">{children}</div>

     
    </>
  );
}

export default DashboardLayout;
