import { Seo } from "@/components/seo";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

const Home = () => {
  return (
    <>
      <Seo
        title="Prince Kumar Sahni | Software Engineer"
        description="Passionate Software Engineer specializing in building scalable, secure, and high-performing web and mobile applications. Turning innovative ideas into impactful digital products."
        url="https://princesahni.com"
        image="https://princesahni.com/og-images/princesahni-logo.png"
      />

      <div className="bg-transparent">
        {/* Hero - Full viewport 3D scene */}
        <HeroSection />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* About Me */}
        <AboutSection />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Skills & Technologies */}
        <SkillsSection />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Projects */}
        <ProjectsSection />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Contact */}
        <ContactSection />
      </div>
    </>
  );
};

export default Home;
