import Image from "next/image"

type WadeAvatarProps = {
  size: "small" | "medium" | "large"
}

export function WadeAvatar({ size }: WadeAvatarProps) {
  const sizeMap = {
    small: 40,
    medium: 80,
    large: 120,
  }

  const dimensions = sizeMap[size]

  return (
    <div
      className={`relative rounded-full overflow-hidden border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]`}
      style={{ width: dimensions, height: dimensions }}
    >
      <Image
        src="/placeholder.svg?height=120&width=120"
        alt="Wade Avatar"
        width={dimensions}
        height={dimensions}
        className="bg-gradient-to-br from-purple-600 to-blue-600"
      />
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">W</div>
    </div>
  )
}
