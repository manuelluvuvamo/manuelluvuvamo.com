import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { ModeToggleCV } from "./ModeToggleCV";

const navigation = [
  { name: "home", href: "/", current: false },
  { name: "projects", href: "projectos", current: false },
  { name: "blog", href: "blog", current: false },
  { name: "contact", href: "contact", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <div className="flex flex-col items-center justify-between lg:pt-16">
      <div className="z-10 max-w-4xl w-full container items-center justify-between font-mono text-sm flex flex-wrap-reverse ">

        <div className="flex h-28 w-full items-start lg:items-end justify-center bg-gradient-to-t from-white via-white static lg:h-auto lg:w-auto lg:bg-none">
          <span className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 cursor-pointer">

          <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
           
          </span>
        </div>

        {/* MENU */}
        <nav className="   pb-6 pt-8  backdrop-blur-2xl  lg:w-auto  lg:rounded-xl    lg:py-4   ">
          <div className="    mx-auto max-w-7xl px-2 sm:px-6 lg:px-0">
            <div className="  relative flex h-6 items-center justify-between">
              <div className=" flex flex-1 items-center justify-center sm:items-stretch  sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}
                </div>
                <div className="  sm:ml-6 sm:block ">
                  <div className="flex justify-center items-center flex-wrap space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "",
                          "rounded-xl py-2 text-sm font-medium"
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

                        "rounded-xl py-2 text-sm font-medium"
                      )}
                      aria-current={undefined}
                    >
                      <ModeToggleCV />
                    </Link>
                    <Link

                      href="#"
                      target=""
                      className={classNames(

                        "rounded-xl py-2 text-sm font-medium"
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
