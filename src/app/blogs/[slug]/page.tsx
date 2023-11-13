import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Footer from "@/components/Footer";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Info from "@/components/Info";
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("blogs"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
  return paths;
}

function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join("blogs", slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content,
  };
}

export default function Page({ params }: any) {
  const props = getPost(params);

  return (
    <main className="min-h-screen ">
      <div className="flex flex-col items-center justify-between pb-8">

        <div className="max-w-4xl w-full">
          <div className="mt-9 sm:mb-3 text-center  pt-8">
            <Link href="/blog">
              {" "}
              <ArrowLeftFromLine size={20} />{" "}
            </Link>
          </div>
        </div>

        <Info description={props.frontMatter.description} date={props.frontMatter.date} title={props.frontMatter.title} />
      </div>

      <section className="mb-20 px-5 md:px-20 lg:px-56 xl:px-80 flex flex-col items-center justify-between pt-20">
        <div className="max-w-4xl w-full container">
          <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate  mx-auto">
            <h1>{props.frontMatter.title}</h1>

            <MDXRemote source={props.content}></MDXRemote>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
