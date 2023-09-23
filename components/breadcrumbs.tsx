'use client'
import { usePathname, useRouter } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink
} from "@/components/ui/navigation-menu"
import { Home, HomeIcon, PlusCircle, User } from 'lucide-react'
import { DashboardIcon } from '@radix-ui/react-icons'
import { Badge } from './ui/badge'

export default function Breadcrumbs() {
  const router = useRouter()
  const pathnames = usePathname().split('/').filter((x) => x)
  const icons = {
    home: <HomeIcon  className='text-muted-foreground w-4 h-4'/>,
    dashboard: <DashboardIcon  className='text-muted-foreground w-4 h-4'/>,
    profile: <User  className='text-muted-foreground w-4 h-4'/>,
    create: <PlusCircle  className='text-muted-foreground w-4 h-4'/>,
  
    
    // Add more icons for other routes as needed
  }
  return (
    <NavigationMenu className='mt-6 mx-auto'>
      <NavigationMenuList className='gap-2'>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`

          return (
            <NavigationMenuItem key={index}>
              <NavigationMenuList>
                <NavigationMenuLink className='flex items-center gap-1 ' href={to}>
                {icons[value]} {value}
                </NavigationMenuLink>
              </NavigationMenuList>
           
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}