import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Briefcase, GraduationCap } from "lucide-react";

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
    "Photography",
    "Audiophile",
    "Cricket",
    "Hiking",
    "Chess",
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-gradient">Me</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Passionate about creating digital experiences that make a
            difference. Here's my journey in the world of technology and beyond.
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
                <p className="text-muted-foreground leading-relaxed">
                  Hi! I'm <strong>Prince Kumar Sahni</strong>, a passionate{" "}
                  <strong>Full-Stack Developer</strong> who loves building
                  impactful digital products. Over the past few years, I’ve
                  worked on everything from
                  <strong> Android apps</strong> to{" "}
                  <strong>full-stack web platforms</strong>, always focusing on
                  performance, scalability, and user experience.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  My journey began in college when I built my first app — and
                  I’ve been creating ever since. Today, I specialize in modern
                  technologies like <strong>React.js</strong>,{" "}
                  <strong>Node.js</strong>, <strong>Express.js</strong>, and{" "}
                  <strong>MongoDB</strong>. I enjoy solving complex problems,
                  turning ideas into clean, maintainable code, and learning new
                  tools that push my skills forward.
                </p>
              </div>

              {/* Right Side - Image */}
              <div className="flex-shrink-0">
                <img
                  className="rounded-lg w-64 h-64 object-cover shadow-md"
                  src="https://avatars.githubusercontent.com/u/79322933?v=4"
                  alt="Prince Kumar Sahni Picture"
                />
              </div>
            </div>

            {/* Bottom Section - Full Width Paragraph */}
            <div className="mt-6">
              <p className="text-muted-foreground leading-relaxed">
                Beyond coding, I run <strong>RoboKatha</strong> — India’s first
                AI-powered Hindi storytelling YouTube channel. I also write
                about <strong>technology, AI, and programming</strong> on my
                blog to share my experiences and insights with other developers.
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
  );
};

export default About;
