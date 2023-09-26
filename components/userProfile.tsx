import { LogOut, User } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logOut } from "@/lib/functions";

import { useRouter } from 'next/navigation';

import Link from "next/link";
;
import { getUserInitials } from "@/lib/functions";
import { useEffect, useState } from "react";
import { useMyContext } from "./MyContext";
export const UserProfile= () => {
  const {user}=useMyContext();
  const firstName = user?.name?.split(' ')[0] || '';
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  useEffect(() => {
    async function fetchAvatarUrl() {
      try {
       
        if (user) {
          
          const initials = await getUserInitials(user?.name || '');
          setAvatarUrl(initials);
          // if ( === '') {
          //   setAvatarUrl(initials);
          // }
          // setAvatarUrl(user?.);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchAvatarUrl();
  }, []);
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-10 h-10 rounded-full">
          <Avatar className="w-10 h-10">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={user?.name?.split(' ')[0] || ' '} />
            ) : (
              <AvatarFallback className="font-bold">{firstName.charAt(0).toLocaleUpperCase()}</AvatarFallback>
            )}
          </Avatar>
        </Button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-[100]" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <Link href={'/dashboard/profile'} className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
            <User className="w-4 h-4 mr-2" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

        </DropdownMenuGroup>

        <DropdownMenuItem className="text-red-600 hover:bg-red-50" onClick={() => logOut(router)}>
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}