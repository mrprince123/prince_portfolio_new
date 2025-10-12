import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Code,
  Palette,
  Server,
  Cloud,
  Database,
  Wrench,
  CheckCircle,
  Clock,
} from "lucide-react";
import axios from "axios";
import * as LucideIcons from "lucide-react";
import { Seo } from "@/components/seo";
const apiUrl = import.meta.env.VITE_SKILL_URL;

const Skills = () => {
  const [loading, setLoading] = useState(true);
  const [skillsData, setSkillsData] = useState([]);

  const mockSkillsData = [
    {
      _id: "1",
      name: "Frontend Development",
      description:
        "Modern client-side technologies and frameworks for building interactive user interfaces",
      isVisible: true,
      skillsList: [
        { name: "React", icon: "Atom" },
        { name: "TypeScript", icon: "FileCode" },
        { name: "Next.js", icon: "Zap" },
        { name: "Tailwind CSS", icon: "Palette" },
        { name: "Vue.js", icon: "Component" },
        { name: "HTML/CSS", icon: "Layout" },
        { name: "JavaScript", icon: "Code" },
        { name: "Sass", icon: "Paintbrush" },
      ],
      createdAt: "2023-01-01",
      updatedAt: "2023-12-01",
    },
    {
      _id: "2",
      name: "Backend Development",
      description:
        "Server-side technologies and APIs for robust application architecture",
      isVisible: true,
      skillsList: [
        { name: "Node.js", icon: "Server" },
        { name: "Express.js", icon: "Layers" },
        { name: "Python", icon: "Snake" },
        { name: "REST APIs", icon: "Globe" },
        { name: "GraphQL", icon: "Network" },
        { name: "WebSockets", icon: "Wifi" },
        { name: "Microservices", icon: "Boxes" },
      ],
      createdAt: "2023-01-01",
      updatedAt: "2023-12-01",
    },
    {
      _id: "3",
      name: "Database Technologies",
      description: "Data storage, management, and optimization solutions",
      isVisible: true,
      skillsList: [
        { name: "PostgreSQL", icon: "Database" },
        { name: "MongoDB", icon: "Leaf" },
        { name: "Redis", icon: "Zap" },
        { name: "Prisma", icon: "Triangle" },
        { name: "MySQL", icon: "Cylinder" },
        { name: "SQLite", icon: "HardDrive" },
      ],
      createdAt: "2023-01-01",
      updatedAt: "2023-12-01",
    },
    {
      _id: "4",
      name: "DevOps & Cloud",
      description: "Infrastructure, deployment, and cloud platform expertise",
      isVisible: true,
      skillsList: [
        { name: "Docker", icon: "Container" },
        { name: "AWS", icon: "Cloud" },
        { name: "Vercel", icon: "Triangle" },
        { name: "GitHub Actions", icon: "GitBranch" },
        { name: "Nginx", icon: "Server" },
        { name: "Kubernetes", icon: "Boxes" },
        { name: "CI/CD", icon: "GitCommit" },
      ],
      createdAt: "2023-01-01",
      updatedAt: "2023-12-01",
    },
    {
      _id: "5",
      name: "Tools & Development",
      description:
        "Development tools, testing frameworks, and productivity software",
      isVisible: true,
      skillsList: [
        { name: "Git", icon: "GitBranch" },
        { name: "VS Code", icon: "Code2" },
        { name: "Figma", icon: "Figma" },
        { name: "Jest", icon: "TestTube" },
        { name: "Webpack", icon: "Package" },
        { name: "ESLint", icon: "CheckCircle" },
        { name: "Postman", icon: "Send" },
      ],
      createdAt: "2023-01-01",
      updatedAt: "2023-12-01",
    },
  ];

  useEffect(() => {
    const loadSkills = async () => {
      setLoading(true);

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2000);
        const response = await axios.get(apiUrl, { signal: controller.signal });

        clearTimeout(timeout);

        const serverData = response.data?.data;
        if (serverData && serverData.length > 0) {
          setSkillsData(serverData);
        } else {
          setSkillsData(mockSkillsData);
        }
      } catch (error) {
        console.warn("Error fetching skills:", error.message);
        setSkillsData(mockSkillsData);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  // Get icon component by name
  const getIconComponent = (iconName) => {
    const IconComponent = LucideIcons[iconName];
    return IconComponent || Code;
  };

  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      "Frontend Development": Palette,
      "Backend Development": Server,
      "Database Technologies": Database,
      "DevOps & Cloud": Cloud,
      "Tools & Development": Wrench,
    };
    return iconMap[categoryName] || Code;
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-6" />
            <Skeleton className="h-6 w-96 mx-auto mb-2" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="text-center shadow-soft">
                <CardContent className="pt-6">
                  <Skeleton className="h-6 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Skill Grid Skeleton */}
          <div className="space-y-12">
            {[1, 2, 3].map((section) => (
              <div key={section} className="space-y-4">
                <Skeleton className="h-20 w-full rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo
        title="Skills | Prince Kumar Sahni - Software Engineer"
        description="Explore the technical skills and expertise of Prince Kumar Sahni, a Software Engineer specializing in building scalable, secure, and high-performing web and mobile applications."
        url="https://princesahni.com/skills"
        image="https://princesahni.com/og-images/princesahni-logo.png"
      />

      <div className="min-h-screen py-12 px-4 gradient-light-bg">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-gradient">Skills</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise across various
              technologies and tools.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center shadow-soft">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-gradient mb-2">
                  {skillsData.reduce(
                    (acc, category) => acc + category.skillsList.length,
                    0
                  )}
                  +
                </div>
                <p className="text-sm text-muted-foreground">Technologies</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-gradient mb-2">2+</div>
                <p className="text-sm text-muted-foreground">
                  Years Experience
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-gradient mb-2">
                  {skillsData.length}
                </div>
                <p className="text-sm text-muted-foreground">
                  Skill Categories
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-gradient mb-2">10+</div>
                <p className="text-sm text-muted-foreground">Projects Built</p>
              </CardContent>
            </Card>
          </div>

          {/* All Skills Categories */}
          <div className="space-y-12 mb-12">
            {skillsData.map((category, categoryIndex) => {
              const CategoryIcon = getCategoryIcon(category.name);
              return (
                <div
                  key={category._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                >
                  <Card className="shadow-elegant border-2 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary shadow-soft">
                          <CategoryIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">
                            {category.name}
                          </CardTitle>
                          <CardDescription className="text-base mt-1">
                            {category.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {category.skillsList.map((skill, index) => {
                          const SkillIcon = getIconComponent(skill.icon);
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
                            >
                              <SkillIcon className="h-5 w-5 text-primary shrink-0" />
                              <span className="text-sm font-medium">
                                {skill.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Learning Journey */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Continuous Learning
              </CardTitle>
              <CardDescription>
                Currently exploring and improving my skills in these areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  "AI/ML",
                  "Web3",
                  "Rust",
                  "Go",
                  "Kubernetes",
                  "Microservices",
                  "GraphQL",
                  "Blockchain",
                ].map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Skills;
