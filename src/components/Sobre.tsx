import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Sobre() {
  return (
    <section className="flex flex-col items-center justify-between pt-5 lg:pt-20">
      <div className="max-w-4xl w-full container">
        <h2 className={`mb-6 text-lg font-normal text-left lg `}>
          hello, I{"'"}m Manuel Luvuvamo👋🏾
        </h2>
        <p className="text-base text-lg  text-justify ">
          Software developer, trainer and occasional writer with a
          solid experience in the creation, integration and extensibility of web applications.
          <br />
          <br />
          I{"'"}m currently studying for a degree in
          Engineering in Luanda, and I devote much of my time to my passion for programming, my ventures at{" "}
          <Link
            className="text-base text-gray-500 hover:underline transition-all"
            target="_blank"
            href={"https://facebook.com/quickandsafeshopping"}
          >
            Quick and Safe Shopping
          </Link>{" "}
          and article writing in the best community of writers{" "}
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
          Previous versions of my portfolio had a section dedicated to images of some of the events I take part in, luckily
          <Link
            href="https://euotiniel.com/"
            className="text-base text-gray-500 hover:underline transition-all font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}Otoniel Emanuel{" 's"}

          </Link> portfolio saved me from this. At the moment
          <Link
            href="https://read.cv/manuelluvuvamo"
            className="text-base text-gray-500 hover:underline transition-all font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >

            {" "}Read.cv{" "}

          </Link>.
          <br />
          <br />It{"'"}s always an honor to meet new people and to broaden
          feel free to interact with me on my social networks.
          my social networks.
        </p>
      </div>

    
    </section>
  )
}