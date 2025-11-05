import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CarouselProjects from "../components/carouselProjects.tsx";
import { Card } from "@/components/ui/card.tsx";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const title = useRef(null);
  const projectCards = useRef([]);


  useGSAP(() => {
    gsap.set(title.current, { x: "-100vw" });

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

  }, []);

  return (
    <div className="min-h-[600vh] flex flex-col items-center">
      <h1 className="text-2xl mt-5">Scroll down to discover more about me</h1>
      <ChevronDown className="animate-bounce text-2xl" />
      <h1 ref={title} className="text-6xl font-bold title">
        Welcome to My Portfolio!
      </h1>
      <h2 className="text-2xl font-bold mt-250">Here are some of my projects:</h2>
      <div className="container mt-10">
        <CarouselProjects/>
      </div>
      <h2 className="text-2xl font-bold mt-10">Here are some of my skills:</h2>
    </div>
  )
}

export default App
