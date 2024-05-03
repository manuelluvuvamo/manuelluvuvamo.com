"use client"; // This is a client component 👈🏽
import {
  BookOpen,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import ParticlesComponent from "@/components/ParticlesComponent";
import FotoCard from "@/components/FotoCard";
import Sobre from "@/components/Sobre";

/* import { ThemeProvider } from "next-themes"; */

export default function Home() {
  return (
    <main className="min-h-screen ">
      <Navbar />

      <section className="px-5 md:px-20 lg:px-56 xl:px-80 flex flex-col items-center justify-between pt-20 ">
        <div className="max-w-4xl w-full container">
          <section className="flex flex-wrap  justify-center items-start">
          
            <FotoCard/>
            <div className=" w-[100%] lg:w-[50%] flex flex-col items-end gap-1">
              <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-center rounded-xl w-[98%] lg:w-[88%] py-1 text-white mb-4 mt-3 lg:mt-0">
                <p className="uppercase text-xs">
                  Desenvolvimento &middot; Integração &middot; Manutenção
                </p>
              </div>

              <div className="">
              
                <h1
                  className={`text-4xl lg:text-4xl font- text-right lg mt-2`}
                >
                  {/* Ficar online e */} {/* <span className="text-3xl lg:text-5xl font-extralight">SQL Trainner</span>  <br /> */}
                  {/* <span className="text-3xl lg:text-5xl font-light">Linux Systems</span>  <br /> */}
                  {/* crescer rapidamente */}Olá, sou <br /> Manuel Luvuvamo
                </h1>
                  <h2
                  className={`text-xl lg:text-2xl font-extralight text-right lg mt-4 lg:mt-7 mb-4 lg:mb-7`}
                >
                  Desenvolvedor Fullstack
                </h2>
              </div>

              <div className="w-[100%] mt-8  text-center mb-10  lg:mb-0  lg:text-right flex flex-wrap justify-end items-start gap-8  ">
                <Link
                  href="/Curriculo.pdf"
                  className="w-[100%] lg:w-[40%] rounded-xl border  flex justify-center items-center py-4 transition-colors hover:border-gray-300 border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30  dark:border-neutral-700 "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={` text-md font-medium`}>Currículo</h2>
                </Link>

                <Link
                  href="projectos"
                  className="w-[100%] lg:w-[40%] rounded-xl border  flex justify-center items-center py-4  transition-colors hover:border-gray-300 border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30  dark:border-neutral-700 -mt-6 lg:mt-0"
                  
                  rel="noopener noreferrer"
                >
                  <h2 className={` text-md font-medium`}>Projectos</h2>
                </Link>
              </div>
            </div>

            
          </section>
        </div>
      </section>
     <Sobre/>

      <Footer />
    </main>
  );
}
// Marque o componente como um "Client Component"
Home.useClient = true;
