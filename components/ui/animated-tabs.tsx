"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs?: Tab[];
  defaultTab?: string;
  className?: string;
}

const defaultTabs: Tab[] = [
  {
    id: "tab1",
    label: "ABOUT ME",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-stretch">
        <img
          src="dp.JPG"
          alt="Tab 1"
          className="rounded-lg w-full h-full object-cover shadow-[0_0_20px_rgba(0,0,0,0.2)]"
        />

        <div className="flex flex-col justify-center h-full">
          <p className="text-base md:text-lg text-gray-200 leading-relaxed">
            My name is Paul Mortel, and I was born on February 27. I currently live in North Fairview, Quezon City. I’m someone who values consistency and self-improvement, always trying to grow and stay focused on my goals while keeping things simple and real.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "tab2",
    label: "HOBBY",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-stretch">
        <img
          src="hobby.jpg"
          alt="Tab 2"
          className="rounded-lg w-full h-full object-cover shadow-[0_0_20px_rgba(0,0,0,0.2)]"
        />

        <div className="flex flex-col justify-center h-full">
          <p className="text-base md:text-lg text-gray-200 leading-relaxed">
            In my free time, I enjoy staying active and productive. I regularly go to the gym and spend time jogging or running, which helps me stay physically and mentally fit. I also like going on bike rides, as it gives me a sense of freedom and relaxation. When I want to unwind, I play video games and watch movies, especially horror films, which I find exciting and interesting.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "tab3",
    label: "INTERESTS",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-stretch">
        <img
          src="interest.jpg"
          alt="Tab 3"
          className="rounded-lg w-full h-full object-cover shadow-[0_0_20px_rgba(0,0,0,0.2)]"
        />

        <div className="flex flex-col justify-center h-full">
          <p className="text-base md:text-lg text-gray-200 leading-relaxed">
            I have a strong interest in art and creative expression, particularly when it comes to meaningful designs. I’m also into tattoos, appreciating both their aesthetic and personal significance. I enjoy anything related to horror, from movies to concepts, and I’m fascinated by Japanese culture, especially its traditions, style, and overall vibe.
          </p>
        </div>
      </div>
    ),
  },
];

const AnimatedTabs = ({
  tabs = defaultTabs,
  defaultTab,
  className,
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full max-w-5xl mx-auto flex flex-col gap-y-4", className)}>
      <div className="flex gap-2 flex-wrap bg-[#11111198] backdrop-blur-sm p-2 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-4 py-2 text-sm font-medium rounded-lg text-white"
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                 className="absolute inset-0 bg-orange-500 shadow-[0_0_20px_rgba(255,165,0,0.6)] rounded-lg"
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8 bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] text-white backdrop-blur-sm rounded-xl border min-h-[450px]">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                className="h-full"
                initial={{ opacity: 0, scale: 0.95, x: -10, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: "circInOut", type: "spring" }}
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export { AnimatedTabs };