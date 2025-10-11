"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { BookType } from "@/components/book-type-selector"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type PromptType = "content" | "image"

// Mock data for prompt suggestions based on book type and niche
const generateMockPrompts = (bookType: BookType, niche: string, type: PromptType): string[] => {
  if (type === "content") {
    switch (bookType) {
      case "Coloring Book":
        return [
          `Create 30 detailed ${niche} coloring pages suitable for ages 8-12. Each illustration should be line art with medium complexity, no shading, and clear distinct areas to color.`,
          `Design a ${niche} coloring book with 25 pages. Include a mix of simple and complex designs, with thick outlines and no background colors.`,
          `Generate 40 ${niche}-themed coloring pages with varying difficulty levels. Include some simple designs for beginners and some intricate patterns for advanced colorists.`,
        ]
      case "Journal":
        return [
          `Create a ${niche} journal with 50 guided prompts, inspirational quotes, and adequate writing space on each page.`,
          `Design a 100-page ${niche} journal with weekly reflection prompts, habit trackers, and goal-setting sections.`,
          `Generate content for a ${niche} self-improvement journal with daily prompts, gratitude sections, and monthly review pages.`,
        ]
      default:
        return [
          `Create content for a ${bookType} focused on ${niche} with engaging activities and clear instructions.`,
          `Design a comprehensive ${niche} ${bookType} with progressive difficulty levels and varied content.`,
          `Generate creative and educational ${niche} content for a ${bookType} suitable for the target audience.`,
        ]
    }
  } else {
    // Image prompts
    switch (bookType) {
      case "Coloring Book":
        return [
          `Line art illustration of ${niche}, black and white, coloring book style, thick clear lines, no shading, white background, suitable for printing`,
          `${niche} themed coloring page, detailed line drawing, black outlines on white background, no fill, printable quality`,
          `Intricate ${niche} design for adult coloring book, black and white line art, no shading, high contrast, clean edges`,
        ]
      case "Journal":
        return [
          `Minimalist ${niche} themed journal cover design, simple elegant illustration, limited color palette`,
          `Decorative border and corner elements for ${niche} journal pages, line art style, repeatable patterns`,
          `${niche} inspired spot illustrations for journal pages, small decorative elements, simple line art style`,
        ]
      default:
        return [
          `Cover design for ${niche} ${bookType}, appealing to target audience, commercial book cover style`,
          `Interior page design template for ${niche} ${bookType}, with placeholder areas for text and activities`,
          `Character or mascot design for ${niche} ${bookType}, friendly approachable style, suitable for children`,
        ]
    }
  }
}

type PromptGeneratorProps = {
  bookType: BookType
  niche: string
  onContinue: () => void
  onBack: () => void
}

export function PromptGenerator({ bookType, niche, onContinue, onBack }: PromptGeneratorProps) {
  const [activeTab, setActiveTab] = useState<PromptType>("content")
  const [contentPrompts, setContentPrompts] = useState<string[]>(generateMockPrompts(bookType, niche, "content"))
  const [imagePrompts, setImagePrompts] = useState<string[]>(generateMockPrompts(bookType, niche, "image"))
  const [editingPrompt, setEditingPrompt] = useState<string | null>(null)
  const [editedPromptText, setEditedPromptText] = useState<string>("")
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)
  const { toast } = useToast()

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(prompt)
    toast({
      title: "Prompt copied",
      description: "The prompt has been copied to your clipboard.",
    })
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  const handleEditPrompt = (prompt: string) => {
    setEditingPrompt(prompt)
    setEditedPromptText(prompt)
  }

  const handleSaveEdit = () => {
    if (!editingPrompt) return

    const newPrompts =
      activeTab === "content"
        ? contentPrompts.map((p) => (p === editingPrompt ? editedPromptText : p))
        : imagePrompts.map((p) => (p === editingPrompt ? editedPromptText : p))

    if (activeTab === "content") {
      setContentPrompts(newPrompts)
    } else {
      setImagePrompts(newPrompts)
    }

    setEditingPrompt(null)
    toast({
      title: "Prompt updated",
      description: "Your changes have been saved.",
    })
  }

  const handleRegeneratePrompts = () => {
    if (activeTab === "content") {
      setContentPrompts(generateMockPrompts(bookType, niche, "content"))
    } else {
      setImagePrompts(generateMockPrompts(bookType, niche, "image"))
    }
    toast({
      title: "Prompts regenerated",
      description: `New ${activeTab} prompts have been generated.`,
    })
  }

  return (
    <div>
      <Tabs defaultValue="content" onValueChange={(value) => setActiveTab(value as PromptType)}>
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-700">
          <TabsTrigger
            value="content"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
          >
            Content Prompts
          </TabsTrigger>
          <TabsTrigger value="image" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
            Image Prompts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-0">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium">
              ChatGPT Prompts for {niche} {bookType}
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              onClick={handleRegeneratePrompts}
            >
              <RefreshCw size={14} className="mr-2" />
              Regenerate
            </Button>
          </div>

          <div className="space-y-4">
            {contentPrompts.map((prompt, index) => (
              <PromptCard
                key={index}
                prompt={prompt}
                type="content"
                isEditing={editingPrompt === prompt}
                isCopied={copiedPrompt === prompt}
                editedText={editingPrompt === prompt ? editedPromptText : ""}
                onCopy={() => handleCopyPrompt(prompt)}
                onEdit={() => handleEditPrompt(prompt)}
                onSave={handleSaveEdit}
                onCancel={() => setEditingPrompt(null)}
                onTextChange={setEditedPromptText}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="image" className="mt-0">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium">
              DALL·E/Midjourney Prompts for {niche} {bookType}
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              onClick={handleRegeneratePrompts}
            >
              <RefreshCw size={14} className="mr-2" />
              Regenerate
            </Button>
          </div>

          <div className="space-y-4">
            {imagePrompts.map((prompt, index) => (
              <PromptCard
                key={index}
                prompt={prompt}
                type="image"
                isEditing={editingPrompt === prompt}
                isCopied={copiedPrompt === prompt}
                editedText={editingPrompt === prompt ? editedPromptText : ""}
                onCopy={() => handleCopyPrompt(prompt)}
                onEdit={() => handleEditPrompt(prompt)}
                onSave={handleSaveEdit}
                onCancel={() => setEditingPrompt(null)}
                onTextChange={setEditedPromptText}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

type PromptCardProps = {
  prompt: string
  type: PromptType
  isEditing: boolean
  isCopied: boolean
  editedText: string
  onCopy: () => void
  onEdit: () => void
  onSave: () => void
  onCancel: () => void
  onTextChange: (text: string) => void
}

function PromptCard({
  prompt,
  type,
  isEditing,
  isCopied,
  editedText,
  onCopy,
  onEdit,
  onSave,
  onCancel,
  onTextChange,
}: PromptCardProps) {
  const colorClass = type === "content" ? "purple" : "blue"

  return (
    <Card
      className={`bg-slate-700 border-gray-600 text-white hover:border-${colorClass}-500/50 transition-all duration-300`}
    >
      <CardContent className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editedText}
              onChange={(e) => onTextChange(e.target.value)}
              className="bg-slate-600 border-gray-500 text-white min-h-[100px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={onCancel}>
                Cancel
              </Button>
              <Button size="sm" className={`bg-${colorClass}-600 hover:bg-${colorClass}-700`} onClick={onSave}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-300 whitespace-pre-wrap">{prompt}</p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className={`border-${colorClass}-500/30 text-${colorClass}-400 hover:bg-${colorClass}-500/10`}
                onClick={onEdit}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`border-${colorClass}-500/30 text-${colorClass}-400 hover:bg-${colorClass}-500/10`}
                onClick={onCopy}
              >
                {isCopied ? (
                  <>
                    <Check size={14} className="mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} className="mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
