import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CarouselProjects from "../components/carouselProjects.tsx";
import { Card } from "@/components/ui/card.tsx";
import { ChevronDown } from "lucide-react";
import { projects } from "@/utils/projects.ts";
import { skills } from "@/utils/skills.ts";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const title = useRef<HTMLHeadingElement | null>(null);
  const projectCards = useRef<(HTMLDivElement | null)[]>([]);
  const skillsCardsRef = useRef<(HTMLDivElement | null)[]>([]);


  useGSAP(() => {
    gsap.set(title.current, { x: "-100vw" });
    gsap.set(projectCards.current, { x: 2000, autoAlpha: 0 });
    gsap.set(skillsCardsRef.current, { x: "-100vw", autoAlpha: 0 });

    const t1 = gsap.timeline({
      scrollTrigger: {
        start: 100,
        end: 800,
        scrub: true,
        markers: true,
        trigger: title.current,
        pin: true,
        // pinSpacing: true,
        // anticipatePin: 1,
      }
    });

    t1.to(".title", {
      x: 0,
      ease: "power3.out",
      // rotate: 1080,
    });

    projectCards.current.forEach((card, index) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 50%",
          scrub: true,
          markers: false,
        },
      }).to(card, {
        x: 0,
        autoAlpha: 1,
        ease: "power3.out",
      });
    });

    skillsCardsRef.current.forEach((card, index) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "top -100%",
          scrub: true,
          markers: false,
        },
      }).fromTo(card, {
        x: "-100vw",
        autoAlpha: 0,
      }, {
        x: "100vw",
        autoAlpha: 1,
        // ease: "power3.out",
      });
    });

  });

  return (
    <div className="min-h-[600vh] flex flex-col items-center">
      <h1 className="text-2xl mt-5">Scroll down to discover more about me</h1>
      <ChevronDown className="animate-bounce text-4xl" width={40} height={40} />
      <h1 ref={title} className="text-6xl font-bold title">
        Welcome to My Portfolio!
      </h1>
      <h2 className="text-2xl font-bold mt-250">Here are some of my projects:</h2>
      <div className="container mt-10 flex flex-wrap justify-center">
        {projects.map((project, index) => (
          <Card key={index} ref={el => { projectCards.current[index] = el }} className="m-5 p-5 w-80 hover:cursor-pointer hover:shadow-lg shadow-blue-300" onClick={() => {window.location.href = '/projects/' + project.title.toLowerCase()}}>
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <img
              src={project.images[0]}
              alt={`Logo ${index + 1}`}
              width={100}
              height={100}
              className="object-contain"
            />
            <p className="mt-2 text-sm text-center text-muted-foreground">{project.description}</p>
          </Card>
        ))}
      </div>
      {/* <div className="container mt-10">
        <CarouselProjects/>
      </div> */}
      <h2 className="text-2xl font-bold mt-10">Here are some of my skills:</h2>
      <div className="container mt-5 flex">
        {skills.map((skill, index) => (
          <Card key={index} className="m-10 p-5 w-80" ref={el => { skillsCardsRef.current[index] = el }}>
            <img src={`https://cdn.simpleicons.org/${skill?.icon || skill.name.toLowerCase()}`} alt={`${skill.name} icon`} width={100} height={100} className="object-contain" />
            {/* <h3 className="text-lg font-semibold">{skill.name}</h3> */}
            <p className="mt-2 text-sm text-center text-muted-foreground">{skill.level}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default App
