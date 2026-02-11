"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
}

export default function RotatingEarth({
  width = 800,
  height = 600,
  className = "",
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    const containerWidth = Math.min(width, window.innerWidth - 40)
    const containerHeight = Math.min(height, window.innerHeight - 100)
    const radius = Math.min(containerWidth, containerHeight) / 2.3

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath(projection, context)

    let landData: any
    const dots: { lng: number; lat: number }[] = []

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)

      const scaleFactor = projection.scale() / radius

      // Globe outline (transparent inside)
      context.beginPath()
      context.arc(
        containerWidth / 2,
        containerHeight / 2,
        projection.scale(),
        0,
        2 * Math.PI
      )
      context.strokeStyle = "#ffffff"
      context.lineWidth = 2 * scaleFactor
      context.stroke()

      if (!landData) return

      // Graticule
      const graticule = d3.geoGraticule()
      context.beginPath()
      path(graticule())
      context.strokeStyle = "#ffffff"
      context.globalAlpha = 0.2
      context.lineWidth = 1 * scaleFactor
      context.stroke()
      context.globalAlpha = 1

      // Land outlines
      context.beginPath()
      landData.features.forEach((feature: any) => {
        path(feature)
      })
      context.strokeStyle = "#ffffff"
      context.lineWidth = 1 * scaleFactor
      context.stroke()

      // Land dots
      dots.forEach((dot) => {
        const projected = projection([dot.lng, dot.lat])
        if (!projected) return

        context.beginPath()
        context.arc(projected[0], projected[1], 1.3 * scaleFactor, 0, 2 * Math.PI)
        context.fillStyle = "#ffffff"
        context.fill()
      })
    }

    const loadData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/110m/physical/ne_110m_land.json"
      )
      landData = await response.json()

      // Generate proper land dots using geoContains
      landData.features.forEach((feature: any) => {
        const bounds = d3.geoBounds(feature)
        const [[minLng, minLat], [maxLng, maxLat]] = bounds

        for (let lng = minLng; lng <= maxLng; lng += 2) {
          for (let lat = minLat; lat <= maxLat; lat += 2) {
            const point: [number, number] = [lng, lat]
            if (d3.geoContains(feature, point)) {
              dots.push({ lng, lat })
            }
          }
        }
      })

      render()
    }

    // Rotation state
    let rotation: [number, number] = [0, 0]
    let isDragging = false

    const rotateTimer = d3.timer(() => {
      if (!isDragging) {
        rotation[0] += 0.2
        projection.rotate(rotation)
        render()
      }
    })

    // Drag behavior
    const drag = d3
      .drag<HTMLCanvasElement, unknown>()
      .on("start", () => {
        isDragging = true
      })
      .on("drag", (event) => {
        const sensitivity = 0.4
        rotation[0] += event.dx * sensitivity
        rotation[1] -= event.dy * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))
        projection.rotate(rotation)
        render()
      })
      .on("end", () => {
        isDragging = false
      })

    d3.select(canvas).call(drag as any)

    // Zoom behavior
    canvas.addEventListener("wheel", (event) => {
      event.preventDefault()
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1
      const newScale = Math.max(
        radius * 0.5,
        Math.min(radius * 3, projection.scale() * scaleFactor)
      )
      projection.scale(newScale)
      render()
    })

    loadData()

    return () => {
      rotateTimer.stop()
    }
  }, [width, height])

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="w-full h-auto" />
      <div className="absolute bottom-4 left-80 text-xs text-white/60">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  )
}
