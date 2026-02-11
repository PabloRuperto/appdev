"use client";

import RainingLetters from "@/components/MatrixRain";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* 🌧 Rain background */}
      <div className="absolute inset-0 z-0">
        <RainingLetters />
      </div>
<div className="flex items-center justify-center min-h-screen">
  <div className="text-center">
     <h1 className="text-5xl font-bold">
    About Me
  </h1>

  <p className="text-xl font-semibold">
    testing
  </p>
  </div>
</div>
    

    </main>
  )
}