import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Sobre(){
  return(
    <section className="px-5 md:px-20 lg:px-56 xl:px-80 flex flex-col items-center justify-between pt-5 lg:pt-20">
    <div className="max-w-4xl w-full container">
      <h2 className={`mb-6 text-2xl font-semibold text-left lg `}>
        Sobre mim
      </h2>
      <p className="text-base text-lg  text-justify ">
        Meu nome é Manuel António Luvuvamo, sou um apaixonado desenvolvedor
        fullstack, instrutor, empreendedor e escritor ocasional com uma
        sólida experiência em criação de aplicações web. Desde minha
        infância, fui atraído pelo funcionamento interno dos aparelhos e
        eletrônicos, isso me inspirou a saber como os dispositivos
        funcionam.
        <br />
        <br />
        Actualmente, estou frequentando um curso de Licenciatura em
        Engenharia Informática em Luanda, Angola, e dedicando boa parte do
        meu tempo à minha paixão pela programação, meus empreendimentos com
        a{" "}
        <Link
          className="text-base text-gray-400 hover:underline transition-all"
          target="_blank"
          href={"https://facebook.com/quickandsafeshopping"}
        >
          Quick and Safe Shopping
        </Link>{" "}
        e escrita de artigos na melhor comunidade de escritores{" "}
        <Link
          className="text-base text-gray-400 hover:underline transition-all"
          target="_blank"
          href={"https://facebook.com/artogosemanal"}
        >
          Artigo Semanal
        </Link>
        .
        <br />
        <br />
        Como projecto da Prova de Aptidão Profissional(PAP) trabalhei no
        desenvolvimento do{" "}
        <Link
          className="text-base text-gray-400 hover:underline transition-all"
          target="_blank"
          href={
            "https://www.linkedin.com/posts/manuel-luvuvamo-912907218_sistema-de-gest%C3%A3o-de-eventos-diboba-activity-7104576098356596736-x09B?utm_source=share&utm_medium=member_desktop"
          }
        >
          Sistema de Gestão de Eventos - Diboba{" "}
        </Link>
        , um sistema inovador para gerir eventos em Angola e além, solução
        web e integrada com uma componente eletrônica para reconhecimento de
        pulseiras de radiofrequência, que visa melhorar a gestão de eventos,
        oferecer comodidade aos participantes e garantir segurança e
        agilidade. Além disso contribui para o desenvolvimento de projectos
        como{" "}
        <Link
          className="text-base text-gray-400 hover:underline transition-all"
          target="_blank"
          href={"https://itel.gov.ao/"}
        >
          ITEL
        </Link>
        ,{" "}
        <Link
          className="text-base text-gray-400 hover:underline transition-all"
          target="_blank"
          href={"https://vagas.itel.gov.ao/"}
        >
          ITEL Vagas
        </Link>{" "}
        ,{" "}
        <Link
          className="text-base text-gray-400 hover:underline transition-all"
          target="_blank"
          href={"https://lead23.itel.gov.ao/"}
        >
          Lead23
        </Link>{" "}
        e{" "}
        <Link
          className="text-base text-gray-400 hover:underline transition-all"
          target="_blank"
          href={"https://gpeu.ao/"}
        >
          GPEU
        </Link>
        .
        <br />
        <br />É sempre uma honra conhecer novas pessoas e alargar cada vez
        mais o meu networking, sinta - se a vontade para interagir comigo em
        minhas redes sociais. Você pode me encontrar em:
      </p>
    </div>

    <div className="mt-4 grid text-center gap-2 lg:max-w-4xl lg:w-full lg:mb-0 lg:grid-cols-5 lg:text-left">
      <a 
        href="https://github.com/manuelluvuvamo"
        className="border-gray-300 bg-gray-200  hover:animate-none group rounded-xl border border-transparent flex justify-center items-center py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 "
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={` text-md font-medium`}>
          Github{" "}
          <Github className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
        </h2>
      </a>

      <a
        href="https://twitter.com/manuelluvuvamo"
        className="border-gray-300 bg-gray-200  hover:animate-none group rounded-xl border border-transparent flex justify-center items-center py-4  transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 "
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={` text-md font-medium`}>
          Twitter{" "}
          <Twitter className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
        </h2>
      </a>

      <a
        href="https://www.linkedin.com/in/manuel-luvuvamo-912907218/"
        className="border-gray-300 bg-gray-200  hover:animate-none group rounded-xl border border-transparent flex justify-center items-center py-4  transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 "
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={` text-md font-medium`}>
          Linked
          <Linkedin className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none -mt-1.5" />
        </h2>
      </a>

      <a
        href="https://instagram.com/manuelluvuvamo"
        className="border-gray-300 bg-gray-200  hover:animate-none group rounded-xl border border-transparent flex justify-center items-center py-4  transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 "
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={` text-md font-medium`}>
          Instagram{" "}
          <Instagram className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
        </h2>
      </a>

      <a
        href="https://facebook.com/manuelluvuvamo"
        className="border-gray-300 bg-gray-200  hover:animate-none group rounded-xl border border-transparent flex justify-center items-center py-4  transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 "
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={` text-md font-medium`}>
          <Facebook className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none -mt-1.5" />
          acebook{" "}
        </h2>
      </a>
    </div>
  </section>
  )
}