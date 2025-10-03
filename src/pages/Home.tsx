import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Code,
  Users,
  Trophy,
  BookOpen,
  ExternalLink,
  Calendar,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [articleData, setArticleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState([]);

  const projects = [
    {
      id: 7,
      title: "AI Image Generator",
      description:
        "A web app that allows users to generate stunning AI-powered images using text prompts. Includes image history, download options, and category-based organization.",
      coverImage: "/api/placeholder/400/200",
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
      coverImage: "/api/placeholder/400/200",
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
      coverImage: "/api/placeholder/400/200",
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
      coverImage: "/api/placeholder/400/200",
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
      coverImage: "/api/placeholder/400/200",
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
      coverImage: "/api/placeholder/400/200",
      category: "android",
      technologies: ["Kotlin", "Jetpack Compose", "YouTube API", "Coroutines"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
  ];

  const articles = [
    {
      id: 1,
      title: "The Future of React: Server Components and Concurrent Features",
      description:
        "Exploring how React Server Components and Concurrent Features are reshaping the way we build modern web applications.",
      coverImage: "https://images.unsplash.com/photo-1557683316-973673baf926",
      publishedAt: "2023-12-20",
      articleLink: "https://medium.com/@yourname/react-server-components",
      tags: ["React", "JavaScript", "Frontend"],
      featured: true,
      readTime: "5 mins",
    },
    {
      id: 2,
      title: "Python FastAPI: Building High-Performance APIs Quickly",
      description:
        "Learn how to leverage FastAPI to create fast, modern, and scalable web APIs in Python with automatic documentation and async support.",
      coverImage:
        "https://images.unsplash.com/photo-1581092580490-6b60f7d71e07",
      publishedAt: "2024-01-15",
      articleLink: "https://medium.com/@yourname/python-fastapi-guide",
      tags: ["Python", "FastAPI", "Backend"],
      featured: true,
      readTime: "7 mins",
    },
    {
      id: 3,
      title: "Mastering TypeScript: Tips and Tricks for Scalable Applications",
      description:
        "A deep dive into TypeScript best practices, advanced types, and patterns for building maintainable and large-scale applications.",
      coverImage:
        "https://images.unsplash.com/photo-1581092580490-6b60f7d71e08",
      publishedAt: "2024-02-10",
      articleLink: "https://medium.com/@yourname/typescript-tips",
      tags: ["TypeScript", "JavaScript", "Web Development"],
      featured: false,
      readTime: "6 mins",
    },
    {
      id: 4,
      title: "Node.js Event Loop: Understanding Async JavaScript",
      description:
        "A comprehensive guide to understanding the Node.js event loop, asynchronous programming, and how to write efficient non-blocking code.",
      coverImage:
        "https://images.unsplash.com/photo-1581092580490-6b60f7d71e09",
      publishedAt: "2024-03-05",
      articleLink: "https://medium.com/@yourname/nodejs-event-loop",
      tags: ["Node.js", "JavaScript", "Backend"],
      featured: false,
      readTime: "8 mins",
    },
  ];

  const stats = [
    {
      number: "2+",
      label: "Years of Experience",
      description: "Building modern web applications",
      icon: Code,
      href: "/about",
    },
    {
      number: "10+",
      label: "Projects Completed",
      description: "Delivered across various industries",
      icon: Trophy,
      href: "/projects",
    },
    {
      number: "20+",
      label: "Technologies Mastered",
      description: "From frontend to backend expertise",
      icon: Users,
      href: "/skills",
    },
    {
      number: "15+",
      label: "Articles Published",
      description: "Sharing knowledge with the community",
      icon: BookOpen,
      href: "/articles",
    },
  ];

  // Articles
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);

        const response = await axios.get(
          "http://localhost:5001/api/v1/article/get",
          { signal: controller.signal }
        );

        clearTimeout(timeout);

        const serverData = response.data?.data;

        console.log(serverData);

        console.log(serverData);
        if (serverData && serverData.length > 0) {
          setArticleData(serverData);
        } else {
          setArticleData(articles);
        }
      } catch (error) {
        console.warn("Error fetching skills:", error.message);
        setArticleData(articles);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  // Projects
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);

        const response = await axios.get(
          "http://localhost:5001/api/v1/project/get",
          { signal: controller.signal }
        );

        clearTimeout(timeout);

        const serverData = response.data?.data;

        console.log(serverData);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <span className="text-2xl">👋</span>
                  <span className="text-sm font-medium">Hey there, I'm</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="text-gradient">Prince Kumar Sahni</span>
                  <br />
                  <span className="text-foreground">Here</span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  Full-Stack Developer • Tech Enthusiast • Audiophile
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Crafting seamless, secure, and scalable web experiences that
                  users love. From startups to scale-ups, I help build fast,
                  modern, and reliable applications.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group">
                  <Link to="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/projects">View My Work</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="relative animate-fade-in-up">
              <div className="w-full h-96 gradient-card rounded-2xl shadow-elegant flex items-center justify-center border border-border/50">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-glow">
                    P
                  </div>
                  <p className="text-muted-foreground">
                    "Driven by curiosity and crafted with care"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Showcase */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Development <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized in modern web technologies with deep expertise across
              the full development stack
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Frontend Development",
                description: "React, Javascript, TypeScript, Tailwind CSS",
                icon: Code,
                skills: ["React", "Javascript", "TypeScript", "Tailwind"],
              },
              {
                title: "Backend Development",
                description:
                  "Node.js, Python, FastAPI, Express, PostgreSQL, MongoDB",
                icon: Trophy,
                skills: [
                  "Node.js",
                  "FastAPI",
                  "Express",
                  "PostgreSQL",
                  "MongoDB",
                ],
              },
              {
                title: "DevOps & Cloud",
                description: "AWS, Docker, CI/CD, Microservices",
                icon: Users,
                skills: ["AWS", "Docker", "CI/CD", "Kubernetes"],
              },
            ].map((area, index) => {
              const Icon = area.icon;
              return (
                <Card
                  key={index}
                  className="hover-lift shadow-soft border-0 bg-card/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6 text-center">
                    <Icon className="h-10 w-10 mx-auto text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{area.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {area.description}
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {area.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Building Excellence Through Experience
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Numbers that reflect my journey in creating impactful digital
              solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="hover-lift group cursor-pointer border-0 shadow-soft"
                >
                  <CardContent className="p-6 text-center">
                    <Link to={stat.href} className="block">
                      <div className="mb-4">
                        <Icon className="h-8 w-8 mx-auto text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-3xl font-bold text-gradient mb-2">
                        {stat.number}
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {stat.label}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {stat.description}
                      </p>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Latest <span className="text-gradient">Articles</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Insights, tutorials, and thoughts on modern web development
            </p>
          </div>

          {/* Articles  */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {articleData.slice(0, 3).map((article) => (
                <Card
                  key={article.id}
                  className="hover-lift shadow-soft overflow-hidden"
                >
                  {/* Cover Image */}
                  <div className="w-full aspect-video rounded-none overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 line-clamp-2 leading-tight">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="leading-relaxed">
                          {article.description}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <Badge variant="default">Featured</Badge>
                        {article.trending && (
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-600 border-orange-200"
                          >
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(article.publishedAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.readTime}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {article.tags.slice(0, 2).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full group" asChild>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read on Medium
                          <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/articles">
                View All Articles
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work and technical capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {projectData.slice(0, 2).map((project, index) => (
              <Card
                key={index}
                className="hover-lift shadow-soft border-0 bg-card/80 backdrop-blur-sm overflow-hidden"
              >
                <div className="w-full aspect-video rounded-none overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </div>
                    {project.featured && (
                      <Badge variant="default" className="shrink-0 text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" asChild className="flex-1">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/projects">
                View All Projects
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's collaborate and turn your ideas into reality. I'm always
              excited to work on innovative projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="group">
                <Link to="/contact">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/resume">Download Resume</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
