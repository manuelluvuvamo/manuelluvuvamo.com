import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { ModeToggleCV } from "./ModeToggleCV";
import i18next from "i18next";
import "@/locales/index"

const navigation = [
  { name: "home", href: "/", current: false },
  { name: "proj", href: "projects", current: false },
  { name: "blog", href: "blog", current: false },
  { name: i18next.t('contact'), href: "contact", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <div className="flex flex-col items-center justify-between lg:pt-16">
      <div className="flex flex-wrap z-10 max-w-4xl w-full container items-center justify-between font-mono text-sm">
        <div className="flex w-full md:w-auto h-28 items-center lg:items-end justify-between md:justify-center lg:h-auto lg:w-auto lg:bg-no ">
          <span className="pointer-events-none lg:pointer-events-auto lg:p-0 cursor-pointer">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
          </span>

          <Link
            href="#"
            target=""
            className={classNames(
              "rounded-xl py-2 text-sm font-medium block md:hidden"
            )}
            aria-current={undefined}
          >
            <ModeToggle />
          </Link>
        </div>

        {/* MENU */}
        <nav className="pb-6 md:pt-8  backdrop-blur-2xl w-full  lg:w-auto lg:py-4">
          <div className="mx-auto max-w-7xl lg:px-0">
            <div className="relative flex h-6 items-center justify-between">
              <div className="flex flex-1 items-center">
                <div className="flex flex-shrink-0 items-center">
                </div>
                <div className="sm:ml-6 sm:block">
                  <div className="flex justify-center items-center flex-wrap space-x-3 md:space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? "bg-gray-900 text-white" : "",
                          "rounded-xl py-2 text-base"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}

                    <Link
                      href="#"
                      target=""
                      className={classNames(
                        "rounded-xl py-2 text-base"
                      )}
                      aria-current={undefined}
                    >
                      <ModeToggleCV />
                    </Link>
                    <Link
                      href="#"
                      target=""
                      className={classNames(
                        "rounded-xl py-2 text-sm font-medium hidden md:block"
                      )}
                      aria-current={undefined}
                    >
                      <ModeToggle />
                    </Link>

                    {/*  <ModeToggle /> */}
                  </div>
                </div>
              </div>
              {/* Aqui tinham as notificações e foto do user */}
            </div>
          </div>
        </nav>
        {/* fim menu */}
      </div>
    </div>
  );
}
