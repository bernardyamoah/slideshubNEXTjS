"use client"

import * as React from "react"
import { useTheme } from "next-themes"


import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button variant='ghost' onClick={() => {
      setTheme(theme === "dark" ? "light" : "dark")
    }} className="!bg-none hover:!bg-none !p-2">
      <Sun className="w-6 h-6 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <Moon
        className="absolute w-6 h-6 transition-all scale-0 rotate-90 dark:-rotate-0 dark:scale-100"
      />
      <span className="sr-only">Theme Toggle</span>
    </Button>
  )
}
