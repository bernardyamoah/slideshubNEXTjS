'use client'
import { usePathname, useRouter } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink
} from "@/components/ui/navigation-menu"


export default function Breadcrumbs() {
  const pathname=usePathname()
  
  const pathnames = pathname.split('/').filter((x) => x)
if (pathname==='/') return null

  return (
    <NavigationMenu className='my-6 mx-auto '>
      <NavigationMenuList className='gap-2'>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`

          return (
            <NavigationMenuItem key={index}>
              <NavigationMenuList className='hidden lg:block'>
                <NavigationMenuLink className='flex items-center gap-1 text-muted-foreground text-xs ' href={to}>
               {value} {'  /'}
                </NavigationMenuLink>
              </NavigationMenuList>
           
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}