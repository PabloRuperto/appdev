"use client"

import { useState, useEffect, useCallback } from "react"

interface Character {
  char: string
  x: number
  y: number
  speed: number
}

export default function RainingLetters() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set())

  const createCharacters = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const list: Character[] = []

    for (let i = 0; i < 200; i++) {
      list.push({
        char: chars[Math.floor(Math.random() * chars.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.1 + Math.random() * 0.3
      })
    }

    return list
  }, [])

  useEffect(() => {
    setCharacters(createCharacters())
  }, [createCharacters])

  useEffect(() => {
    const interval = setInterval(() => {
      const newSet = new Set<number>()
      for (let i = 0; i < 5; i++) {
        newSet.add(Math.floor(Math.random() * characters.length))
      }
      setActiveIndices(newSet)
    }, 100)

    return () => clearInterval(interval)
  }, [characters.length])

  useEffect(() => {
    let id: number

    const animate = () => {
      setCharacters((prev) =>
        prev.map((c) => ({
          ...c,
          y: c.y > 100 ? -5 : c.y + c.speed
        }))
      )

      id = requestAnimationFrame(animate)
    }

    id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden">

      {characters.map((c, i) => (
        <span
          key={i}
          className={
            activeIndices.has(i)
              ? "absolute text-orange-400"
              : "absolute text-gray-600"
          }
          style={{
            left: c.x + "%",
            top: c.y + "%",
            fontSize: "1.2rem",
            opacity: activeIndices.has(i) ? 1 : 0.4
          }}
        >
          {c.char}
        </span>
      ))}

    </div>
  )
}
