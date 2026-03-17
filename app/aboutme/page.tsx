"use client";

import Link from "next/link";
import Image from "next/image";
import RainingLetters from "@/components/MatrixRain";
import ShaderBackground from "@/components/shader-background";
import { AnimatedTabs } from "@/components/ui/animated-tabs";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

 
      <Link
        href="/nextpage"
        className="fixed top-6 left-6 z-50 hover:scale-110 transition cursor-pointer"
      >
        <Image
          src="/icon.png"
          alt="logo"
          width={90}
          height={90}
        />
      </Link>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <RainingLetters />
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <ShaderBackground />
      </div>

      <div className="relative z-20 flex items-center justify-center min-h-screen px-6 pt-32">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl">


          <AnimatedTabs />


        </div>
      </div>

    </main>
  );
}