import i18next from "i18next";
import { File, Github, GithubIcon, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Social() {
    return (
        <section className=" flex flex-col items-center  justify-between pt-10 lg:pt-10">
            <div className="max-w-4xl w-full container">
                <ul className="flex flex-col md:flex-row gap-3 justify-start">
                    <li data-cursor="block">
                        <span

                            className="flex items-center gap-1 border-b transition-all text-gray-500 duration-500 px-[5px] py-[2px] hover:border-gray-500"

                        >
                            <File size="16" />
                            <span className="ml-1">{i18next.t("cv")}:</span>
                            <a href="/CV - Manuel Luvuvamo - Desenvolvedor de Software 2025.pdf" download className="ml-1">PT</a>
                            <a href="/CV - Manuel Luvuvamo - Software Developer 2025.pdf" download className="ml-1">EN</a>
                        </span>
                    </li>
                    <li data-cursor="block">
                        <Link
                            href="https://github.com/manuelluvuvamo"
                            className="flex items-center gap-1 border-b transition-all text-gray-500 duration-500 px-[5px] py-[2px] hover:border-gray-500"
                            target="_blank"
                        >
                            <Github size="20" />
                            <span className="ml-1">github</span>
                        </Link>
                    </li>
                    <li data-cursor="block">
                        <Link
                            href="https://www.linkedin.com/in/manuel-luvuvamo-912907218/"
                            className="flex items-center gap-1 border-b transition-all text-gray-500 duration-500 px-[5px] py-[2px] hover:border-gray-500"
                            target="_blank"
                        >
                            <Linkedin size="20" />
                            <span className="ml-1">linkedin</span>
                        </Link>
                    </li>
                    <li data-cursor="block">
                        <Link
                            href="https://twitter.com/manuelluvuvamo"
                            className="flex items-center gap-1 border-b transition-all text-gray-500 duration-500 px-[5px] py-[2px] hover:border-gray-500"
                            target="_blank"
                        >
                            <Twitter size="20" />
                            <span className="ml-1">twitter</span>
                        </Link>
                    </li>
                    <li data-cursor="block">
                        <Link
                            href="https://facebook.com/manuelluvuvamo"
                            className="flex items-center gap-1 border-b transition-all text-gray-500 duration-500 px-[5px] py-[2px] hover:border-gray-500"
                            target="_blank"
                        >
                            <Instagram size="20" />
                            <span className="ml-1">instagram</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}
