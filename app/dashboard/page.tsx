import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { PlusCircle, Book, Clock, Sparkles } from "lucide-react"
import { WadeAvatar } from "@/components/wade-avatar"
import { WadeSpeechBubble } from "@/components/wade-speech-bubble"

export default function Dashboard() {
  // Mock data for projects
  const projects = [
    {
      id: "1",
      title: "Dinosaur Coloring Book",
      type: "Coloring Book",
      niche: "Dinosaurs",
      lastUpdated: "2 days ago",
      progress: 65,
    },
    {
      id: "2",
      title: "Mindfulness Journal",
      type: "Journal",
      niche: "Self-Help",
      lastUpdated: "1 week ago",
      progress: 30,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your KDP book projects</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Link href="/projects/new" className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>New Project</span>
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="mb-12 bg-slate-800/50 rounded-xl p-6 border border-gray-800 relative overflow-hidden">
            <div className="absolute right-6 top-6 md:right-10 md:top-10">
              <WadeAvatar size="medium" />
            </div>
            <div className="max-w-[70%]">
              <WadeSpeechBubble>
                <h3 className="text-xl font-bold mb-2">Hey there, book creator!</h3>
                <p className="text-gray-300 mb-4">
                  You've got 2 projects in the works. Need help with prompts or sizing?
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                  >
                    Generate Prompts
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                    Calculate Cover Size
                  </Button>
                </div>
              </WadeSpeechBubble>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            <NewProjectCard />
          </div>

          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <Card className="bg-slate-800 border-gray-700 text-white">
            <CardContent className="p-6">
              <div className="space-y-4">
                <ActivityItem
                  icon={<Sparkles className="text-purple-400" />}
                  title="Generated 5 new prompts"
                  project="Dinosaur Coloring Book"
                  time="2 days ago"
                />
                <ActivityItem
                  icon={<Book className="text-blue-400" />}
                  title="Created new project"
                  project="Mindfulness Journal"
                  time="1 week ago"
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-16 px-4">
      <div className="mx-auto mb-6">
        <WadeAvatar size="large" />
      </div>
      <h2 className="text-2xl font-bold mb-3">No projects yet</h2>
      <p className="text-gray-400 max-w-md mx-auto mb-8">
        Create your first KDP book project and Wade will guide you through the entire process.
      </p>
      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
        <Link href="/projects/new" className="flex items-center gap-2">
          <PlusCircle size={18} />
          <span>Start Your First Project</span>
        </Link>
      </Button>
    </div>
  )
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="bg-slate-800 border-gray-700 text-white overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{project.title}</CardTitle>
        <CardDescription className="text-gray-400">
          {project.type} • {project.niche}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <Clock size={14} className="mr-1" />
          <span>Updated {project.lastUpdated}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 mr-2">
          <Link href={`/projects/${project.id}`}>Continue</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function NewProjectCard() {
  return (
    <Card className="bg-slate-800/50 border-gray-700 border-dashed text-white hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)] flex flex-col justify-center items-center p-8">
      <PlusCircle size={40} className="text-gray-500 mb-4" />
      <h3 className="text-lg font-medium mb-2">Create New Project</h3>
      <p className="text-gray-400 text-center mb-4">Start a new KDP book project</p>
      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
        <Link href="/projects/new">Get Started</Link>
      </Button>
    </Card>
  )
}

function ActivityItem({
  icon,
  title,
  project,
  time,
}: { icon: React.ReactNode; title: string; project: string; time: string }) {
  return (
    <div className="flex items-start">
      <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center mr-3">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <div className="flex items-center text-sm text-gray-400">
          <span className="mr-2">{project}</span>
          <span>•</span>
          <span className="ml-2">{time}</span>
        </div>
      </div>
    </div>
  )
}
