type NeonGlowProps = {
  color: "purple" | "blue"
  className?: string
}

export function NeonGlow({ color, className = "" }: NeonGlowProps) {
  const colorClass = color === "purple" ? "bg-purple-500/20" : "bg-blue-500/20"

  const shadowColor =
    color === "purple" ? "shadow-[0_0_100px_40px_rgba(168,85,247,0.4)]" : "shadow-[0_0_100px_40px_rgba(59,130,246,0.4)]"

  return <div className={`h-1 w-1 rounded-full ${colorClass} ${shadowColor} ${className}`}></div>
}
