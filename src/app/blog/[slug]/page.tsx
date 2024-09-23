
import Footer from "@/components/Footer";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { WEBSITE_HOST_URL } from "@/lib/constants";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";
import { format, parseISO } from "date-fns";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) {
    return;
  }

  const { title, description, date, url } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
      url: `${WEBSITE_HOST_URL}/blog/${url}`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `${WEBSITE_HOST_URL}/blog/${url}`,
    },
  };
}

// Define your custom MDX components.
const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  Image: (props) => <NextImage className="rounded-lg" {...props} />,
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <main>
      <div className="max-w-4xl  w-ful mt-12 flex flex-col gap-3 container">
        <div className="flex w-full flex-row items-center justify-between">
          <Link
            href="/blog/"
            className="mt-5 flex flex-row items-center gap-2 leading-6 tracking-normal text-muted-foreground"
          >
            <ArrowLeftFromLine size={20} />{" "}
            <span className="text-[13px]">voltar</span>
          </Link>
          <div></div>
        </div>
        <div className="mt-10 flex flex-col">
          <time className="text-gray-500 text-xs mt-10 italic" dateTime={post.date}>
            {post.data}
          </time>
          <h2 className="scroll-m-20 pb-2 text-2xl md:text-3xl font-extrabold tracking-tight transition-colors first:mt-0 ">
            {post.title}
          </h2>
        </div>
        <article className="mt-14 w-full dark:prose-invert text-zinc-800 dark:text-zinc-200">
          <MDXContent components={mdxComponents} />
        </article>
      </div>
      <Footer />
    </main>
  );
};

export default PostLayout;