"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type GenerationParamsType = {
  style: string
  aspectRatio: string
  detailLevel: number
  lightingMood: string
  cameraView: string
  composition: string
  colorPalette: string
  background: string
}

type GenerationParametersProps = {
  params: GenerationParamsType
  onChange: (params: GenerationParamsType) => void
}

export function GenerationParameters({ params, onChange }: GenerationParametersProps) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="style" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="composition">Composition</TabsTrigger>
          <TabsTrigger value="lighting">Lighting</TabsTrigger>
          <TabsTrigger value="camera">Camera</TabsTrigger>
        </TabsList>

        <TabsContent value="style" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="style-select" className="text-sm">
                Art Style
              </Label>
              <Select value={params.style} onValueChange={(value) => onChange({ ...params, style: value })}>
                <SelectTrigger id="style-select" className="border-slate-200 dark:border-slate-800">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realistic">Realistic</SelectItem>
                  <SelectItem value="3d">3D Rendered</SelectItem>
                  <SelectItem value="anime">Anime</SelectItem>
                  <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                  <SelectItem value="pixel">Pixel Art</SelectItem>
                  <SelectItem value="sketch">Sketch</SelectItem>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color-palette" className="text-sm">
                Color Palette
              </Label>
              <Select
                value={params.colorPalette}
                onValueChange={(value) => onChange({ ...params, colorPalette: value })}
              >
                <SelectTrigger id="color-palette" className="border-slate-200 dark:border-slate-800">
                  <SelectValue placeholder="Select palette" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vibrant">Vibrant</SelectItem>
                  <SelectItem value="monochrome">Monochrome</SelectItem>
                  <SelectItem value="pastel">Pastel</SelectItem>
                  <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                  <SelectItem value="muted">Muted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="detail-level-slider" className="text-sm">
              Detail Level
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Low</span>
              <Slider
                id="detail-level-slider"
                min={0}
                max={100}
                step={1}
                value={[params.detailLevel]}
                onValueChange={(value) => onChange({ ...params, detailLevel: value[0] })}
                className="flex-1"
              />
              <span className="text-xs text-slate-500 dark:text-slate-400">High</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="background-select" className="text-sm">
              Background
            </Label>
            <Select value={params.background} onValueChange={(value) => onChange({ ...params, background: value })}>
              <SelectTrigger id="background-select" className="border-slate-200 dark:border-slate-800">
                <SelectValue placeholder="Select background" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimalist">Minimalist</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
                <SelectItem value="blurred">Blurred</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="composition" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="aspect-ratio-select" className="text-sm">
                Aspect Ratio
              </Label>
              <Select value={params.aspectRatio} onValueChange={(value) => onChange({ ...params, aspectRatio: value })}>
                <SelectTrigger id="aspect-ratio-select" className="border-slate-200 dark:border-slate-800">
                  <SelectValue placeholder="Select ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1:1">1:1 (Square)</SelectItem>
                  <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                  <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                  <SelectItem value="4:3">4:3 (Classic)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="composition-select" className="text-sm">
                Composition
              </Label>
              <Select value={params.composition} onValueChange={(value) => onChange({ ...params, composition: value })}>
                <SelectTrigger id="composition-select" className="border-slate-200 dark:border-slate-800">
                  <SelectValue placeholder="Select composition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="centered">Centered</SelectItem>
                  <SelectItem value="golden-ratio">Golden Ratio</SelectItem>
                  <SelectItem value="dynamic">Dynamic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="lighting" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lighting-mood-select" className="text-sm">
              Lighting & Mood
            </Label>
            <Select value={params.lightingMood} onValueChange={(value) => onChange({ ...params, lightingMood: value })}>
              <SelectTrigger id="lighting-mood-select" className="border-slate-200 dark:border-slate-800">
                <SelectValue placeholder="Select lighting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="natural">Natural</SelectItem>
                <SelectItem value="bright">Bright & Vibrant</SelectItem>
                <SelectItem value="dark">Dark & Cinematic</SelectItem>
                <SelectItem value="golden">Golden Hour</SelectItem>
                <SelectItem value="neon">Neon Glow</SelectItem>
                <SelectItem value="warm sunset">Warm Sunset</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="camera" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="camera-view-select" className="text-sm">
              Camera Perspective
            </Label>
            <Select value={params.cameraView} onValueChange={(value) => onChange({ ...params, cameraView: value })}>
              <SelectTrigger id="camera-view-select" className="border-slate-200 dark:border-slate-800">
                <SelectValue placeholder="Select camera view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="closeup">Close-up</SelectItem>
                <SelectItem value="wide">Wide-angle</SelectItem>
                <SelectItem value="first-person">First-person</SelectItem>
                <SelectItem value="birds-eye">Bird's-eye</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

