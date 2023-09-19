import React, { useEffect, useState } from "react";


import { BadgeCheck, CalendarDays, Edit, MessageSquareDashed, Phone, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatUserTime, getUserInitials } from "@/lib/functions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import Image from "next/image";
interface ProfileViewProps {
  name: string;
  email: string;
  bio: string
  phoneNumber: string;
  country: string;
  verified: boolean;
  registration: string;
  profileImage: string;
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
  const [userInitials, setUserInitials] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserInitials() {
      try {
        const initials = await getUserInitials(name);
        setUserInitials(initials);
      } catch (error) {
        console.error("Error fetching user initials:", error);
        setUserInitials(null);
      }
    }

    fetchUserInitials();
  }, [name]);
  // Provide an empty string as fallback for userInitials if it's null
  const avatarSrc = profileImage !== '' ? profileImage : userInitials || '';

  return (
    <>

      <Card>
        <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8 relative">
          <Button
            onClick={handleOpen}
            className={cn("items-start !p-0 !bg-transparent hover:bg-none focus:bg-none active:bg-none absolute right-4 top-6 ", {


            })
            }
          >
            <Edit className="text-sm w-5 h-5 text-muted-foreground" />
          </Button>
          <p className="block shrink-0">

            <Avatar className="h-14 w-14">
              {avatarSrc !== '' ? (
                <AvatarImage src={avatarSrc} className="h-full" alt={name} />
              ) : (
                <AvatarImage className="font-bold">{userInitials}</AvatarImage>
              )}
            </Avatar>


          </p>

          <div>
            <CardHeader >
              <CardTitle>
                {name}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <div>
                <Label className="dark:text-gray-500">Bio</Label>
                <p className="">
                  {bio}
                </p>


              </div>
              <p className="line-clamp-2 text-sm text-gray-700 flex items-center gap-2 mt-2">
                <Image width={50} height={50} src={countryFlagEmoji} alt='country' className="w-4 h-4"  />
                <span className="text-muted-background"> {country} </span>
              </p>
              <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                <div className="flex items-center gap-1 text-gray-500">
                  <MessageSquareDashed className="w-4 h-4" />

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
            </CardContent>
          </div>
        </div>

        <div className="flex justify-end">
          <p
            className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-emerald-600 px-3 py-1.5 text-white"
          >

            {verified ? (
              <>
                <BadgeCheck className="ml-r h-4 w-4 " />
                <span className="text-sm text-foreground-muted">  verified </span>
              </>
            ) : (
              <>
                <span className="text-sm text-foreground-muted">  Unverified </span>

              </>

            )}
          </p>
        </div>
      </Card>
    </>
  );
};

export default ProfileView;
