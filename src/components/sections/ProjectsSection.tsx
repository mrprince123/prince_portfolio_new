import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import NeonButton from "../ui/NeonButton";
import { mockProjects } from "@/data/portfolioData";
import { ExternalLink, Github } from "lucide-react";
import axios from "axios";
import placeholder from "@/assets/placeholder.jpg";

const apiUrl = import.meta.env.VITE_PROJECT_URL;

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState(mockProjects);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const response = await axios.get(apiUrl, { signal: controller.signal });
        clearTimeout(timeout);
        const serverData = response.data?.data;
        if (serverData && serverData.length > 0) {
          setProjects(serverData);
        }
      } catch {
        // Use default data
      }
    };
    loadProjects();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects-section"
      className="relative py-24 px-6 bg-transparent"
    >
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="relative container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm tracking-[0.2em] uppercase mb-3">
            // featured work
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A showcase of real-world applications demonstrating technical skills and problem-solving
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {projects.slice(0, 4).map((project, i) => (
            <motion.div
              key={project.id || i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <NeonButton href="/projects" variant="outline" size="lg">
            View All Projects <ExternalLink className="w-4 h-4" />
          </NeonButton>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: any;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.3}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <GlassCard className="overflow-hidden group">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.coverImage || placeholder}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          {project.featured && (
            <span className="absolute top-3 right-3 px-2 py-1 text-xs font-mono rounded bg-primary/10 text-primary border border-primary/20">
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(project.technologies || []).slice(0, 4).map((tech: string, j: number) => (
              <span
                key={j}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-primary/5 text-primary border border-primary/10"
              >
                {tech}
              </span>
            ))}
            {(project.technologies || []).length > 4 && (
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-primary/5 text-primary border border-primary/10">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <NeonButton
              href={project.liveUrl || "#"}
              variant="primary"
              size="sm"
              target="_blank"
              className="flex-1"
            >
              <ExternalLink className="w-3 h-3" /> Live
            </NeonButton>
            <NeonButton
              href={project.githubUrl || "#"}
              variant="outline"
              size="sm"
              target="_blank"
              className="flex-1"
            >
              <Github className="w-3 h-3" /> Code
            </NeonButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ProjectsSection;
