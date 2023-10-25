"use client"; // This is a client component 👈🏽
import {
  BookOpen,
  Facebook,
  Github,
  Instagram,
  Link2,
  Link as Linkk,
  Linkedin,
  Twitter,
  Eye,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import ParticlesComponent from "@/components/ParticlesComponent";
import FotoCard from "@/components/FotoCard";
import Sobre from "@/components/Sobre";
import ProjectCard from "@/components/ProjectCard";
import ProjectCard2 from "@/components/ProjectCard2";
import BlogCard from "@/components/BlogCard";
import GuestBookForm from "@/components/GuestBookForm";

/* import { ThemeProvider } from "next-themes"; */

export default function Home() {
  return (
    <main className="min-h-screen ">
      <Navbar />

      <section className="mb-20 px-5 md:px-20 lg:px-56 xl:px-80 flex flex-col items-center justify-between pt-20">
        <div className="max-w-4xl w-full container">
          <h2 className={`mb-6 text-3xl font-semibold text-left lg `}>
            Contacto
          </h2>
          <p className="text-base text-lg text-justify ">
            É um prazer tê-lo aqui. Esta é a oportunidade perfeita para
            compartilhar seus pensamentos, feedback, ou apenas dizer um &ldquo;olá&rdquo;.
            Se você teve a chance de explorar meu portfólio, participou de algum
            projeto comigo ou apenas passou por aqui, adoraria ouvir sua
            opinião. <br />
            <br />
            Obrigado por fazer parte deste espaço!
          </p>

          <GuestBookForm/>
        </div>
      </section>

      <Footer />
    </main>
  );
}

Home.useClient = true;
