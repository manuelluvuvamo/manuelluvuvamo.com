"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import { AiOutlineExpandAlt } from "react-icons/ai";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

/* import { ThemeProvider } from "next-themes"; */

export default function Home() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  const galleryTab = [
    // you can add more image if you want
    {
      imageUrl: "/Eventos/1.jpeg",
      type: "Evento",
      title: "Angola Startup Summit 2023",
    },
    {
      imageUrl: "/Eventos/2.jpeg",
      type: "Evento",
      title: "Feira de Inovação Tecnológica do Uíge 2023",
    },
    {
      imageUrl: "/Eventos/3.jpeg",
      type: "Evento",
      title: "AngoTic 2023",
    },
    {
      imageUrl: "/Eventos/4.jpeg",
      type: "Evento",
      title: "AngoTic 2023",
    },
    {
      imageUrl: "/Eventos/5.jpeg",
      type: "Evento",
      title: "AngoTic 2023",
    },
    {
      imageUrl: "/Eventos/6.jpeg",
      type: "Evento",
      title: "AngoTic 2023",
    },
    {
      imageUrl: "/Eventos/7.jpeg",
      type: "Evento",
      title: "AngoTic 2023",
    },
    {
      imageUrl: "/Eventos/8.jpeg",
      type: "Evento",
      title: "Fórum de Negócios e Conectividade de Benguela 2023",
    },
    {
      imageUrl: "/Eventos/9.jpeg",
      type: "Evento",
      title: "Fórum de Negócios e Conectividade de Benguela 2023",
    },
    {
      imageUrl: "/Eventos/10.jpeg",
      type: "Evento",
      title: "Fórum de Negócios e Conectividade de Benguela 2023",
    },
    {
      imageUrl: "/Eventos/11.jpeg",
      type: "Evento",
      title: "Cerimônia de Outorga de Diplomas",
    },
    {
      imageUrl: "/Eventos/12.jpeg",
      type: "Condecoração",
      title: "Diploma de Mérito de Melhores Alunos",
    },
    {
      imageUrl: "/Eventos/13.jpeg",
      type: "Condecoração",
      title: "Premiação de Melhores Alunos",
    },
    {
      imageUrl: "/Eventos/14.jpeg",
      type: "Condecoração",
      title: "Feira de Inovação Tecnológica do ITEL 2023",
    },
    {
      imageUrl: "/Eventos/15.jpeg",
      type: "Condecoração",
      title: "Feira de Inovação Tecnológica do ITEL 2023",
    },
    {
      imageUrl: "/Eventos/16.jpeg",
      type: "Condecoração",
      title: "Feira de Inovação Tecnológica do ITEL 2023",
    },
    {
      imageUrl: "/Eventos/17.jpeg",
      type: "Condecoração",
      title: "Feira de Inovação Tecnológica do ITEL 2023",
    },
  ];

  const slides = galleryTab.map((item) => ({
    src: item.imageUrl,
    width: 3840,
    height: 2560,
    srcSet: [
      { src: item.imageUrl, width: 320, height: 213 },
      { src: item.imageUrl, width: 320, height: 213 },
      { src: item.imageUrl, width: 320, height: 213 },
      { src: item.imageUrl, width: 320, height: 213 },
      { src: item.imageUrl, width: 320, height: 213 },
    ],
  }));

  return (
    <main className="min-h-screen ">
      <Navbar />

      <section className="mb-20 px-5 md:px-20 lg:px-56 xl:px-80 flex flex-col items-center justify-between pt-20">
        <div className="max-w-4xl w-full container">
          <h2 className={`mb-6 text-3xl font-semibold text-left lg `}>
            Galeria
          </h2>
          <p className="text-base text-lg text-justify ">
            Destaco as conquistas profissionais que enriqueceram minha jornada
            em cada projeto e evento nos quais participei. Hoje, sou uma pessoa
            aprimorada em relação ao meu eu do passado, graças às experiências,
            tanto desafiadoras quanto gratificantes, que enfrentei. Não
            subestimo a complexidade do caminho à transcendência, pois estou
            disposto a fazer os sacrifícios necessários para alcançar meus
            objetivos.
          </p>

          <div className="w-full">
            <div className=" ">
              <div className="flex flex-col md:grid md:grid-cols-3 h-full gap-0 flex-wrap mx-2 md:mx-0">
                {galleryTab.map((x, index) => {
                  return (
                    <div key={index} className="md:h-[20vw] h-screen relative">
                      <div className="group h-full">
                        <div
                          className="bg-cover bg-center h-full w-full bg-no-repeat"
                          style={{ backgroundImage: `url("${x.imageUrl}")` }}
                        >
                          <div className="text-3xl text-white absolute bottom-0 left-2 z-10">
                            <div>{x.type}</div>
                            <div>{x.title}</div>
                          </div>
                        </div>
                        <div
                          className="bg-black opacity-0 group-hover:opacity-75 absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out"
                          onClick={() => {
                            setOpen(true);
                            setImage(x.imageUrl);
                          }}
                        >
                          <p className="text-white">
                            <AiOutlineExpandAlt className="text-5xl border w-16 h-16 bg-neutral-500 hover:bg-white hover:text-black p-3 cursor-pointer rounded-full" />
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <Lightbox
              open={open}
              close={() => setOpen(false)}
              plugins={[Zoom]}
              showPrevNext={false}
              slides={slides}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

Home.useClient = true;
