"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export function ModeToggleCV() {


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="default" className={classNames(

          "rounded-xl px-3 py-2 text-sm text-dark font-medium bg-transparent shadow-none border-none hover:bg-transparent"
        )}>
          resume
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-zinc-800">
        <DropdownMenuItem onClick={() => window.open('/CV - Europass - PT - Manuel Luvuvamo.pdf', '_blank')} className="cursor-pointer">
          Português
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open('/CV - Europass - EN - Manuel Luvuvamo.pdf', '_blank')} className="cursor-pointer">
          English
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}