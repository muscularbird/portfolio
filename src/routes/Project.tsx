import { useParams } from "react-router"
import { projects } from "@/utils/projects"

export default function Project() {
  const { projectName } = useParams<{ projectName: string }>()
  const project = projects.find((p: { title: string }) => p.title.toLowerCase() === projectName)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div>
      <h1 className="text-4xl font-bold m-5">{project.title}</h1>
        <img src={project.images[0]} alt={project.title} className="w-100 h-auto m-5 rounded-xl" />
      <p className="mb-10 text-2xl">{project.description}</p>
      {project.competences.map((competence, index) => (
        <span key={index} className="text-sm text-muted-foreground rounded-full p-1 m-3 border-slate-500 border">
          {competence}
        </span>
      ))}
      <a href={project.link} className="text-blue-500 underline">see the code here</a>
    </div>
  )
}
