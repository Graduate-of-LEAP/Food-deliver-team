"use client";
import { Footer } from "./components/Footer";
import { Headdder } from "./components/Headdder";
import { Header } from "./components/Header";
import Main from "./components/Main";
import Main1 from "./components/Main1";

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <Headdder />
      {/* <Main /> */}
      <Main1 />
      <Footer />
    </>
  );
}
