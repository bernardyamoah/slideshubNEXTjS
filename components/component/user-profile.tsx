
'use client'
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { useUserContext } from "../UserContext";
import Image from "next/image";
import userimage from "@/assets/hero-image-2.png";
export function UserProfile() {
  const{user}=useUserContext();
  return (
    <Card
      key="1"
      className="rounded-lg  shadow-lg max-w-sm mx-auto hover:shadow-xl transition-all duration-200"
    >
  
   <div className="relative -mt-12 -left-12"><Image
        alt="Profile picture"
        className="object-cover w-24 h-24 rounded-full outline-4 outline-gray-100 p-2"
        
        height={400}
        width={200}
        src={userimage}
        // style={{
        //   aspectRatio: "320/320",
        //   objectFit: "cover",
        // }}
       quality={100}
      /></div>
   
      <CardContent className="p-4">
        <h2 className="text-2xl font-bold hover:text-gray-700 transition-all duration-200">{user?.name}</h2>
        <h3 className="text-gray-500 hover:text-gray-600 transition-all duration-200">Front-end Developer</h3>
        <p className="mt-2 text-gray-600 hover:text-gray-700 transition-all duration-200">
         {/* {user?.prefs?.bio || 'No bio'} */}
        </p>
        <div className="flex mt-4 space-x-2 hidden">
          <Button className="w-full hover:bg-gray-700 hover:text-white transition-all duration-200" size="sm">
            Follow
          </Button>
          <Button
            className="w-full hover:border-gray-700 hover:text-gray-700 transition-all duration-200"
            size="sm"
            variant="outline"
          >
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
