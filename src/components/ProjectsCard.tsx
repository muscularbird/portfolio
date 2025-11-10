import { Card } from "./ui/card"

export default function ProjectsCard({project, ref}: {project: any, ref?: any}) {
  return (
    <Card className="m-5 p-5 w-80 hover:cursor-pointer hover:shadow-lg shadow-blue-900" onClick={() => {window.location.href = '/projects/' + project.title.toLowerCase()}} ref={ref}>
        <p className="font-semibold">{project.title}</p>
        <img src={project.images[0]} alt={project.title} width={100} height={100} className="object-contain" />
        <p className="text-justify">{project.description?.length > 100 ? `${project.description.slice(0, 100)}...` : project.description}</p>
    </Card>
  )
}
