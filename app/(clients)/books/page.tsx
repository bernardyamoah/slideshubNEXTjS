'use client'

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"



const Page = () => {

  return (

    <>




      <aside className="container ">


        <CardHeader className="flex mt-6 space-y-4">
          <CardTitle className="text-2xl">
            Books

          </CardTitle>





        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-8 mt-20 lg:gap-10 md:grid-cols-3 lg:grid-cols-4 ">

        </CardContent>


      </aside>
    </>
  )
}

export default Page
