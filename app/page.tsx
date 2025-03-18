import type { Metadata } from "next"
import ImageGenerator from "@/components/image-generator"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"

export const metadata: Metadata = {
  title: "Imagify - AI Image Generation",
  description: "Generate beautiful images from text descriptions using AI",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden">
      <BackgroundGradient />
      <NavBar />
      <main className="relative">
        <HeroSection />
        <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
          <ImageGenerator />
        </section>
      </main>
    </div>
  )
}

