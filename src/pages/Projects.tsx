import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { Seo } from "@/components/seo";
const apiUrl = import.meta.env.VITE_PROJECT_URL;
import placeholder from "@/assets/placeholder.jpg";

const Projects = () => {
  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const projects = [
    {
      id: 7,
      title: "AI Image Generator",
      description:
        "A web app that allows users to generate stunning AI-powered images using text prompts. Includes image history, download options, and category-based organization.",
      coverImage: placeholder,
      category: "fullstack",
      technologies: [
        "Next.js",
        "Node.js",
        "Cloudinary",
        "OpenAI API",
        "MongoDB",
      ],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 8,
      title: "Fitness Tracker App",
      description:
        "Native Android fitness tracking app with daily goals, activity insights, and progress analytics using Jetpack Compose and Room Database.",
      coverImage: placeholder,
      category: "android",
      technologies: [
        "Kotlin",
        "Jetpack Compose",
        "Room DB",
        "Firebase",
        "MVVM",
      ],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 9,
      title: "DevLink – Developer Directory",
      description:
        "A platform to explore and connect with developers worldwide. Features profile creation, project showcase, and skill-based filtering.",
      coverImage: placeholder,
      category: "web",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 10,
      title: "Code Rev – AI Code Review Platform",
      description:
        "An AI-powered platform that reviews code, detects bugs, and provides best-practice recommendations instantly.",
      coverImage: placeholder,
      category: "fullstack",
      technologies: ["React", "Node.js", "Express", "MongoDB", "OpenAI API"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 11,
      title: "Blogify – Modern Blogging Platform",
      description:
        "A sleek blogging platform with markdown editor, image uploads, and SEO optimization. Built for creators to publish and grow their audience.",
      coverImage: placeholder,
      category: "web",
      technologies: ["Next.js", "MongoDB", "JWT", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 12,
      title: "YouTune – Endless YouTube Playlist Player",
      description:
        "An Android app for uninterrupted YouTube playlist playback, allowing users to loop, shuffle, and enjoy continuous music or podcasts.",
      coverImage: placeholder,
      category: "android",
      technologies: ["Kotlin", "Jetpack Compose", "YouTube API", "Coroutines"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Full-Stack Web Apps" },
    { id: "android", label: "Android" },
    { id: "cloud", label: "Cloud" },
    { id: "script", label: "Scripts" },
  ];

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);

        const response = await axios.get(apiUrl, { signal: controller.signal });

        clearTimeout(timeout);

        const serverData = response.data?.data;

        if (serverData && serverData.length > 0) {
          setProjectData(serverData);
        } else {
          setProjectData(projects);
        }
      } catch (error) {
        console.warn("Error fetching skills:", error.message);
        setProjectData(projects);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects =
    selectedCategory === "all"
      ? projectData
      : projectData.filter((project) => project.category === selectedCategory);

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

          {/* Category Filter Skeleton */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-8 w-24" />
            ))}
          </div>

          {/* Projects Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="shadow-soft overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardHeader className="pb-3">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-1">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-8 flex-1" />
                      <Skeleton className="h-8 flex-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo
        title="Projects | Prince Kumar Sahni - Software Engineer"
        description="Explore projects built by Prince Kumar Sahni showcasing expertise in creating scalable, secure, and high-performing web and mobile applications."
        url="https://princesahni.com/projects"
        image="https://princesahni.com/og-images/princesahni-logo.png"
      />

      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              A showcase of my technical skills through real-world applications
              and solutions. Each project represents a unique challenge and
              learning experience.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center shadow-soft">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-gradient mb-2">
                  {projectData.reduce(
                    (acc, project) => acc + project.length,
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
                  {projectData.length}
                </div>
                <p className="text-sm text-muted-foreground">
                  Project Categories
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-gradient mb-2">
                  {projectData.length}
                </div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
              </CardContent>
            </Card>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="transition-all"
              >
                <Tag className="h-4 w-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="hover-lift shadow-soft overflow-hidden"
              >
                {project.coverImage ? (
                  <div className="w-full aspect-video rounded-none overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        {project.title.charAt(0)}
                      </div>
                      <p className="text-xs text-muted-foreground">Preview</p>
                    </div>
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg leading-tight">
                      {project.title}
                    </CardTitle>
                    {project.featured && (
                      <Badge variant="default" className="text-xs shrink-0">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 text-xs" asChild>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Live
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        asChild
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* GitHub CTA */}
          <div className="text-center mt-12">
            <Card className="shadow-soft max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">
                  Want to see more?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Check out my GitHub profile for more projects, contributions,
                  and code samples.
                </p>
                <Button asChild className="group">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Visit GitHub Profile
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
