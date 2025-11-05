import { projects } from "@/utils/projects"
import { Card } from "@/components/ui/card"

export default function Projects() {
    return (
        <div className="min-h-screen flex flex-col items-center p-4">
            <h1 className="text-4xl font-bold mb-4">My projects</h1>
            {
                projects.length === 0 ? (<p>No projects available.</p>
                ) : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                    <Card key={index} className="m-5 p-5 w-80 hover:cursor-pointer hover:shadow-lg shadow-blue-900" onClick={() => {window.location.href = '/projects/' + project.title.toLowerCase()}}>
                        <p className="font-semibold">{project.title}</p>
                        <img src={project.images[0]} alt={project.title} width={100} height={100} className="object-contain" />
                        <p>{project.description?.length > 100 ? `${project.description.slice(0, 100)}...` : project.description}</p>
                    </Card>
                ))}
            </div>
            }
        </div>
    )
}