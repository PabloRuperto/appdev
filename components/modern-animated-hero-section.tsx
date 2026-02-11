"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"

interface Character {
  char: string
  x: number
  y: number
  speed: number
}

class TextScramble {
  el: HTMLElement
  chars: string
  queue: any[]
  frame: number
  frameRequest: number
  resolve: () => void

  constructor(el: HTMLElement) {
    this.el = el
    this.chars = "!<>-_\\/[]{}-=+*^?#"
    this.queue = []
    this.frame = 0
    this.frameRequest = 0
    this.resolve = () => {}
    this.update = this.update.bind(this)
  }

  setText(newText: string) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)

    const promise = new Promise<void>((resolve) => {
      this.resolve = resolve
    })

    this.queue = []

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ""
      const to = newText[i] || ""
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }

    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  update() {
    let output = ""
    let complete = 0

    for (let i = 0; i < this.queue.length; i++) {
      let item = this.queue[i]
      let from = item.from
      let to = item.to
      let start = item.start
      let end = item.end
      let char = item.char

      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)]
          this.queue[i].char = char
        }
        output += char
      } else {
        output += from
      }
    }

    this.el.innerText = output

    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
}

function ScrambledTitle() {
  const elementRef = useRef<HTMLHeadingElement>(null)
  const scramblerRef = useRef<TextScramble | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    scramblerRef.current = new TextScramble(elementRef.current)

    const phrases = [
      "Hello Paul!",
      "DAILY REMINDER!",
      "Don't be dumb.",
      "Go to school.",
      "And don't skip the gym!"
    ]

    let counter = 0

    const next = () => {
      if (!scramblerRef.current) return

      scramblerRef.current.setText(phrases[counter]).then(() => {
        setTimeout(next, 2000)
      })

      counter = (counter + 1) % phrases.length
    }

    next()
  }, [])

  return (
    <h1
      ref={elementRef}
      className="text-white text-3xl md:text-6xl font-bold text-center min-h-[100px] md:min-h-[160px] flex items-center justify-center"
      style={{ fontFamily: "monospace" }}
    >
      Loading...
    </h1>
  )
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

      {/* Centered Title + Button */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-8 z-20">

        <ScrambledTitle />

        <Link href="/nextpage">
          <button className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white text-lg md:text-xl font-semibold rounded-xl transition duration-300 hover:scale-105">
            Enter
          </button>
        </Link>

      </div>

      {/* Rain */}
      {characters.map((c, i) => (
        <span
          key={i}
          className={activeIndices.has(i) ? "absolute text-orange-400" : "absolute text-gray-600"}
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
