"use client";

import DropdownComponent from "@/components/dropdown-01";
import RainingLetters from "@/components/MatrixRain";
import RotatingEarth from "@/components/wireframe-dotted-globe";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">

      {/* 🌧 Rain background */}
      <div className="absolute inset-0 z-0">
        <RainingLetters />
      </div>

     <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-10">
  <RotatingEarth />
  <DropdownComponent />
</div>


    </main>
  )
}