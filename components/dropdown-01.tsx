"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Check } from "lucide-react"
import Link from "next/link"

const DropdownComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState("About Me")

  const options = [
    { id: 1, label: "About Me", href: "/aboutme" },
    { id: 2, label: "Instagram", href: "https://instagram.com/paulmortel", external: true },
  ]

  return (
    <div className="relative w-80">
      {/* Dropdown Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 rounded-xl border-2 border-white bg-black text-white flex items-center justify-between"
      >
        <span className="font-medium">{selected}</span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full mt-2 rounded-xl border-2 border-white bg-black overflow-hidden shadow-xl z-50"
          >
            {options.map((option) =>
              option.external ? (
                <a
                  key={option.id}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setSelected(option.label)
                    setIsOpen(false)
                  }}
                  className="w-full px-6 py-3 text-left text-white hover:bg-white hover:text-black transition flex items-center justify-between"
                >
                  {option.label}
                  {selected === option.label && (
                    <Check className="w-4 h-4" />
                  )}
                </a>
              ) : (
                <Link
                  key={option.id}
                  href={option.href}
                  onClick={() => {
                    setSelected(option.label)
                    setIsOpen(false)
                  }}
                  className="w-full px-6 py-3 text-left text-white hover:bg-white hover:text-black transition flex items-center justify-between"
                >
                  {option.label}
                  {selected === option.label && (
                    <Check className="w-4 h-4" />
                  )}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DropdownComponent
