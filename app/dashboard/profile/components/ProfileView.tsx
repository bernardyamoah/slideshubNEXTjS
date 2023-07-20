import React from "react";


import { CalendarDays, CheckIcon, Edit, MessageSquareDashed, Phone, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import {  formatUserTime } from "@/lib/functions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
interface ProfileViewProps {
  name: string;
  email: string;
  bio:string
  phoneNumber: string;
  country: string;
  verified: boolean;
registration:string;
profileImage:string;
  coverImageUrl: string;
  countryFlagEmoji: string;
  handleOpen: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({
  name,
  email,
  phoneNumber,
  country,
  bio,
  verified,
  registration,
  coverImageUrl,
  profileImage,
  countryFlagEmoji,
  handleOpen,
}) => {
  return (
    <>
    <div className=" mx-auto w-full px-4 mb-4  inset-x-0 ">
      {/* Cover Photo */}
      <img
        src={coverImageUrl}
        alt="Cover Photo"
        className="w-full h-64 object-cover rounded-lg "
      />

    </div>
    <Card className=" max-w-lg mx-auto">
  <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8 relative">
  <Button  
      onClick={handleOpen}
      className={cn("items-start !p-0 !bg-transparent hover:bg-none focus:bg-none active:bg-none absolute right-4 top-6 ", {
      

      })
      }
    >
      <Edit className="text-sm w-5 h-5 text-muted-foreground"/>
    </Button>
    <p className="block shrink-0">
      <img
        alt="Speaker"
        src={profileImage}
        className="h-14 w-14 rounded-lg object-cover"
      />
    </p>

    <div>
      <h3 className="font-medium sm:text-lg">
        <p >
        {name}
        </p>
      </h3>

      <div>
      <Label>Bio</Label>
      <p className="line-clamp-2 text-sm text-gray-700">
      {bio}
      </p>
      </div>
  <p className="line-clamp-2 text-sm text-gray-700 flex items-center gap-2 mt-2">
        <img src={countryFlagEmoji} alt='country' className="w-4 h-4"/> 
      <span className="text-muted-background"> {country} </span>
      </p>
      <div className="mt-2 sm:flex sm:items-center sm:gap-2">
        <div className="flex items-center gap-1 text-gray-500">
        <MessageSquareDashed className="w-4 h-4"/>

          <p className="text-xs">{email}</p>
        </div>

        <span className="hidden sm:block" aria-hidden="true">&middot;</span>

        <p className="hidden sm:flex sm:text-xs sm:text-gray-500">
          <Phone className="mr-2 h-4 w-4 opacity-70" />{" "}
          <a href={`tel: ${phoneNumber}`} className="font-medium underline hover:text-gray-700">
          {phoneNumber}
          </a>
        </p>
      
      </div>
      <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
              {formatUserTime(registration)}
              </span>
            </div>
    </div>
  </div>

  <div className="flex justify-end">
    <strong
      className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-emerald-600 px-3 py-1.5 text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
      {verified ? (
            <>
              Verified 
            </>
          ) : (
            <>
              Not Verified{" "}
              <XCircle className="ml-1 h-4 w-4 text-red-500" />
            </>
          )}
    </strong>
  </div>
</Card>
    </>
  );
};

export default ProfileView;
