"use client";

import Link from "next/link";
import Image from "next/image";
import RainingLetters from "@/components/MatrixRain";
import ShaderBackground from "@/components/shader-background";

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

          {/*dp*/}
          <div className="flex-shrink-0">
            <Image
              src="/dp.JPG"
              alt="Paul Mortel"
              width={500}
              height={500}
              className="rounded-xl object-cover shadow-lg"
            />
          </div>

          {/*about me*/}
          <div className="max-w-2xl text-center md:text-left">

  <h1 className="text-6xl md:text-7xl text-orange-500 font-bold mb-6">
    About Me
  </h1>

  <p className="text-xl md:text-2xl text-gray-300 mb-6">
    I'm Paul Mortel from Fairview, Quezon City. I was born on February 27
    and I enjoy balancing creativity with an active lifestyle.
  </p>

  <p className="text-xl md:text-2xl text-gray-300 mb-6">
    In my free time I like riding my bike, going to the gym, and jogging
    or running to stay healthy and energized.
  </p>

  <p className="text-xl md:text-2xl text-gray-300">
    I also have a strong interest in art and creativity. I enjoy exploring
    designs and ideas that combine visual creativity with technology.
  </p>

</div>

        </div>
      </div>

    </main>
  );
}