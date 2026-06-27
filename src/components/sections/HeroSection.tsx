import { Suspense, useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import HeroScene from "../3d/HeroScene";
import NeonButton from "../ui/NeonButton";
import { personalInfo, stats } from "@/data/portfolioData";
import { ArrowDown } from "lucide-react";

const roles = personalInfo.taglines;

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
          if (displayText === currentRole) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentRole.substring(0, displayText.length - 1));
          if (displayText === "") {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const scrollToNext = () => {
    const nextSection = document.getElementById("about-section");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <HeroScene />
            <Preload all />
          </Canvas>
        </Suspense>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-6 max-w-4xl lg:max-w-[50%] flex flex-col items-center lg:items-start"
        >
          {/* Subtitle / Role Tag */}
          <motion.p
            className="text-primary font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Full-Stack Software Engineer
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tight text-foreground leading-[1.15]"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Building scalable apps with <br className="hidden md:block" />
            <span className="text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-[#00f0ff] dark:via-sky-400 dark:to-[#0066ff]">clean code</span> &{" "}
            <span className="text-gradient bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-400 dark:from-[#0066ff] dark:via-indigo-500 dark:to-[#00f0ff]">secure architecture</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            I craft high-performance web applications, robust backend systems, seamless third-party API integrations, and intuitive user experiences that deliver real value.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
          >
            <NeonButton href="/projects" variant="primary" size="lg" className="w-full sm:w-auto">
              View My Work
            </NeonButton>
            <NeonButton href="/contact" variant="outline" size="lg" className="w-full sm:w-auto">
              Get in Touch
            </NeonButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/60 hover:text-primary transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default HeroSection;
