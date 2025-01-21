"use client"

import * as React from "react"
import i18next from "i18next";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export function ModeToggleCV() {


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="default" className={classNames(

          "rounded-xl px-0 py-2 text-sm text-dark font-medium bg-transparent shadow-none border-none hover:bg-transparent"
        )}>
          {i18next.t("cv")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-zinc-800">
        <DropdownMenuItem onClick={() => window.open('/CV - Manuel Luvuvamo - Desenvolvedor de Software 2025.pdf', '_blank')} className="cursor-pointer">
          Português
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open('/CV - Manuel Luvuvamo - Software Developer 2025.pdf', '_blank')} className="cursor-pointer">
          English
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
