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
      <p className="mb-10 text-2xl w-9/10 text-justify">{project.description}</p>
      {project?.competences?.map((competence, index) => (
        <span key={index} className="text-sm text-foreground rounded-full p-1 m-3 border-slate-900 border">
          {competence}
        </span>
      ))}
      <a href={project.link} target="_blank" className="text-blue-900 underline">see the code here</a>
    </div>
  )
}
