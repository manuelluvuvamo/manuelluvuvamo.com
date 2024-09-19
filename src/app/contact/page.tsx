"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GuestBookForm from "@/components/GuestBookForm";
import "@/locales/index"
import i18next from "i18next";


export default function Home() {
  return (
    <main className="min-h-screen ">
      <Navbar />

      <section className="mb-20  flex flex-col items-center justify-between pt-5 lg:pt-20">
        <div className="max-w-4xl w-full container">
          <h2 className={`mb-6 text-3xl font-semibold text-left lg `}>
            {i18next.t("contact_title")}
          </h2>
          <p className="text-base text-justify ">
          {i18next.t("contact_text")}
          </p>

          <GuestBookForm/>
        </div>
      </section>

      <Footer />
    </main>
  );
}

Home.useClient = true;
