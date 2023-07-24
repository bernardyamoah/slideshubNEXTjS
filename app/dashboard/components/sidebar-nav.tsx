"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: JSX.Element
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        " flex  flex-col pt-6 space-y-4 dark:bg-inherit  w-full px-4 bg-gray-50 border-r-2",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-emerald-600  hover:bg-none font-bold tracking-wide hover:text-white text-white hover:bg-emerald-500"
              : " text-gray-600 dark:text-500",
            "justify-start"
          )}
        >
          <span className="flex items-center space-x-3 ">
            {item.icon}
            <span className="text-base ">  {item.title}</span>
          </span>
        </Link>
      ))}
    </nav>
  )
}