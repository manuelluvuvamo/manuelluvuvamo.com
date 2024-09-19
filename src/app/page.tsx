"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sobre from "@/components/Sobre";
import Social from "@/components/Social";
import "@/locales/index"
/* import { ThemeProvider } from "next-themes"; */

export default function Home() {
  return (
    <main className="min-h-screen ">
      <Navbar />

      <Sobre />

      <Social />

      <Footer />
    </main>
  );
}
// Marque o componente como um "Client Component"
Home.useClient = true;
