
import {
  BookOpen,
  Facebook,
  Github,
  Instagram,
  Link2,
  Link as Linkk,
  Linkedin,
  Twitter,
  Eye,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import ParticlesComponent from "@/components/ParticlesComponent";
import FotoCard from "@/components/FotoCard";
import Sobre from "@/components/Sobre";
import ProjectCard from "@/components/ProjectCard";
import ProjectCard2 from "@/components/ProjectCard2";
import BlogCard from "@/components/BlogCard";
import fs from 'fs'
import path from "path";
import matter from 'gray-matter'
/* import { ThemeProvider } from "next-themes"; */


export default function Home() {
  const blogDir = 'blogs';
  const files = fs.readdirSync(path.join(blogDir));

  const blogs = files.map(filename => {
    const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf-8')

    const {data: frontMatter} = matter(fileContent);
    return {
      meta: frontMatter,
      slug: filename.replace('.mdx','')
    }
  })

  return (
    <main className="min-h-screen ">
      <Navbar />

      <section className="mb-20 px-5 md:px-20 lg:px-56 xl:px-80 flex flex-col items-center justify-between pt-20">
        <div className="max-w-4xl w-full container">
          <h2 className={`mb-1 text-3xl font-semibold text-left lg `}>Blog</h2>

          <div className="mt-10 flex flex-col text-left justify-start items-start lg:max-w-4xl lg:w-full lg:mb-0 lg:text-left p-0">
          
          {blogs.map(blog=>(
           
           <BlogCard href={'/blogs/'+blog.slug} key={blog.slug}  titulo={blog.meta.title} desc={blog.meta.description} views="1K" data={blog.meta.date}/>
          
           ))}
          
          
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


