

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {


  return (
    <>
    
   
        <div className=" lg:block pattern">
          <div className=" relative flex  !h-full ">
            
          
            <div className="flex-1 w-full h-full mx-auto max-w-screen-3xl lg:p-2">
            {/* <Breadcrumbs /> */}
              <div className=" ">{children}</div>

            </div>
          </div>
        </div>
   
    </>
  );
}

export default DashboardLayout;
