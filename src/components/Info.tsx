import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Footer from "@/components/Footer";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface Info {
  description: string;
  date: string;
  title: string;
 
}
export default function Info(props:Info) {
  return (
    <div className="lg:max-w-7xl  w-full">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-xs md:text-sm font-semibold">{props.date}</div>
        <h2 className="mt-6 md:mt-10 scroll-m-20 pb-2 text-2xl md:text-4xl font-extrabold tracking-tight transition-colors first:mt-0">
        {props.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-6 tracking-normal md:text-base font-semibold md:text-[14px] md:px-8 lg:px-16 xl:px-48 mt-4 md:mt-6">
          {props.description}
        </p>
        <div className="mt-4 md:mt-8">
          <Link
            href=""
            className="flex flex-row gap-2 items-center justify-center"
          >
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span
                className="text-xs md:text-sm font-medium leading-none"
                title="Um título que o represente"
              >
                Manuel Luvuvamo
              </span>

              <span className="text-xs md:text-sm text-muted-foreground">
                @manuelluvuvamo
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
