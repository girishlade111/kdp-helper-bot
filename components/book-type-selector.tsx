"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Palette, BookText, Puzzle, BookOpen, Dices } from "lucide-react"

export type BookType = "Coloring Book" | "Journal" | "Puzzle Book" | "Storybook" | "Activity Book"

type BookTypeOption = {
  type: BookType
  icon: React.ElementType
  description: string
}

const bookTypeOptions: BookTypeOption[] = [
  {
    type: "Coloring Book",
    icon: Palette,
    description: "Illustrations for coloring with various themes",
  },
  {
    type: "Journal",
    icon: BookText,
    description: "Guided journals with prompts and writing space",
  },
  {
    type: "Puzzle Book",
    icon: Puzzle,
    description: "Word searches, crosswords, and other puzzles",
  },
  {
    type: "Storybook",
    icon: BookOpen,
    description: "Illustrated stories for children or adults",
  },
  {
    type: "Activity Book",
    icon: Dices,
    description: "Mix of activities, games, and exercises",
  },
]

type BookTypeSelectorProps = {
  selectedType: BookType | null
  onSelect: (type: BookType) => void
  onContinue: () => void
}

export function BookTypeSelector({ selectedType, onSelect, onContinue }: BookTypeSelectorProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {bookTypeOptions.map((option) => (
          <BookTypeCard
            key={option.type}
            option={option}
            selected={selectedType === option.type}
            onSelect={() => onSelect(option.type)}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          disabled={!selectedType}
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

function BookTypeCard({
  option,
  selected,
  onSelect,
}: { option: BookTypeOption; selected: boolean; onSelect: () => void }) {
  const Icon = option.icon

  return (
    <div
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
        selected
          ? "border-purple-500 bg-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
          : "border-gray-700 bg-slate-700/50 hover:border-gray-500"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-full ${selected ? "bg-purple-500/20" : "bg-slate-600"}`}>
          <Icon size={24} className={selected ? "text-purple-400" : "text-gray-400"} />
        </div>
        <div>
          <h3 className={`font-medium mb-1 ${selected ? "text-purple-300" : "text-white"}`}>{option.type}</h3>
          <p className="text-sm text-gray-400">{option.description}</p>
        </div>
      </div>
    </div>
  )
}
