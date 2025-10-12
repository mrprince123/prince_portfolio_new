import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { Seo } from "@/components/seo";
import { CometCard } from "@/components/ui/commet-card";
import princesahni from "@/assets/princesahni.jpg";

const About = () => {
  const experiences = [
    {
      title: "Associate Software Developer",
      company: "Chetu Inc.",
      period: "2024 - Present",
      location: "Noida, India",
      description:
        "Leading development of scalable web applications using React, Node.js, and cloud technologies.",
    },
    {
      title: "Full-Stack Developer",
      company: "Webbocket",
      period: "2023 - 2024",
      location: "Bhubnaswer, Odisha",
      description:
        "Built and maintained multiple web applications, collaborated with cross-functional teams.",
    },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Biju Patnaik University of Technology",
      period: "2020 - 2024",
      gpa: "8.34/10.0",
    },
  ];

  const interests = [
    "Open Source Contributing",
    "Technical Writing",
    "AI/ML Research",
    "Mobile App Developer",
    "Medium Article",
    "Local Guide at Google Map",
    "Photography",
    "Audiophile",
    "Cricket",
    "Hiking",
    "Chess",
  ];

  return (
    <>
      <Seo
        title="About | Prince Kumar Sahni - Software Engineer"
        description="Learn more about Prince Kumar Sahni, a passionate Software Engineer dedicated to building scalable, secure, and high-performing applications."
        url="https://princesahni.com/about"
        image="https://princesahni.com/og-images/about-page.png"
      />

      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Passionate about creating digital experiences that make a
              difference. Here's my journey in the world of technology and
              beyond.
            </p>
          </div>

          {/* Bio Section */}
          <Card className="mb-8 shadow-soft animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  P
                </div>
                My Story
              </CardTitle>
            </CardHeader>

            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              {/* Top Section: Text + Image */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Left Side - Text */}
                <div className="flex-1 flex flex-col gap-4">
                  <p className="text-muted-foreground leading-relaxed text-justify">
                    Hi! I'm <strong>Prince Kumar Sahni</strong>, a passionate{" "}
                    <strong>Software Engineer</strong> who loves building
                    impactful digital products. Over the past few years, I’ve
                    worked on everything from
                    <strong> Android apps</strong> to{" "}
                    <strong>full-stack web platforms</strong>, always focusing
                    on performance, scalability, and user experience.
                  </p>

                  <p className="text-muted-foreground leading-relaxed text-justify">
                    I take pride in approaching every project with a
                    problem-solving mindset. Whether it’s optimizing
                    performance, designing scalable architectures, or debugging
                    complex issues, I enjoy breaking down challenges into clear,
                    actionable steps. My focus is always on writing clean,
                    efficient, and maintainable code that drives real results
                    and makes development a craft, not just a task.
                  </p>

                  <p className="text-muted-foreground leading-relaxed text-justify">
                    My journey began in college when I built my first app — and
                    since then, I’ve been. <strong>passionate</strong> about
                    creating impactful software. I focus on building reliable,
                    high-quality products that solve real problems — no matter
                    what <strong>technology</strong> it takes. For me, it’s not
                    just about code; it’s about delivering software that works,
                    scales, and makes a difference.
                  </p>
                </div>

                {/* Right Side - Image */}
                <div className="flex-shrink-0">
                  {/* <img
                    className="rounded-lg w-64 h-84 object-cover shadow-md"
                    src={princesahni}
                    alt="Prince Kumar Sahni Picture"
                  /> */}

                  <CometCard>
                    <button
                      type="button"
                      className="flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 md:p-4"
                      aria-label="View invite F7RA"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "none",
                        opacity: 1,
                      }}
                    >
                      <div className="mx-2 flex-1">
                        <div className="relative mt-2 aspect-[3/4] w-full">
                          <img
                            loading="lazy"
                            className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover "
                            alt="Prince Kumar Sahni Image"
                            src={princesahni}
                            style={{
                              boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                              opacity: 1,
                            }}
                          />
                        </div>
                      </div>
                      <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
                        <div className="text-xs">Prince Kumar Sahni</div>
                        <div className="text-xs text-gray-300 opacity-50">
                          #Sniper XP
                        </div>
                      </div>
                    </button>
                  </CometCard>
                </div>
              </div>

              {/* Bottom Section - Full Width Paragraph */}
              <div className="mt-6">
                <p className="text-muted-foreground leading-relaxed text-justify">
                  Beyond coding, I love sharing knowledge and creativity in
                  different forms. I write tech articles on{" "}
                  <strong>Medium</strong>, create videos on my
                  <strong> YouTube channel</strong>, and explore the world
                  through my lens as a passionate <strong>photographer</strong>.
                  I’m also an
                  <strong> audiophile</strong> who appreciates good sound and
                  contribute as a<strong> Local Guide</strong> on Google Maps,
                  where my photos and reviews have crossed over{" "}
                  <strong>600K+ views</strong>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="hover-lift shadow-soft">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">{exp.title}</CardTitle>
                        <CardDescription className="text-primary font-medium">
                          {exp.company}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col md:items-end gap-1">
                        <Badge variant="outline" className="w-fit">
                          <Calendar className="h-3 w-3 mr-1" />
                          {exp.period}
                        </Badge>
                        <Badge variant="secondary" className="w-fit">
                          <MapPin className="h-3 w-3 mr-1" />
                          {exp.location}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <Card key={index} className="hover-lift shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-primary">{edu.institution}</p>
                      </div>
                      <div className="flex flex-col md:items-end gap-1">
                        <Badge variant="outline">
                          <Calendar className="h-3 w-3 mr-1" />
                          {edu.period}
                        </Badge>
                        <Badge variant="secondary">GPA: {edu.gpa}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Interests Section */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Interests & Hobbies</CardTitle>
              <CardDescription>
                What I do when I'm not building amazing software
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default About;
