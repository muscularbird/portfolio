import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Card } from "@/components/ui/card.tsx";
import { ChevronDown } from "lucide-react";
import { projects } from "@/utils/projects.ts";
import { skills } from "@/utils/skills.ts";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const title = useRef<HTMLHeadingElement | null>(null);
  const projectCards = useRef<(HTMLDivElement | null)[]>([]);
  const skillsCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  useGSAP(() => {
  // position offscreen relative to its own width to avoid padding/viewport issues
    gsap.set(title.current, { x: "-100vw", autoAlpha: 1, immediateRender: true });
    gsap.set(projectCards.current, { x: "100vw", autoAlpha: 0 });
    gsap.set(skillsCardsRef.current, { x: "-100vw", autoAlpha: 0 });

    gsap.timeline({
      scrollTrigger: {
        trigger: title.current,
        start: "top 80%",   // when the top of title reaches 80% of viewport
        end: "top 30%",
        scrub: true,
        // markers: true,
        // pin: true,
        // pinSpacing: true,
        // anticipatePin: 1,
      }
    }).to(title.current, { x: 0, autoAlpha: 1, ease: "power3.out" });

  projectCards.current.forEach((card) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 65%",
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

  skillsCardsRef.current.forEach((card) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "bottom 40%",
          scrub: true,
          markers: false,
        },
      }).to(card, {
        x: 0,
        autoAlpha: 1,
        ease: "power3.out",
      });
    });

  });

  // const downloadCV = () => {
  //   const link = document.createElement('a');
  //   link.href = '/CV_Etienne_KRETZ.pdf';
  //   // link.download = 'CV_Etienne_KRETZ.pdf';
  //   // document.body.appendChild(link);
  //   link.click();
  //   // document.body.removeChild(link);
  // };

  const scrollToContent = () => {
    const el = document.getElementById('content')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-[400vh] flex flex-col items-center w-full">
      {/* HERO */}
      <section id="hero" className="relative h-screen w-full flex items-center justify-center px-4">
        <div className="z-10 flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <Button
              onClick={() => {
                const newWindow = window.open('/CV_Etienne_KRETZ.pdf', '_blank');
                if (newWindow) newWindow.opener = null;
              }}
              className="items-center justify-center"
            >
              My CV
            </Button>
            <Button onClick={() => navigate('/contact')} className="items-center justify-center">Contact Me</Button>
          </div>
        </div>
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 align-middle justify-center text-center">
          <p>Scroll down to discover more about me</p>
          <button onClick={scrollToContent} aria-label="Scroll down" className="cursor-pointer">
            <ChevronDown className="animate-bounce text-4xl" width={40} height={40} />
          </button>
        </div>
      </section>

      {/* CONTENT BELOW HERO */}
      <section id="content" ref={containerRef} className="w-full flex flex-col px-4 items-center">
        <h1 ref={title} className="text-4xl md:text-6xl font-bold title text-center max-w-full m-40">
          Welcome to My Portfolio!
        </h1>
        <h2 className="text-2xl font-bold mt-6">Here are some of my projects:</h2>
        <div className="container mt-4 flex flex-wrap justify-center">
        {projects.map((project, index) => (
          <Card
            key={index}
            ref={el => { projectCards.current[index] = el }}
            className="m-3 md:m-5 p-5 w-full sm:w-80 hover:cursor-pointer hover:shadow-lg shadow-blue-300"
            onClick={() => {window.location.href = '/projects/' + encodeURIComponent(project.title.toLowerCase())}}
          >
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <img
              src={project.images[0]}
              alt={`Logo ${index + 1}`}
              width={100}
              height={100}
              className="object-contain max-w-full h-auto"
            />
            <p className="mt-2 text-sm text-center text-muted-foreground">{project.description}</p>
          </Card>
        ))}
      </div>
      {/* <div className="container mt-10">
        <CarouselProjects/>
      </div> */}
        <h2 className="text-2xl font-bold mt-10">Here are some of my skills:</h2>
        <div className="container mt-5 flex flex-wrap justify-center">
        {skills.map((skill, index) => (
          <Card
            key={index}
            className="m-3 md:m-10 p-5 w-full sm:w-60"
            ref={el => { skillsCardsRef.current[index] = el }}
          >
            <img src={`https://cdn.simpleicons.org/${skill?.icon || skill.name.toLowerCase()}`} alt={`${skill.name} icon`} width={100} height={100} className="object-contain max-w-full h-auto" />
            {/* <h3 className="text-lg font-semibold">{skill.name}</h3> */}
            <p className="mt-2 text-sm text-center text-muted-foreground">{skill.level}</p>
          </Card>
        ))}
      </div>
      </section>
    </div>
  )
}

export default App
