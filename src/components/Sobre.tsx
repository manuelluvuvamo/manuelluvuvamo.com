import i18next from "i18next";
import Link from "next/link";


export default function Sobre() {
  return (
    <section className="flex flex-col items-center justify-between pt-5 lg:pt-20">
      <div className="max-w-4xl w-full container">
        <h2 className={`mb-6 text-lg font-normal text-left lg `}>
          {i18next.t("hello")}
        </h2>
        <p className="text-base text-lg  text-justify ">
          {i18next.t("p1")}
          <br />
          <br />
          {i18next.t("p2")}{" "}
          <Link
            className="text-base text-gray-500 hover:underline transition-all"
            target="_blank"
            href={"https://facebook.com/quickandsafeshopping"}
          >
            Quick and Safe Shopping
          </Link>{" "}
         {i18next.t('p3')}{" "}
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
          {i18next.t('p4')}
          <Link
            href="https://euotiniel.com/"
            className="text-base text-gray-500 hover:underline transition-all font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}{i18next.t('otiniel')}

          </Link> {i18next.t('p5')}
          <Link
            href="https://read.cv/manuelluvuvamo"
            className="text-base text-gray-500 hover:underline transition-all font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >

            {" "}Read.cv{" "}

          </Link>.
          <br />
          <br />{i18next.t('p6')}
        </p>
      </div>


    </section>
  )
}