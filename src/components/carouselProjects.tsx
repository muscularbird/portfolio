import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useNavigate } from "react-router"
import { projects } from '@/utils/projects'

interface ProjectsProps {
    title: string
    images: string[]
    description: string,
    link: string,
}

export default function CarouselProjects() {
    const navigate = useNavigate();
    return (
        <Carousel
            plugins={[Autoplay({ delay: 5000 })]}
            opts={{ align: "start" }}
            className="w-full"
        >
            <CarouselContent>
                {projects.map(({ title, images, description }, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5 hover:cursor-pointer" onClick={() => {navigate('/projects/' + title.toLowerCase())}}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center p-4 flex-col">
                                    <h3 className="text-lg font-semibold">{title}</h3>
                                    <img
                                        src={images[0]}
                                        alt={`Logo ${index + 1}`}
                                        width={100}
                                        height={100}
                                        className="object-contain"
                                    />
                                    <p className="mt-2 text-sm text-center text-muted-foreground">{description}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}