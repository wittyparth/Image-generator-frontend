"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Download, Share2, Sparkles, Loader2, Zap, ImageIcon, RefreshCw, Bookmark, Copy, Check } from "lucide-react"
import { ImageSkeleton } from "@/components/image-skeleton"
import { GenerationParameters } from "@/components/generation-parameters"
import { PromptSuggestions } from "@/components/prompt-suggestions"
import { ImagePreview } from "@/components/image-preview"

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [imageGenerated, setImageGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("prompt")
  const [generationParams, setGenerationParams] = useState({
    style: "realistic",
    aspectRatio: "1:1",
    detailLevel: 50,
    lightingMood: "natural",
    cameraView: "normal",
    composition: "centered",
    colorPalette: "vibrant",
    background: "detailed",
  })

  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setImageGenerated(false)
    setError(null)

    try {
      const response = await fetch("https://image-genration-backend.onrender.com/generate-image/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
          enhance_prompt: true,
          style: generationParams.style,
          aspect_ratio: generationParams.aspectRatio,
          detail_level:
            generationParams.detailLevel > 66 ? "High" : generationParams.detailLevel > 33 ? "Medium" : "Low",
          lighting_mood: generationParams.lightingMood,
          camera_view: generationParams.cameraView,
          composition: generationParams.composition,
          color_palette: generationParams.colorPalette,
          background: generationParams.background,
          num_variants: 1,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      setGeneratedImageUrl(data.image)
      setIsGenerating(false)
      setImageGenerated(true)
    } catch (err) {
      console.error("Error generating image:", err)
      setError(err instanceof Error ? err.message : "Failed to generate image")
      setIsGenerating(false)
    }
  }

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!generatedImageUrl) return

    const link = document.createElement("a")
    link.href = generatedImageUrl
    link.download = "generated-image.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="space-y-6">
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-slate-100 dark:bg-slate-900 rounded-none border-b border-slate-200 dark:border-slate-800 p-0">
              <TabsTrigger
                value="prompt"
                className="flex-1 rounded-none border-r border-slate-200 dark:border-slate-800 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950"
              >
                Prompt
              </TabsTrigger>
              <TabsTrigger
                value="parameters"
                className="flex-1 rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950"
              >
                Parameters
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prompt" className="m-0">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt" className="text-base font-medium">
                      Describe your image
                    </Label>
                    <Textarea
                      id="prompt"
                      placeholder="A futuristic cityscape with neon lights and flying cars, cyberpunk style..."
                      className="min-h-[150px] resize-none border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                          onClick={handleCopyPrompt}
                        >
                          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          <span className="sr-only">{copied ? "Copied" : "Copy prompt"}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                          onClick={() => setPrompt("")}
                          disabled={!prompt}
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          <span className="sr-only">Clear prompt</span>
                        </Button>
                      </div>
                      <span>{prompt.length}/1000</span>
                    </div>
                  </div>

                  <PromptSuggestions onSelectPrompt={setPrompt} />

                  <Button
                    className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 hover:opacity-90 transition-opacity"
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Image
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="parameters" className="m-0">
              <CardContent className="p-6">
                <GenerationParameters params={generationParams} onChange={setGenerationParams} />
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium">Quick settings</h3>
              <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-slate-500 dark:text-slate-400">
                Reset
              </Button>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="style" className="text-sm">
                    Style
                  </Label>
                  <Select
                    value={generationParams.style}
                    onValueChange={(value) => setGenerationParams({ ...generationParams, style: value })}
                  >
                    <SelectTrigger id="style" className="border-slate-200 dark:border-slate-800">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">Realistic</SelectItem>
                      <SelectItem value="3d">3D Rendered</SelectItem>
                      <SelectItem value="anime">Anime</SelectItem>
                      <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                      <SelectItem value="pixel">Pixel Art</SelectItem>
                      <SelectItem value="sketch">Sketch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aspect-ratio" className="text-sm">
                    Aspect Ratio
                  </Label>
                  <Select
                    value={generationParams.aspectRatio}
                    onValueChange={(value) => setGenerationParams({ ...generationParams, aspectRatio: value })}
                  >
                    <SelectTrigger id="aspect-ratio" className="border-slate-200 dark:border-slate-800">
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
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="detail-level" className="text-sm">
                    Detail Level
                  </Label>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{generationParams.detailLevel}%</span>
                </div>
                <Slider
                  id="detail-level"
                  min={0}
                  max={100}
                  step={1}
                  value={[generationParams.detailLevel]}
                  onValueChange={(value) => setGenerationParams({ ...generationParams, detailLevel: value[0] })}
                  className="py-1"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="hd-toggle" className="text-sm cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5 text-amber-500" />
                    <span>HD Quality</span>
                  </div>
                </Label>
                <Switch id="hd-toggle" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            {isGenerating ? (
              <ImageSkeleton aspectRatio={generationParams.aspectRatio} />
            ) : imageGenerated ? (
              <ImagePreview
                src={generatedImageUrl || "/placeholder.svg?height=1024&width=1024"}
                alt="Generated image"
                aspectRatio={generationParams.aspectRatio}
                onDownload={handleDownload}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center h-[450px]">
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-indigo-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Your image will appear here</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-xs">
                  Describe what you want to see, adjust parameters, and our AI will bring it to life
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 text-sm">
            <p>Error: {error}</p>
            <p className="mt-1 text-xs">Please try again or check your connection.</p>
          </div>
        )}

        {imageGenerated && (
          <div className="space-y-4">
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1.5" onClick={handleDownload}>
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1.5">
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1.5">
                    <Bookmark className="h-3.5 w-3.5" />
                    <span>Save</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1.5 ml-auto">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Regenerate</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-3">Image details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Style</p>
                    <p className="font-medium">
                      {generationParams.style.charAt(0).toUpperCase() + generationParams.style.slice(1)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Resolution</p>
                    <p className="font-medium">1024 × 1024</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Created</p>
                    <p className="font-medium">Just now</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Model</p>
                    <p className="font-medium">Gemini Pro</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

