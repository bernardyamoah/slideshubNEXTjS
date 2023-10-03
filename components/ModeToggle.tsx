"use client"

import * as React from "react"
import { useTheme } from "next-themes"


import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button variant='outline' size='sm'  onClick={() => {
      setTheme(theme === "dark" ? "light" : "dark")
    }} className=" rounded-full w-fit h-auto">
      <Sun className="w-5 h-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <Moon
        className="absolute w-5 h-5 transition-all scale-0 rotate-90 dark:-rotate-0 dark:scale-100"
      />
      <span className="sr-only">Theme Toggle</span>
    </Button>
  )
}
