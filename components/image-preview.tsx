"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Share2, Bookmark } from "lucide-react"

type ImagePreviewProps = {
  src: string
  alt: string
  aspectRatio?: string
  onDownload: () => void
}

export function ImagePreview({ src, alt, aspectRatio = "1:1", onDownload }: ImagePreviewProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  let paddingBottom = "100%" // Default for 1:1

  if (aspectRatio === "16:9") {
    paddingBottom = "56.25%"
  } else if (aspectRatio === "9:16") {
    paddingBottom = "177.78%"
  } else if (aspectRatio === "4:3") {
    paddingBottom = "75%"
  }

  // Check if the image is a base64 string
  const isBase64 = src.startsWith("data:image")

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ paddingBottom }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {isBase64 ? (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${isLoading ? "opacity-0" : "opacity-100"}`}
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className={`object-cover transition-transform duration-500 hover:scale-105 ${isLoading ? "opacity-0" : "opacity-100"}`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          onLoad={() => setIsLoading(false)}
        />
      )}

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 flex items-end justify-center p-6 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex gap-3">
          <Button
            size="sm"
            className="bg-white text-slate-900 hover:bg-white/90 transition-colors"
            onClick={onDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button size="sm" variant="outline" className="bg-black/50 border-white/20 text-white hover:bg-black/70">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" className="bg-black/50 border-white/20 text-white hover:bg-black/70">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

