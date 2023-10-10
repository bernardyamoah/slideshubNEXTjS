'use client'
import { usePathname } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from "@/components/ui/navigation-menu"


export default function Breadcrumbs() {
  const pathname=usePathname()
  
  const pathnames = pathname.split('/').filter((x) => x)
if (pathname==='/') return null

  return (
    <NavigationMenu className='mx-auto my-6 '>
      <NavigationMenuList className='gap-2'>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`

          return (
            <NavigationMenuItem key={index}>
              <NavigationMenuList className='hidden lg:block'>
                <NavigationMenuLink className='flex items-center gap-1 text-xs text-muted-foreground ' href={to}>
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