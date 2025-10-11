"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { WadeAvatar } from "@/components/wade-avatar"
import { WadeSpeechBubble } from "@/components/wade-speech-bubble"
import { type BookType, BookTypeSelector } from "@/components/book-type-selector"
import { NicheSelector } from "@/components/niche-selector"
import { PromptGenerator } from "@/components/prompt-generator"
import { ResourcesTemplates } from "@/components/resources-templates"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { NeonGlow } from "@/components/neon-glow"

type Step = "type" | "niche" | "prompts" | "resources"

export default function NewProject() {
  const [step, setStep] = useState<Step>("type")
  const [bookType, setBookType] = useState<BookType | null>(null)
  const [niche, setNiche] = useState<string>("")
  const router = useRouter()
  const { toast } = useToast()

  const handleComplete = () => {
    toast({
      title: "Project created!",
      description: "Your new KDP book project has been created.",
    })
    router.push("/dashboard")
  }

  const getStepContent = () => {
    switch (step) {
      case "type":
        return (
          <BookTypeSelector
            selectedType={bookType}
            onSelect={(type) => setBookType(type)}
            onContinue={() => setStep("niche")}
          />
        )
      case "niche":
        return (
          <NicheSelector
            bookType={bookType!}
            selectedNiche={niche}
            onSelect={(selectedNiche) => setNiche(selectedNiche)}
            onContinue={() => setStep("prompts")}
            onBack={() => setStep("type")}
          />
        )
      case "prompts":
        return (
          <PromptGenerator
            bookType={bookType!}
            niche={niche}
            onContinue={() => setStep("resources")}
            onBack={() => setStep("niche")}
          />
        )
      case "resources":
        return <ResourcesTemplates bookType={bookType!} onComplete={handleComplete} onBack={() => setStep("prompts")} />
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case "type":
        return "Choose Your Book Type"
      case "niche":
        return "Select a Niche"
      case "prompts":
        return "Generate Prompts"
      case "resources":
        return "Resources & Templates"
    }
  }

  const getWadeSpeech = () => {
    switch (step) {
      case "type":
        return "Let's get started! What kind of book are you creating today?"
      case "niche":
        return bookType
          ? `${bookType}? Solid choice! Now let's find a killer niche that sells.`
          : "Let's find a niche that sells!"
      case "prompts":
        return "Here are 3 juicy prompts to get you started. Feel free to edit them!"
      case "resources":
        return "Almost there! Grab these templates and resources to make your book shine."
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{getStepTitle()}</h1>
        <div className="flex items-center space-x-2">
          <StepIndicator active={step === "type"} completed={step !== "type"} />
          <StepIndicator active={step === "niche"} completed={step === "prompts" || step === "resources"} />
          <StepIndicator active={step === "prompts"} completed={step === "resources"} />
          <StepIndicator active={step === "resources"} completed={false} />
        </div>
      </div>

      <div className="mb-8 bg-slate-800/50 rounded-xl p-6 border border-gray-800 relative overflow-hidden">
        <div className="absolute right-6 top-6 md:right-10 md:top-10">
          <WadeAvatar size="medium" />
        </div>
        <div className="max-w-[70%]">
          <WadeSpeechBubble>
            <p className="text-gray-300">{getWadeSpeech()}</p>
          </WadeSpeechBubble>
        </div>
      </div>

      <div className="relative">
        <NeonGlow
          color={step === "type" ? "purple" : step === "niche" ? "blue" : "purple"}
          className="absolute -top-10 left-1/2 transform -translate-x-1/2"
        />
        <Card className="bg-slate-800 border-gray-700 text-white">
          <CardContent className="p-6">{getStepContent()}</CardContent>
        </Card>
      </div>
    </div>
  )
}

function StepIndicator({ active, completed }: { active: boolean; completed: boolean }) {
  return (
    <div className="flex items-center">
      <div
        className={`h-3 w-3 rounded-full ${
          active ? "bg-gradient-to-r from-purple-500 to-blue-500" : completed ? "bg-green-500" : "bg-gray-600"
        }`}
      />
      {(active || completed) && (
        <div className="h-1 w-12 bg-gray-600 ml-1">
          <div
            className={`h-1 ${
              completed ? "bg-green-500 w-full" : active ? "bg-gradient-to-r from-purple-500 to-blue-500 w-1/2" : "w-0"
            }`}
          />
        </div>
      )}
    </div>
  )
}
