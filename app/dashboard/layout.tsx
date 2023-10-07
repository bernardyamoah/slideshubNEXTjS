'use client'
import { useUserContext } from "@/components/UserContext";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading } = useUserContext();
  const Router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      Router.replace('/login');
    }
  }, [loading, user]);

  return (
    <>
    
   
        <div className=" lg:block pattern">
          <div className=" relative flex  !h-full ">
            
          
            <div className="flex-1 w-full h-full mx-auto max-w-screen-3xl lg:p-2">
   
              <div className="">{children}</div>

            </div>
          </div>
        </div>
   
    </>
  );
}

export default DashboardLayout;
