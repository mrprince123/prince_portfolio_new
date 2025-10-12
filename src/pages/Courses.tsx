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
  Clock,
  Users,
  Star,
  Award,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Seo } from "@/components/seo";
const apiUrl = import.meta.env.VITE_COURSE_URL;
import placeholder from "@/assets/placeholder.jpg";


const Courses = () => {
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState([]);

  const courses = [
    {
      id: 1,
      slug: "react-complete-guide",
      title: "React.js Complete Guide",
      description:
        "Learn React from scratch and master modern frontend development with hooks, context API, and more.",
      coverImage: placeholder,
      isVisible: true,
      tags: ["React", "JavaScript", "Frontend"],
      level: "Beginner to Advanced",
      featured: true,
      createdAt: "2025-10-01",
      updatedAt: "2025-10-01",
    },
    {
      id: 2,
      slug: "nodejs-masterclass",
      title: "Node.js Masterclass",
      description:
        "Build scalable backend APIs using Node.js, Express.js, and MongoDB with real-world projects.",
      coverImage: placeholder,
      isVisible: true,
      tags: ["Node.js", "Express", "Backend"],
      level: "Intermediate to Advanced",
      featured: true,
      createdAt: "2025-10-01",
      updatedAt: "2025-10-01",
    },
    {
      id: 3,
      slug: "javascript-fundamentals",
      title: "JavaScript Fundamentals",
      description:
        "Understand the core concepts of JavaScript — variables, functions, DOM, and ES6 features.",
      coverImage: placeholder,
      isVisible: true,
      tags: ["JavaScript", "ES6", "Frontend"],
      level: "Beginner",
      featured: false,
      createdAt: "2025-10-01",
      updatedAt: "2025-10-01",
    },
    {
      id: 4,
      slug: "fullstack-mern-bootcamp",
      title: "Full Stack MERN Bootcamp",
      description:
        "Master MongoDB, Express, React, and Node.js by building a production-ready full stack application.",
      coverImage: placeholder,
      isVisible: true,
      tags: ["MERN", "React", "Node.js", "MongoDB"],
      level: "Intermediate to Advanced",
      featured: false,
      createdAt: "2025-10-01",
      updatedAt: "2025-10-01",
    },
    {
      id: 5,
      slug: "python-for-beginners",
      title: "Python for Beginners",
      description:
        "Start your programming journey by learning Python fundamentals, syntax, and basic projects.",
      coverImage: placeholder,
      isVisible: true,
      tags: ["Python", "Programming", "Beginner"],
      level: "Beginner",
      featured: false,
      createdAt: "2025-10-01",
      updatedAt: "2025-10-01",
    },
    {
      id: 6,
      slug: "typescript-crash-course",
      title: "TypeScript Crash Course",
      description:
        "Learn TypeScript and bring type safety and scalability to your JavaScript projects.",
      coverImage: placeholder,
      isVisible: true,
      tags: ["TypeScript", "JavaScript", "Frontend"],
      level: "Intermediate",
      featured: false,
      createdAt: "2025-10-01",
      updatedAt: "2025-10-01",
    },
    {
      id: 7,
      slug: "android-development-with-kotlin",
      title: "Android Development with Kotlin",
      description:
        "Build beautiful native Android apps using Kotlin, Jetpack Compose, and modern Android tools.",
      coverImage: placeholder,
      isVisible: true,
      tags: ["Kotlin", "Android", "Jetpack Compose"],
      level: "Intermediate to Advanced",
      featured: false,
      createdAt: "2025-10-01",
      updatedAt: "2025-10-01",
    },
    {
      id: 8,
      slug: "nextjs-advanced-guide",
      title: "Next.js Advanced Guide",
      description:
        "Learn advanced concepts in Next.js including SSR, ISR, API routes, and authentication.",
      coverImage: placeholder,
      isVisible: true,
      tags: ["Next.js", "React", "Fullstack"],
      level: "Advanced",
      featured: false,
      createdAt: "2025-10-01",
      updatedAt: "2025-10-01",
    },
    {
      id: 9,
      slug: "database-design-sql",
      title: "Database Design & SQL Mastery",
      description:
        "Understand relational databases, normalization, and write efficient SQL queries.",
      coverImage: placeholder,
      isVisible: true,
      tags: ["SQL", "Database", "Backend"],
      level: "Intermediate",
      featured: false,
      createdAt: "2025-10-01",
      updatedAt: "2025-10-01",
    },
    {
      id: 10,
      slug: "devops-docker-kubernetes",
      title: "DevOps with Docker & Kubernetes",
      description:
        "Learn how to containerize applications, deploy microservices, and manage infrastructure with Kubernetes.",
      coverImage: placeholder,
      isVisible: true,
      tags: ["DevOps", "Docker", "Kubernetes"],
      level: "Advanced",
      featured: true,
      createdAt: "2025-10-01",
      updatedAt: "2025-10-01",
    },
  ];

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2000);

        const response = await axios.get(apiUrl, { signal: controller.signal });

        clearTimeout(timeout);

        const serverData = response.data?.data;
        if (serverData && serverData.length > 0) {
          setCourseData(serverData);
        } else {
          setCourseData(courses);
        }
      } catch (error) {
        console.warn("Error fetching Courses:", error.message);
        setCourseData(courses);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const stats = [
    { label: "Total Students", value: "1000+", icon: Users },
    { label: "Courses Created", value: "15+", icon: BookOpen },
    { label: "Average Rating", value: "4.8", icon: Star },
    { label: "Hours of Content", value: "100+", icon: Clock },
  ];

  const featuredCourses = courseData.filter((course) => course.featured);

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "advanced":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-background via-background to-muted/30">
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

          {/* Featured Courses Skeleton */}
          <div className="mb-12">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <Card key={i} className="shadow-soft overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Courses Skeleton */}
          <div>
            <Skeleton className="h-8 w-32 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="shadow-soft">
                  <Skeleton className="aspect-video w-full" />
                  <CardHeader className="pb-3">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-9 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo
        title="Courses | Learn with Prince Kumar Sahni"
        description="Learn programming, software engineering, and modern development practices with Prince Kumar Sahni through high-quality, practical courses."
        url="https://princesahni.com/courses"
        image="https://princesahni.com/og-images/courses-page.png"
      />

      <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learn & <span className="text-gradient">Grow</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Comprehensive courses designed to help developers master modern
              web technologies and advance their careers in software
              development.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center shadow-soft">
                  <CardContent className="pt-6">
                    <Icon className="h-6 w-6 mx-auto text-primary mb-2" />
                    <div className="text-2xl font-bold text-gradient mb-1">
                      {stat.value}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Featured Courses */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Featured Courses
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredCourses.slice(0, 2).map((course) => (
                <Card
                  key={course.id}
                  className="hover-lift shadow-soft overflow-hidden"
                >
                  {/* Cover Image */}
                  <div className="w-full aspect-video rounded-none overflow-hidden">
                    <img
                      src={course.coverImage}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-2">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="leading-relaxed">
                          {course.description}
                        </CardDescription>
                      </div>
                      <Badge variant="default" className="shrink-0">
                        Featured
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {course.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-primary">
                            Free
                          </span>
                        </div>
                        <Button asChild className="group">
                          <a href={`/courses/${course.slug}`}>
                            Start Learning
                            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Courses */}
          <div>
            <h2 className="text-2xl font-bold mb-6">All Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {courseData.map((course) => (
                <Card key={course.id} className="hover-lift shadow-soft">
                  {/* <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-8 w-8 mx-auto text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">
                      {course.lessons} lessons
                    </p>
                  </div>
                </div> */}

                  {/* Cover Image */}
                  <div className="w-full aspect-video rounded-none overflow-hidden">
                    <img
                      src={course.coverImage}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-lg leading-tight">
                        {course.title}
                      </CardTitle>
                      {course.featured && (
                        <Badge variant="default" className="text-xs shrink-0">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm leading-relaxed line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {course.tags.slice(0, 2).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {course.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{course.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-primary">Free</span>
                        </div>
                        <Badge
                          className={`border text-xs ${getLevelColor(
                            course.level
                          )}`}
                        >
                          {course.level.split(" ")[0]}
                        </Badge>
                      </div>

                      <Button size="sm" className="w-full" asChild>
                        <a href={`/courses/${course.slug}`}>Start Learning</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12">
            <Card className="shadow-soft bg-gradient-card">
              <CardContent className="py-8 text-center">
                <h3 className="text-xl font-semibold mb-4">
                  Ready to Start Learning?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join thousands of developers who have already advanced their
                  careers with our comprehensive courses. Start your journey
                  today!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" asChild>
                    <a href="#featured">Browse Featured Courses</a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="/contact">Get Custom Training</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
