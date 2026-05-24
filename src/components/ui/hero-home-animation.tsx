'use client'

import { MeshGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"

export function HeroHomeAnimation() {
  const [mounted, setMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    setMounted(true)

    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateSize()
    window.addEventListener("resize", updateSize)

    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {mounted && (
        <MeshGradient
          width={dimensions.width}
          height={dimensions.height}
          colors={[
            "#72b9bb",
            "#b5d9d9",
            "#ffd1bd",
            "#ffebe0",
            "#8cc5b8",
            "#dbf4a4",
          ]}
          distortion={0.8}
          swirl={0.6}
          speed={0.42}
          offsetX={0.08}
          grainMixer={0}
          grainOverlay={0}
        />
      )}

      {/* subtle overlay for readability */}
      {/* <div className="absolute inset-0 bg-black/20 pointer-events-none" /> */}
    </div>
  )
}