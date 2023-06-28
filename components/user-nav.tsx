import { CreditCard, LogOut, PlusCircle, Settings, User } from "lucide-react"

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
import { ModeToggle } from "./ModeToggle";
;
export const UserNav: React.FC<UserNavProps> = ({ user }) => {
  const firstName = user?.name?.split(' ')[0] || '';
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatars/01.png" alt="{user?.name?.split(' ')[0] || ' '}" />
            <AvatarFallback className="font-bold">{firstName.charAt(0).toLocaleUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name?.split(' ')[0] || ' '}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
  
        
        <DropdownMenuItem className="text-red-600 hover:bg-red-50" onClick={() => logOut(router)}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}