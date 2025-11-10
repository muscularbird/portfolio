import { projects } from "@/utils/projects"
import ProjectsCard from "@/components/ProjectsCard"
import { Select } from "@/components/ui/select"

export default function Projects() {
    return (
        <div className="min-h-screen flex flex-col items-center p-4">
            <h1 className="text-4xl font-bold mb-4">My projects</h1>
            {projects.length === 0 ? (<p>No projects available.</p>) :
                <div>
                    <Select>    </Select>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project, index) => (
                            <ProjectsCard key={index} project={project} />
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}