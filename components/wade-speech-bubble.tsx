import type React from "react"

type WadeSpeechBubbleProps = {
  children: React.ReactNode
}

export function WadeSpeechBubble({ children }: WadeSpeechBubbleProps) {
  return (
    <div className="relative bg-slate-700 p-4 rounded-lg rounded-tr-none shadow-md">
      <div className="absolute top-0 right-0 w-0 h-0 border-8 border-transparent border-l-slate-700 border-b-slate-700 transform translate-x-full -translate-y-px"></div>
      {children}
    </div>
  )
}
