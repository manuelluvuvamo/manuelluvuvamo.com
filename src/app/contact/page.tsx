"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GuestBookForm from "@/components/GuestBookForm";
import { WEBSITE_HOST_URL } from "@/lib/constants";
import { Metadata } from "next";


export default function Home() {
  return (
    <main className="min-h-screen ">
      <Navbar />

      <section className="mb-20  flex flex-col items-center justify-between pt-5">
        <div className="max-w-4xl w-full container">
          <h2 className={`mb-6 text-3xl font-semibold text-left lg `}>
            Contact
          </h2>
          <p className="text-base text-lg text-justify ">
          It{"'"}s a pleasure to have you here. This is the perfect opportunity to
            share your thoughts, feedback, or just say hello.
            If you{"'"}ve had a chance to explore my portfolio, participated in any
            project with me or just stopped by, I{"'"}d love to hear your
            feedback. <br />
            <br />
            Thank you for being part of this space!
          </p>

          <GuestBookForm/>
        </div>
      </section>

      <Footer />
    </main>
  );
}

Home.useClient = true;
