import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import { WEBSITE_HOST_URL } from "@/lib/constants";
import { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";

const meta = {
  title: 'Projects',
  description: 'Explore some of my projects',
  url: `${WEBSITE_HOST_URL}/about`,
}

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.url,
  },
  twitter: {
    title: meta.title,
    description: meta.description,
  },
  alternates: {
    canonical: meta.url,
  },
}

export default function Home() {
  return (
    <main className="min-h-screen ">
      <Navbar />

      <section className="mb-20  flex flex-col items-center justify-between pt-5 lg:pt-20">
        <div className="max-w-4xl w-full container">
          <h2 className={`mb-6 text-3xl font-semibold text-left lg `}>
            Projects
          </h2>
          <p className="text-base text-lg text-justify ">
          During my career as a Fullstack Developer, I have developed and participated as a collaborator in many projects. If you{"'"}re reading this, my current projects are probably private or not. In addition to those highlighted here, some of the other projects I{"'"}ve developed can be found on my{" "}
            <Link
              className="text-base text-gray-400 hover:underline transition-all"
              target="_blank"
              href={"https://github.com/manuelluvuvamo"}
            >
              Github
            </Link>
            .
          </p>
          
          <div className=" mt-4 flex flex-col text-left justify-start items-center lg:max-w-4xl lg:w-full lg:mb-0 lg:text-left p-0">
            <ProjectCard
              titulo="ITEL Vagas"
              desc="Platform with the aim of providing professional internships for the institution's students, to better prepare them for the job market..."
              url="https://vagas.itel.gov.ao"
              tech={""}
            />

            <ProjectCard
              titulo="Huawei Lead23"
              desc="Main portal for applications to the professional training project in the areas of DataCenter Operations, HCIA Datacom and much more belonging to Huawei..."
              url="https://lead23.itel.gov.ao"
              tech={""}
            />

            <ProjectCard
              titulo="Zengá"
              desc="Platform for advertising control, monitoring establishments in a given area and providing better statistics..."
              url="https://zenga.co.ao"
              tech={""}
            />
            <ProjectCard
              titulo="SmartBrace"
              desc="Innovative system for managing events in Angola integrated with radiofrequency wristband recognition, which aims to improve event management..."
              url="https://smartbrace.ao/"
              tech={""}
            />
          </div>

          <h2 className={`mt-6 mb-6 text-2xl font-semibold text-left lg `}>
          Experiments
          </h2>

          <div className="mt-4  flex flex-col text-left justify-start items-center lg:max-w-4xl lg:w-full lg:mb-0 lg:text-left p-0">
            <ProjectCard
              titulo="Lista de Presença"
              desc="A React application that allows users to register their attendance at events or meetings..."
              url="https://github.com/manuelluvuvamo/listadepresenca"
              tech="Javascript"
            />

            <ProjectCard
              titulo="AngoGest"
              desc="An experimental website about early pregnancy, a practical ICT project using html5 and css3..."
              url="https://github.com/manuelluvuvamo/angogest"
              tech="HTML"
            />

            <ProjectCard
              titulo="HyperColor Clone"
              desc="Practical exercise in cloning the famous HyperColor gradient site using Next.js and Tailwind Css..."
              url="https://github.com/manuelluvuvamo/hypercolor_clone"
              tech="Typescript"
            />

            <ProjectCard
              titulo="Spotify Clone"
              desc="A practical exercise in cloning the famous streaming site Spotify using Next.js and Tailwind Css..."
              url="https://github.com/manuelluvuvamo/spotify_clone"
              tech="Typescript"
            />
             <ProjectCard
              titulo="SGH - Gestão Hospitalar"
              desc="User, appointment, patient and access management modules for a hospital management system"
              url="https://github.com/manuelluvuvamo/SGH"
              tech="PHP | Laravel"
            />
             <ProjectCard
              titulo="Desafio Dev - Cnab"
              desc="Based on ByCodersTec/ desafio-dev, a challenge to read a file and manage transaction data..."
              url="https://github.com/manuelluvuvamo/desafio-dev-fullstack"
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
