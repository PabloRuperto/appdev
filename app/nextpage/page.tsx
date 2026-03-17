"use client";

import Image from "next/image";
import Link from "next/link";
import { RevealLinks } from "@/components/reveal-links";
import ShaderBackground from "@/components/shader-background";
import RainingLetters from "@/components/MatrixRain";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

 
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 hover:scale-110 transition cursor-pointer"
      >
        <Image
          src="/icon.png"
          alt="logo"
          width={100}
          height={100}
        />
      </Link>

  
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ShaderBackground />
      </div>

  
      <div className="absolute inset-0 z-10 pointer-events-none">
        <RainingLetters />
      </div>

      <div className="relative z-20 flex flex-col items-center pt-80 gap-2 text-center">

        <div className="relative w-80 md:w-[400px] animate-[float_4s_ease-in-out_infinite]">
  
</div>
          <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <RevealLinks />
</motion.div>

      </div>
    </main>
  );
}