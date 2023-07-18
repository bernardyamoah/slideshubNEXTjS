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
import { getCurrentUser, logOut } from "@/lib/functions";

import { useRouter } from 'next/navigation';

import Link from "next/link";
;
import { getUserInitials } from "@/lib/functions";
import { useEffect, useState } from "react";
export const UserNav: React.FC<UserNavProps> = ({ user }) => {
  const firstName = user?.name?.split(' ')[0] || '';
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  useEffect(() => {
    async function fetchAvatarUrl() {
      try {
        const currentUser = await getCurrentUser();
        const result = await getUserInitials(user?.name); // Make sure to implement this function
        setAvatarUrl(result);
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
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
          {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={user?.name?.split(' ')[0] || ' '} />
            ) : (
              <AvatarFallback className="font-bold">{firstName.charAt(0).toLocaleUpperCase()}</AvatarFallback>
            )}
          </Avatar>
        </Button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
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
          <DropdownMenuItem onClick={()=> router.push('/dashboard/profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
    
        </DropdownMenuGroup>
        
        <DropdownMenuItem className="text-red-600 hover:bg-red-50" onClick={() => logOut(router)}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}