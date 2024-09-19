import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import { WEBSITE_HOST_URL } from "@/lib/constants";
import { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import "@/locales/index"
import i18next from "i18next";

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
          {i18next.t("projects_title")}
          </h2>
          <p className="text-base text-lg text-justify ">
          {i18next.t("projects")}{" "}
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
              desc={i18next.t("itel_vaga")}
              url="https://vagas.itel.gov.ao"
              tech={""}
            />

            <ProjectCard
              titulo="Huawei Lead23"
              desc={i18next.t("huawei_lead23")}
              url="https://lead23.itel.gov.ao"
              tech={""}
            />

            <ProjectCard
              titulo="Zengá"
              desc={i18next.t("zenga")}
              url="https://zenga.co.ao"
              tech={""}
            />
            <ProjectCard
              titulo="SmartBrace"
              desc={i18next.t("smartbrace")}
              url="https://smartbrace.ao/"
              tech={""}
            />
          </div>

          <h2 className={`mt-6 mb-6 text-2xl font-semibold text-left lg `}>
          {i18next.t("experiments_title")}
          </h2>

          <div className="mt-4  flex flex-col text-left justify-start items-center lg:max-w-4xl lg:w-full lg:mb-0 lg:text-left p-0">
            <ProjectCard
              titulo="Lista de Presença"
              desc={i18next.t("lista_presenca")}
              url="https://github.com/manuelluvuvamo/listadepresenca"
              tech="Javascript"
            />

            <ProjectCard
              titulo="AngoGest"
              desc={i18next.t("angogest")}
              url="https://github.com/manuelluvuvamo/angogest"
              tech="HTML"
            />

            <ProjectCard
              titulo="HyperColor Clone"
              desc={i18next.t("hypercolor")}
              url="https://github.com/manuelluvuvamo/hypercolor_clone"
              tech="Typescript"
            />

            <ProjectCard
              titulo="Spotify Clone"
              desc={i18next.t("spotify_clone")}
              url="https://github.com/manuelluvuvamo/spotify_clone"
              tech="Typescript"
            />
             <ProjectCard
              titulo="SGH - Gestão Hospitalar"
              desc={i18next.t("sgh")}
              url="https://github.com/manuelluvuvamo/SGH"
              tech="PHP | Laravel"
            />
             <ProjectCard
              titulo="Desafio Dev - Cnab"
              desc={i18next.t("cnab")}
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
