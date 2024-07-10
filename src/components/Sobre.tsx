import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Sobre() {
  return (
    <section className="px-5 md:px-20 lg:px-56 xl:px-80 flex flex-col items-center justify-between pt-5 lg:pt-20">
      <div className="max-w-4xl w-full container">
        <h2 className={`mb-6 text-lg font-normal text-left lg `}>
          olá, sou o Manuel Luvuvamo👋🏾
        </h2>
        <p className="text-base text-lg  text-justify ">
          Desenvolvedor de Software, instrutor e escritor ocasional com uma
          sólida experiência em criação, integração e extensibilidade de aplicações web.
          <br />
          <br />
          Actualmente, frequento um curso de Licenciatura em
          Engenharia Informática em Luanda, e dedico boa parte do
          meu tempo à minha paixão pela programação, meus empreendimentos com
          a{" "}
          <Link
            className="text-base text-gray-500 hover:underline transition-all"
            target="_blank"
            href={"https://facebook.com/quickandsafeshopping"}
          >
            Quick and Safe Shopping
          </Link>{" "}
          e escrita de artigos na melhor comunidade de escritores{" "}
          <Link
            className="text-base text-gray-500 hover:underline transition-all"
            target="_blank"
            href={"https://facebook.com/artogosemanal"}
          >
            Artigo Semanal
          </Link>
          .
          <br />
          <br />
          Versões anteriores do meu portfólio tinham uma secção dedicada a imagens de alguns eventos em que participo, felizmente o portfólio do
          <Link
            href="https://euotiniel.com/"
            className="text-base text-gray-500 hover:underline transition-all font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}Otoniel Emanuel{" "}

          </Link> salvou-me disso. Por ora
          <Link
            href="https://euotiniel.com/"
            className="text-base text-gray-500 hover:underline transition-all font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >

            {" "}Read.cv{" "}

          </Link>.
          <br />
          <br />É sempre uma honra conhecer novas pessoas e alargar cada vez
          mais o meu networking, sinta - se a vontade para interagir comigo em
          minhas redes sociais.
        </p>
      </div>

    
    </section>
  )
}