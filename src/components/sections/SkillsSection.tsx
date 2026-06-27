import { useRef, useState, useEffect, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import GlassCard from "../ui/GlassCard";
import SkillsGalaxy from "../3d/SkillsGalaxy";
import { skillCategories, learningTech } from "@/data/portfolioData";
import axios from "axios";

const apiUrl = import.meta.env.VITE_SKILL_URL;

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [skills, setSkills] = useState(skillCategories);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2000);
        const response = await axios.get(apiUrl, { signal: controller.signal });
        clearTimeout(timeout);
        const serverData = response.data?.data;
        if (serverData && serverData.length > 0) {
          const mapped = serverData.map((cat: any) => ({
            name: cat.name,
            description: cat.description,
            skills: cat.skillsList.map((s: any) => ({
              name: s.name,
              icon: s.icon,
              color: s.color || "#00f0ff",
            })),
          }));
          setSkills(mapped);
        }
      } catch {
        // Use default data
      }
    };
    loadSkills();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills-section"
      className="relative py-24 px-6 bg-transparent"
    >
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="relative container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm tracking-[0.2em] uppercase mb-3">
            // tech stack
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Interact with the 3D skills universe on the left, or explore by category on the right.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { value: `${skills.reduce((a, c) => a + c.skills.length, 0)}+`, label: "Technologies" },
            { value: "2+", label: "Years Experience" },
            { value: `${skills.length}`, label: "Categories" },
            { value: "10+", label: "Projects Built" },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-4 text-center" hover={false}>
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-muted-foreground text-xs font-mono mt-1">{stat.label}</div>
            </GlassCard>
          ))}
        </motion.div>

        {/* 3D and 2D Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive 3D Orbit Galaxy (5 cols on lg) */}
          <motion.div
            className="lg:col-span-5 relative min-h-[350px] lg:min-h-[500px] rounded-2xl overflow-hidden glass border border-border/40 flex flex-col items-center justify-center group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-semibold uppercase tracking-wider">
                Interactive 3D Galaxy
              </span>
            </div>
            <div className="absolute bottom-4 text-center z-10 pointer-events-none text-muted-foreground/50 text-[10px] font-mono">
              Drag to spin • Scroll page to move
            </div>

            <Suspense fallback={<div className="text-muted-foreground text-sm font-mono animate-pulse">Launching galaxy...</div>}>
              <Canvas
                camera={{ position: [0, 2.5, 6.5], fov: 50 }}
                className="w-full h-full"
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
              >
                <ambientLight intensity={0.15} />
                <pointLight position={[5, 5, 5]} intensity={1.5} color="hsl(var(--primary))" />
                <SkillsGalaxy
                  onHoverSkill={setHoveredSkill}
                  hoveredSkillName={hoveredSkill}
                />
              </Canvas>
            </Suspense>
          </motion.div>

          {/* Categorized Skills (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {skills.map((category, catIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + catIndex * 0.1 }}
              >
                <GlassCard className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{category.name}</h3>
                    <p className="text-muted-foreground text-xs">{category.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => {
                      const isActive = hoveredSkill === skill.name;
                      return (
                        <motion.div
                          key={skill.name}
                          className={`
                            relative px-3.5 py-2 rounded-xl text-xs cursor-pointer font-medium
                            bg-card/40 border transition-all duration-300 flex items-center gap-2
                            ${isActive ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(99,102,241,0.15)] text-primary" : "border-border text-foreground/75 hover:border-primary/30"}
                          `}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          whileHover={{ scale: 1.03, y: -1 }}
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: skill.color || "hsl(var(--primary))" }}
                          />
                          {skill.name}
                        </motion.div>
                      );
                    })}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Currently Learning */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Currently Exploring
            </h3>
            <div className="flex flex-wrap gap-3">
              {learningTech.map((tech, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1.5 text-sm rounded-full bg-primary/5 border border-primary/10 text-primary font-mono"
                  whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.3)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
