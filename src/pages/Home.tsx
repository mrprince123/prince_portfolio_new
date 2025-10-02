import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Users, Trophy, BookOpen, ExternalLink, Calendar, MapPin, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const stats = [
    {
      number: "2+",
      label: "Years of Experience",
      description: "Building modern web applications",
      icon: Code,
      href: "/about"
    },
    {
      number: "10+",
      label: "Projects Completed",
      description: "Delivered across various industries",
      icon: Trophy,
      href: "/projects"
    },
    {
      number: "20+",
      label: "Technologies Mastered",
      description: "From frontend to backend expertise",
      icon: Users,
      href: "/skills"
    },
    {
      number: "15+",
      label: "Articles Published",
      description: "Sharing knowledge with the community",
      icon: BookOpen,
      href: "/articles"
    }
  ];

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
                  Crafting seamless, secure, and scalable web experiences that users love. 
                  From startups to scale-ups, I help build fast, modern, and reliable applications.
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
            <h2 className="text-3xl font-bold mb-4">Development <span className="text-gradient">Expertise</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized in modern web technologies with deep expertise across the full development stack
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Frontend Development",
                description: "React, Javascript, TypeScript, Tailwind CSS",
                icon: Code,
                skills: ["React", "Javascript", "TypeScript", "Tailwind"]
              },
              {
                title: "Backend Development", 
                description: "Node.js, Python, FastAPI, Express, PostgreSQL, MongoDB",
                icon: Trophy,
                skills: ["Node.js", "FastAPI", "Express", "PostgreSQL", "MongoDB"]
              },
              {
                title: "DevOps & Cloud",
                description: "AWS, Docker, CI/CD, Microservices",
                icon: Users,
                skills: ["AWS", "Docker", "CI/CD", "Kubernetes"]
              }
            ].map((area, index) => {
              const Icon = area.icon;
              return (
                <Card key={index} className="hover-lift shadow-soft border-0 bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <Icon className="h-10 w-10 mx-auto text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{area.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{area.description}</p>
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
            <h2 className="text-3xl font-bold mb-4">Building Excellence Through Experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Numbers that reflect my journey in creating impactful digital solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover-lift group cursor-pointer border-0 shadow-soft">
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
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest <span className="text-gradient">Articles</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Insights, tutorials, and thoughts on modern web development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Building Scalable React Applications",
                excerpt: "Best practices for structuring large React applications with TypeScript and modern tooling.",
                date: "2024-01-15",
                readTime: "5 min read",
                category: "React"
              },
              {
                title: "Advanced TypeScript Patterns",
                excerpt: "Exploring utility types, conditional types, and advanced patterns for better type safety.",
                date: "2024-01-10", 
                readTime: "8 min read",
                category: "TypeScript"
              },
              {
                title: "Modern CSS Techniques",
                excerpt: "Container queries, CSS Grid, and modern layout techniques for responsive design.",
                date: "2024-01-05",
                readTime: "6 min read", 
                category: "CSS"
              },
              {
                title: "API Design Best Practices",
                excerpt: "Designing RESTful APIs that are maintainable, scalable, and developer-friendly.",
                date: "2024-01-01",
                readTime: "7 min read",
                category: "Backend"
              }
            ].map((article, index) => (
              <Card key={index} className="hover-lift shadow-soft border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">{article.category}</Badge>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/articles">
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            <h2 className="text-3xl font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work and technical capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {[
              {
                title: "E-Commerce Platform",
                description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration.",
                image: "project-1",
                technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
                liveUrl: "#",
                githubUrl: "#",
                featured: true
              },
              {
                title: "Task Management App",
                description: "Real-time collaborative task management with Socket.io and MongoDB.",
                image: "project-2", 
                technologies: ["Next.js", "Socket.io", "MongoDB", "Tailwind"],
                liveUrl: "#",
                githubUrl: "#",
                featured: true
              },
              {
                title: "Weather Analytics Dashboard",
                description: "Data visualization dashboard with real-time weather analytics and forecasting.",
                image: "project-3",
                technologies: ["React", "D3.js", "Express", "Redis"],
                liveUrl: "#",
                githubUrl: "#",
                featured: false
              },
              {
                title: "Social Media Platform",
                description: "Modern social platform with real-time messaging and content sharing.",
                image: "project-4",
                technologies: ["Vue.js", "Firebase", "Tailwind", "PWA"],
                liveUrl: "#",
                githubUrl: "#",
                featured: false
              }
            ].map((project, index) => (
              <Card key={index} className="hover-lift shadow-soft border-0 bg-card/80 backdrop-blur-sm overflow-hidden">
                <div className="aspect-video bg-gradient-primary flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <Code className="h-12 w-12 mx-auto mb-2 opacity-80" />
                    <p className="text-sm font-medium">Project Preview</p>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
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
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          Live Demo
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
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
              Let's collaborate and turn your ideas into reality. I'm always excited to work on innovative projects.
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