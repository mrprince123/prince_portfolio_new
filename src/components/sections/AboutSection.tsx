import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import { personalInfo, experiences, education, interests } from "@/data/portfolioData";
import { Briefcase, GraduationCap, MapPin, Calendar, Heart } from "lucide-react";
import princesahniImage from "@/assets/princesahni.jpg";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="relative py-24 px-6 bg-transparent"
    >
      <div className="absolute inset-0 bg-radial-glow opacity-30" />
      <div className="relative container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm tracking-[0.2em] uppercase mb-3">
            // about me
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            My <span className="text-gradient">Story</span>
          </h2>
        </motion.div>

        {/* Bio + Photo */}
        <motion.div
          className="grid md:grid-cols-5 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="md:col-span-3 space-y-4">
            <GlassCard className="p-6 md:p-8">
              <p className="text-foreground/80 leading-relaxed mb-4">{personalInfo.bio}</p>
              <p className="text-foreground/80 leading-relaxed mb-4">{personalInfo.bioExtended}</p>
              <p className="text-foreground/80 leading-relaxed">{personalInfo.bioCreative}</p>
            </GlassCard>
          </div>

          <div className="md:col-span-2 flex items-center justify-center">
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/60 rounded-2xl opacity-20 group-hover:opacity-40 blur-lg transition-opacity" />
              <img
                src={princesahniImage}
                alt="Prince Kumar Sahni"
                className="relative w-full max-w-[320px] rounded-2xl object-cover border border-border"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-primary" />
            Professional Experience
          </h3>
          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <GlassCard key={i} className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{exp.title}</h4>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end gap-1">
                    <span className="text-muted-foreground font-mono text-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {exp.period}
                    </span>
                    <span className="text-muted-foreground/70 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {exp.location}
                    </span>
                  </div>
                </div>
                <p className="text-foreground/70 mb-3 text-sm">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, j) => (
                    <span
                      key={j}
                      className="px-2 py-1 text-xs font-mono rounded-md bg-primary/5 text-primary/80 border border-primary/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-primary" />
            Education
          </h3>
          {education.map((edu, i) => (
            <GlassCard key={i} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                  <p className="text-primary">{edu.institution}</p>
                </div>
                <div className="flex flex-col md:items-end gap-1">
                  <span className="text-muted-foreground font-mono text-sm">{edu.period}</span>
                  <span className="text-muted-foreground/70 text-sm">GPA: {edu.gpa}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Heart className="w-6 h-6 text-primary" />
            Interests & Hobbies
          </h3>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest, i) => (
              <motion.span
                key={i}
                className="px-4 py-2 text-sm rounded-full bg-primary/5 border border-primary/10 text-foreground/70 hover:text-primary hover:border-primary/30 transition-all cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
