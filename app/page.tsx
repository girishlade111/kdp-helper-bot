import { Button } from "@/components/ui/button"
import Link from "next/link"
import { WadeAvatar } from "@/components/wade-avatar"
import { NeonGlow } from "@/components/neon-glow"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              KDP Helper Bot
            </h1>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-white hover:text-purple-300">
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </header>

        <main className="relative">
          <div className="absolute -top-20 right-20 md:right-40 lg:right-60">
            <WadeAvatar size="large" />
          </div>

          <div className="max-w-3xl mx-auto text-center pt-20 pb-32 relative">
            <NeonGlow color="purple" className="absolute -top-10 left-1/2 transform -translate-x-1/2" />

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                Hey, I'm Wade.
              </span>
              <br />
              Let's get your book on the board.
            </h1>

            <p className="text-xl md:text-2xl mb-12 text-gray-300">
              I'll help you build, prompt, and launch your KDP book — start to finish.
            </p>

            <Button className="text-lg px-8 py-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <Link href="/signup?redirect=/projects/new">Start a New Book Project</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
            <FeatureCard
              title="Create"
              description="Choose your book type and find trending niches that sell."
              icon="🚀"
            />
            <FeatureCard title="Prompt" description="Get AI-powered prompts for your content and images." icon="💡" />
            <FeatureCard title="Publish" description="Export your project with all the specs KDP requires." icon="📚" />
          </div>
        </main>

        <footer className="border-t border-gray-800 mt-20 pt-8 pb-16 text-center text-gray-400">
          <p>© {new Date().getFullYear()} KDP Helper Bot. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        {title}
      </h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}
