import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  ExternalLink,
  Calendar,
  Building,
  Award,
} from "lucide-react";

const Resume = () => {
  const personalInfo = {
    name: "Your Full Name",
    title: "Senior Full-Stack Developer",
    email: "hello@yourname.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "yourname.com",
    linkedin: "linkedin.com/in/yourname",
    github: "github.com/yourname",
  };

  const experience = [
    {
      title: "Senior Full-Stack Developer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      period: "Jan 2022 - Present",
      description:
        "Leading development of scalable web applications serving 100k+ users. Architected microservices infrastructure and mentored junior developers.",
      achievements: [
        "Improved application performance by 40% through code optimization and caching strategies",
        "Led migration from monolithic to microservices architecture",
        "Mentored 5 junior developers and established code review processes",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
      ],
      technologies: [
        "React",
        "Node.js",
        "TypeScript",
        "AWS",
        "Docker",
        "PostgreSQL",
      ],
    },
    {
      title: "Full-Stack Developer",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      period: "Jun 2020 - Dec 2021",
      description:
        "Built and maintained multiple web applications for early-stage startup. Collaborated closely with product team to deliver features rapidly.",
      achievements: [
        "Developed MVP that secured $2M Series A funding",
        "Built real-time chat system handling 10k+ concurrent users",
        "Reduced page load times by 50% through performance optimization",
        "Implemented automated testing increasing code coverage to 90%",
      ],
      technologies: [
        "Vue.js",
        "Express.js",
        "MongoDB",
        "Socket.io",
        "Redis",
        "Heroku",
      ],
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency Co.",
      location: "New York, NY",
      period: "Mar 2019 - May 2020",
      description:
        "Developed responsive user interfaces for various client projects. Worked closely with designers to implement pixel-perfect designs.",
      achievements: [
        "Delivered 15+ client projects on time and within budget",
        "Improved client satisfaction scores by 25%",
        "Created reusable component library used across projects",
        "Trained team on modern JavaScript frameworks and best practices",
      ],
      technologies: [
        "React",
        "JavaScript",
        "Sass",
        "Webpack",
        "Figma",
        "Adobe XD",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      location: "California, USA",
      period: "2015 - 2019",
      gpa: "3.8/4.0",
      honors: "Magna Cum Laude",
      relevant: [
        "Data Structures & Algorithms",
        "Software Engineering",
        "Database Systems",
        "Web Development",
      ],
    },
  ];

  const skills = {
    Frontend: [
      "React",
      "Vue.js",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Tailwind CSS",
      "Next.js",
    ],
    Backend: [
      "Node.js",
      "Express.js",
      "Python",
      "REST APIs",
      "GraphQL",
      "Microservices",
    ],
    Database: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "MySQL"],
    "DevOps & Tools": ["Docker", "AWS", "CI/CD", "Git", "Linux", "Nginx"],
    Testing: [
      "Jest",
      "Cypress",
      "Testing Library",
      "Unit Testing",
      "E2E Testing",
    ],
  };

  const projects = [
    {
      name: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with payment processing and admin dashboard",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      impact: "Increased client revenue by 35%",
    },
    {
      name: "Task Management App",
      description: "Real-time collaborative task management with team features",
      technologies: ["Next.js", "Prisma", "Socket.io"],
      impact: "10k+ active users",
    },
    {
      name: "Weather Analytics API",
      description: "RESTful API service with caching and rate limiting",
      technologies: ["Express.js", "Redis", "MongoDB"],
      impact: "Handles 1M+ requests daily",
    },
  ];

  const certifications = [
    {
      name: "AWS Certified Developer Associate",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-CDA-2023-001",
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2022",
      credentialId: "GCP-PD-2022-001",
    },
    {
      name: "Meta Frontend Developer Certificate",
      issuer: "Meta",
      date: "2021",
      credentialId: "META-FE-2021-001",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto max-w-5xl">
        {/* Header & Download */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                My <span className="text-gradient">Resume</span>
              </h1>
              <p className="text-muted-foreground mt-2">
                Professional experience and qualifications
              </p>
            </div>
            <Button size="lg" className="group" asChild>
              <a
                href="https://drive.google.com/file/d/1PhoLHI29R9_bo1wT9h42XBmftDb6wT1Y/view?usp=drive_link"
                download
              >
                <Download className="h-4 w-4 mr-2 group-hover:translate-y-1 transition-transform" />
                Download PDF
              </a>
            </Button>
          </div>
        </div>

        {/* PDF Viewer */}
        <Card className="shadow-soft mb-8 animate-fade-in-up">
          <CardContent className="p-0">
            <div className="w-full h-[800px] rounded-lg overflow-hidden bg-muted/20">
              <iframe
                src="https://drive.google.com/file/d/1PhoLHI29R9_bo1wT9h42XBmftDb6wT1Y/preview"
                className="w-full h-full border-0"
                title="Resume PDF"
                style={{ minHeight: "800px" }}
              >
                <p className="p-8 text-center text-muted-foreground">
                  Your browser does not support PDFs.
                  <a
                    href="https://drive.google.com/file/d/1PhoLHI29R9_bo1wT9h42XBmftDb6wT1Y/view?usp=drive_link"
                    className="text-primary hover:underline ml-1"
                  >
                    Download the PDF
                  </a>
                  to view it.
                </p>
              </iframe>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="shadow-soft mb-8 animate-fade-in-up">
          <CardHeader className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold mb-4">
              {personalInfo.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <CardTitle className="text-3xl">{personalInfo.name}</CardTitle>
            <CardDescription className="text-lg text-primary font-medium">
              {personalInfo.title}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="hover:text-primary transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <a
                    href={`https://${personalInfo.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {personalInfo.website}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-primary" />
                  <a
                    href={`https://${personalInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-primary" />
                  <a
                    href={`https://${personalInfo.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Experience */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Professional Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <div key={index} className="relative">
                  {index !== experience.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-full bg-border" />
                  )}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                      {job.company
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <p className="text-primary font-medium">
                            {job.company}
                          </p>
                        </div>
                        <div className="flex flex-col md:items-end gap-1">
                          <Badge variant="outline" className="w-fit">
                            <Calendar className="h-3 w-3 mr-1" />
                            {job.period}
                          </Badge>
                          <Badge variant="secondary" className="w-fit">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {job.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium text-sm">
                          Key Achievements:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {job.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            {education.map((edu, index) => (
              <div key={index} className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-lg">{edu.degree}</h3>
                    <p className="text-primary font-medium">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {edu.location}
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end gap-1">
                    <Badge variant="outline">
                      <Calendar className="h-3 w-3 mr-1" />
                      {edu.period}
                    </Badge>
                    <Badge variant="secondary">GPA: {edu.gpa}</Badge>
                    <Badge variant="default" className="text-xs">
                      {edu.honors}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">
                    Relevant Coursework:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.relevant.map((course, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle>Technical Skills</CardTitle>
            <CardDescription>
              Comprehensive overview of my technical expertise and proficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category}>
                  <h3 className="font-semibold mb-3">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Projects */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle>Notable Projects</CardTitle>
            <CardDescription>
              Selection of impactful projects demonstrating technical skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h3 className="font-semibold">{project.name}</h3>
                    <Badge variant="outline" className="w-fit">
                      {project.impact}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <div>
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end gap-1">
                    <Badge variant="outline">
                      <Calendar className="h-3 w-3 mr-1" />
                      {cert.date}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      ID: {cert.credentialId}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="shadow-soft bg-gradient-card">
          <CardContent className="py-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Interested in Working Together?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and exciting
              projects. Let's connect and explore how we can collaborate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild className="group">
                <a href="/contact">
                  <Mail className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Get in Touch
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/projects">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Projects
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resume;
