"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

type PromptSuggestionsProps = {
  onSelectPrompt: (prompt: string) => void
}

export function PromptSuggestions({ onSelectPrompt }: PromptSuggestionsProps) {
  const suggestions = [
    "A serene Japanese garden with cherry blossoms, traditional architecture, and a small pond",
    "A futuristic cityscape with flying cars and neon lights at night",
    "A cozy cabin in the woods during autumn with falling leaves and a small stream nearby",
    "An underwater scene with colorful coral reefs and tropical fish",
    "A fantasy castle on a floating island with waterfalls and dragons flying around",
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
        <h4 className="text-sm font-medium">Try these prompts</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs h-7 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => onSelectPrompt(suggestion)}
          >
            {suggestion.length > 30 ? suggestion.substring(0, 30) + "..." : suggestion}
          </Button>
        ))}
      </div>
    </div>
  )
}

