
import { Metadata } from "next"
import Dashboard from "./dashboard"
export const metadata:Metadata={
  title:'Dashboard',
  
}
export default function Home() {
  return (
  <>
  <header className="items-center w-full lg:flex justify-cener">
        <div className="max-w-screen-xl px-4 py-8 mx-auto ">
        <div className="space-y-2 " >
              <h1
                className="text-3xl font-bold tracking-tighter text-center text-transparent sm:text-5xl xl:text-6xl/none bg-clip-text dark:bg-gradient-to-r dark:from-gray-300 dark:to-gray-600 bg-gradient-to-r from-black to-gray-600"
              >
                                Discover Our Unique Features
              </h1>
              <p className="max-w-[600px] text-gray-700 md:text-xl dark:text-gray-300 mx-auto text-center" >
                                Our features are designed to enhance your productivity and streamline your workflow.
              </p>
            </div>
        </div>
        
      </header>
  
  <Dashboard  />
  </>
    
    
  
  )
}