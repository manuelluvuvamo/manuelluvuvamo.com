import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
/* import { Disclosure, Menu, Transition } from "@headlessui/react"; */
import { useRouter } from "next/router";


import { Sun } from "lucide-react";
/* import { ModeToggle } from "./ModeToggle"; */

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Projectos", href: "projectos", current: false },
  { name: "Blog", href: "blog", current: false },
  { name: "Galeria", href: "galeria", current: false },
  { name: "Resumo", href: "/Resumo.pdf", current: false, target: "_blank" },
  { name: "Contacto", href: "contact", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  
  /* const {theme, setTheme} = useTheme(); */
  /* const currentTheme = theme === 'system' ? systemTheme : theme; */
  return (
    <div className="flex flex-col items-center justify-between pt-24">
      <div className="z-10 max-w-4xl w-full items-center justify-between font-mono text-sm lg:flex">
        {/* MENU */}
        <nav className="border-b border-gray-300 bg-gradient-to-b   pb-6 pt-8  backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit  lg:w-auto  lg:rounded-xl lg:border lg:light:bg-gray-200  lg:py-4 -lg:px-0 lg:dark:bg-zinc-800/30">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-2">
            <div className="relative flex h-6 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch  sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}
                </div>
                <div className=" sm:ml-6 sm:block">
                  <div className="flex justify-center flex-wrap space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target={item.target}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : " hover:bg-gray-700 hover:text-white",
                          "rounded-xl px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}


                   {/*  <ModeToggle /> */}
                 
                  </div>
                </div>
              </div>
              {/* Aqui tinham as notificações e foto do user */}
            </div>
          </div>
        </nav>
        {/* fim menu */}

        {/*  dark:from-black dark:via-black  */}
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none">
          <span className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 cursor-pointer">
            <div className="flex flex-col  text-right">
              <span className="font-display text-base">Manuel</span>
              <span className="font-display text-base">Luvuvamo</span>
            </div>
            <Image
              src="/4.jpeg"
              alt="Manuel Logo"
              className=" w-14 h-12 rounded-xl"
              width={100}
              height={100}
              priority
            />

            {/* -ml-16 bg-gray-900 text-white opacity-0 hover:opacity-80 */}
           {/*  <div className=" w-14 h-12 rounded-xl transition-opacity">
              <ModeToggle />
            </div> */}
          </span>
        </div>
      </div>
    </div>
  );
}
