"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { BookType } from "@/components/book-type-selector"
import { Sparkles } from "lucide-react"

type NicheOption = {
  name: string
  description: string
  trending: boolean
}

// Mock data for niche suggestions based on book type
const nicheOptions: Record<BookType, NicheOption[]> = {
  "Coloring Book": [
    { name: "Dinosaurs", description: "Popular with kids ages 4-10", trending: true },
    { name: "Mandala", description: "Trending for adult coloring books", trending: true },
    { name: "Fantasy Creatures", description: "Dragons, unicorns, and mythical beings", trending: false },
  ],
  Journal: [
    { name: "Mindfulness", description: "Growing market for mental health", trending: true },
    { name: "Gratitude", description: "Consistent seller year-round", trending: true },
    { name: "Travel", description: "Popular for gift-giving", trending: false },
  ],
  "Puzzle Book": [
    { name: "Word Search", description: "Evergreen niche with steady sales", trending: false },
    { name: "Sudoku", description: "Popular with older demographics", trending: true },
    { name: "Brain Teasers", description: "Growing interest in mental fitness", trending: true },
  ],
  Storybook: [
    { name: "Bedtime Stories", description: "Consistent seller for young children", trending: true },
    { name: "Adventure", description: "Popular with elementary school kids", trending: false },
    { name: "Educational", description: "Growing demand from parents", trending: true },
  ],
  "Activity Book": [
    { name: "Preschool Learning", description: "Strong market for ages 3-5", trending: true },
    { name: "Road Trip Activities", description: "Seasonal seller for summer", trending: false },
    { name: "STEM Activities", description: "Growing educational niche", trending: true },
  ],
}

type NicheSelectorProps = {
  bookType: BookType
  selectedNiche: string
  onSelect: (niche: string) => void
  onContinue: () => void
  onBack: () => void
}

export function NicheSelector({ bookType, selectedNiche, onSelect, onContinue, onBack }: NicheSelectorProps) {
  const [customNiche, setCustomNiche] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(true)

  const handleCustomNicheSelect = () => {
    if (customNiche.trim()) {
      onSelect(customNiche)
      setShowSuggestions(false)
    }
  }

  const handleSurpriseMe = () => {
    const options = nicheOptions[bookType]
    const randomIndex = Math.floor(Math.random() * options.length)
    onSelect(options[randomIndex].name)
  }

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Enter a niche for your {bookType}</label>
        <div className="flex gap-2">
          <Input
            placeholder="e.g., Dinosaurs, Mindfulness, Fantasy"
            value={customNiche}
            onChange={(e) => setCustomNiche(e.target.value)}
            className="bg-slate-700 border-gray-600 text-white"
          />
          <Button
            variant="outline"
            className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            onClick={handleSurpriseMe}
          >
            <Sparkles size={16} className="mr-2" />
            Surprise Me
          </Button>
        </div>
        <Button
          className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          onClick={handleCustomNicheSelect}
          disabled={!customNiche.trim()}
        >
          Use This Niche
        </Button>
      </div>

      {showSuggestions && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Trending Niches for {bookType}</h3>
          <div className="grid grid-cols-1 gap-3">
            {nicheOptions[bookType].map((option) => (
              <NicheCard
                key={option.name}
                niche={option}
                selected={selectedNiche === option.name}
                onSelect={() => onSelect(option.name)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          disabled={!selectedNiche}
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

function NicheCard({ niche, selected, onSelect }: { niche: NicheOption; selected: boolean; onSelect: () => void }) {
  return (
    <div
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
        selected
          ? "border-purple-500 bg-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
          : "border-gray-700 bg-slate-700/50 hover:border-gray-500"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-medium ${selected ? "text-purple-300" : "text-white"}`}>{niche.name}</h3>
          <p className="text-sm text-gray-400">{niche.description}</p>
        </div>
        {niche.trending && <div className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">Trending</div>}
      </div>
    </div>
  )
}
