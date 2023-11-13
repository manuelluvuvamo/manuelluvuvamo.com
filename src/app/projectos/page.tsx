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

/* import { ThemeProvider } from "next-themes"; */

export default function Home() {
  return (
    <main className="min-h-screen ">
      <Navbar />

      <section className="mb-20 px-5 md:px-20 lg:px-56 xl:px-80 flex flex-col items-center justify-between pt-20">
        <div className="max-w-4xl w-full container">
          <h2 className={`mb-6 text-3xl font-semibold text-left lg `}>
            Projectos
          </h2>
          <p className="text-base text-lg text-justify ">
            Durante meu percurso como Desenvolvedor Fullstack, tenho
            desenvolvido e participado como colaborador em muitos projectos. Se estiver a ler isso provavelmente
            os meus projectos actuais são privados ou não. Além dos destacados
            aqui, alguns dos outros projectos que desenvolvi podem ser
            encontrados no meu{" "}
            <Link
              className="text-base text-gray-400 hover:underline transition-all"
              target="_blank"
              href={"https://github.com/manuelluvuvamo"}
            >
              Github
            </Link>
            .
          </p>

          <h2 className={`mt-10 mb-6 text-2xl font-semibold text-left lg `}>
            Implementados
          </h2>
          
          <div className=" mt-4 flex text-center justify-start items-center lg:max-w-4xl lg:w-full lg:mb-0 lg:text-left flex-wrap  p-0">
            <ProjectCard
              titulo="ITEL Vagas"
              desc="Plataforma com o objectico de Disponibilizar estágios profissionais para os estudantes da instituição, para melhor preparar a sua integração no mercado de trabalho..."
              url="https://vagas.itel.gov.ao"
            />

            <ProjectCard
              titulo="Huawei Lead23"
              desc="Portal principal para candidaturas ao projecto de formação profissional nas áreas de Operações de DataCenter, HCIA Datacom e muito mais pertencente à Huawei..."
              url="https://lead23.itel.gov.ao"
            />

            <ProjectCard
              titulo="Zengá"
              desc="Plataforma para melhorar a forma de como publicitamos, ajudar a controlar os estabelecimentos que estão em uma determinada área e prover uma melhor estatística..."
              url="https://zenga.co.ao"
            />
            <ProjectCard
              titulo="SmartBrace"
              desc="Sistema inovador para gerir eventos em Angola integrada com reconhecimento de pulseiras de radiofrequência, que visa melhorar a gestão de eventos..."
              url="https://smartbrace.ao/"
            />
          </div>

          <h2 className={`mt-6 mb-6 text-2xl font-semibold text-left lg `}>
            Clones / Templates e outros
          </h2>

          <div className="mt-4  flex text-center justify-start items-center lg:max-w-4xl lg:w-full lg:mb-0 lg:text-left flex-wrap  p-0">
            <ProjectCard2
              titulo="Lista de Presença"
              desc="Uma aplicação React que permite aos usuários registrar sua presença em eventos ou reuniões..."
              git="https://github.com/manuelluvuvamo/listadepresenca"
              vercel="https://listadepresenca-theta.vercel.app/"
              tech="Javascript"
            />

            <ProjectCard2
              titulo="AngoGest"
              desc="Um site experimental abordando sobre a gravidez precoce, um trabalho prático de TIC usando html5 e css3..."
              git="https://github.com/manuelluvuvamo/angogest"
              vercel="https://angogest.vercel.app/"
              tech="HTML"
            />

            <ProjectCard2
              titulo="HyperColor Clone"
              desc="Exercício prático de clonagem do famoso site de degradês HyperColor utilizando Next.js e Tailwind Css..."
              git="https://github.com/manuelluvuvamo/hypercolor_clone"
              vercel="https://hypercolor_clone.vercel.app/"
              tech="Typescript"
            />

            <ProjectCard2
              titulo="Spotify Clone"
              desc="Um exercício prático de clonagem do famoso site de Streaming Spotify utilizando Next.js e Tailwind Css..."
              git="https://github.com/manuelluvuvamo/spotify_clone"
              vercel="https://spotify_clone.vercel.app/"
              tech="Typescript"
            />
             <ProjectCard2
              titulo="SGH - Gestão Hospitalar"
              desc="Módulos de gestão de utilizadores, consultas, pacientes e acessos de um sistema de gestão Hospitalar"
              git="https://github.com/manuelluvuvamo/SGH"
              vercel="#"
              tech="PHP | Laravel"
            />
             <ProjectCard2
              titulo="Desafio Dev - Cnab"
              desc="Baseado no ByCodersTec/ desafio-dev, desafio para fazer a leitura de um fichero e gerir dados de transações..."
              git="https://github.com/manuelluvuvamo/desafio-dev-fullstack"
              vercel="#"
              tech="PHP | Laravel"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

Home.useClient = true;
