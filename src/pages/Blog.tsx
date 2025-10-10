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
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Tag,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { Seo } from "@/components/seo";
const apiUrl = import.meta.env.VITE_BLOG_URL;

const Blog = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [blogData, setBlogData] = useState([]);

  const blogs = [
    {
      id: 1,
      title:
        "Building Scalable React Applications: Best Practices and Patterns",
      description:
        "Learn how to structure large-scale React applications with proven patterns, state management strategies, and performance optimization techniques.",
      content:
        "In this comprehensive guide, we'll explore the architectural decisions that make React applications maintainable and scalable...",
      coverImage:
        "https://www.gynprog.com.br/wp-content/uploads/2017/06/wood-blog-placeholder.jpg",
      readTime: "8 min read",
      createdAt: "2023-12-15",
      tags: ["React", "JavaScript", "Architecture"],
      featured: true,
      author: "Your Name",
    },
    {
      id: 2,
      title: "Modern CSS Techniques for Better User Experience",
      excerpt:
        "Discover the latest CSS features and techniques that can enhance user experience, from container queries to scroll-driven animations.",
      content:
        "CSS has evolved significantly over the past few years. Modern browsers now support features that were once impossible...",
      coverImage:
        "https://www.gynprog.com.br/wp-content/uploads/2017/06/wood-blog-placeholder.jpg",
      readTime: "6 min read",
      publishedAt: "2023-12-10",
      tags: ["CSS", "Frontend", "Design"],
      featured: false,
      author: "Your Name",
    },
    {
      id: 3,
      title: "TypeScript: From Beginner to Advanced Developer",
      excerpt:
        "A complete journey through TypeScript, covering basic types, advanced patterns, and real-world application development strategies.",
      content:
        "TypeScript has become the standard for modern JavaScript development. This guide will take you from the basics...",
      coverImage:
        "https://www.gynprog.com.br/wp-content/uploads/2017/06/wood-blog-placeholder.jpg",
      readTime: "12 min read",
      publishedAt: "2023-12-05",
      tags: ["TypeScript", "JavaScript", "Development"],
      featured: true,
      author: "Your Name",
    },
    {
      id: 4,
      title: "API Design Best Practices for Modern Web Development",
      excerpt:
        "Learn how to design RESTful APIs that are intuitive, performant, and maintainable. Covers authentication, versioning, and documentation.",
      content:
        "Good API design is crucial for successful web applications. In this post, we'll explore the principles...",
      coverImage:
        "https://www.gynprog.com.br/wp-content/uploads/2017/06/wood-blog-placeholder.jpg",
      readTime: "10 min read",
      publishedAt: "2023-11-28",
      tags: ["API", "Backend", "Design"],
      featured: false,
      author: "Your Name",
    },
    {
      id: 5,
      title: "Performance Optimization Techniques for Web Applications",
      excerpt:
        "Comprehensive guide to web performance optimization, covering everything from lazy loading to code splitting and caching strategies.",
      content:
        "Performance is crucial for user experience and SEO. This guide covers various techniques to make your web applications faster...",
      coverImage:
        "https://www.gynprog.com.br/wp-content/uploads/2017/06/wood-blog-placeholder.jpg",
      readTime: "15 min read",
      publishedAt: "2023-11-20",
      tags: ["Performance", "Optimization", "Web Development"],
      featured: true,
      author: "Your Name",
    },
    {
      id: 6,
      title: "Getting Started with Docker for Frontend Developers",
      excerpt:
        "Learn how to use Docker to containerize your applications, create consistent development environments, and streamline deployment.",
      content:
        "Docker has revolutionized how we develop and deploy applications. For frontend developers, it offers many benefits...",
      coverImage:
        "https://www.gynprog.com.br/wp-content/uploads/2017/06/wood-blog-placeholder.jpg",
      readTime: "7 min read",
      publishedAt: "2023-11-15",
      tags: ["Docker", "DevOps", "Development"],
      featured: false,
      author: "Your Name",
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
          setBlogData(serverData);
        } else {
          setBlogData(blogs);
        }
      } catch (error) {
        console.warn("Error fetching Blogs:", error.message);
        setBlogData(blogs);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const allTags = [
    "all",
    ...Array.from(new Set(blogData.flatMap((post) => post.tags))),
  ];

  const filteredPosts = blogData.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const featuredPosts = blogData.filter((post) => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

          {/* Search and Filter Skeleton */}
          <div className="mb-8 space-y-4">
            <Skeleton className="h-10 w-full max-w-md mx-auto" />
            <div className="flex flex-wrap gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-8 w-20" />
              ))}
            </div>
          </div>

          {/* Featured Posts Skeleton */}
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

          {/* All Posts Skeleton */}
          <div>
            <Skeleton className="h-8 w-32 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="shadow-soft">
                  <CardHeader>
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
        title="Blog | Insights & Tech Articles by Prince Kumar Sahni"
        description="Read insightful blogs and in-depth articles by Prince Kumar Sahni on software engineering, system design, programming, and technology trends."
        url="https://princesahni.com/blog"
        image="https://princesahni.com/og-images/blog-page.png"
      />

      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Thoughts, tutorials, and insights about web development,
              technology trends, and software engineering best practices.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className="capitalize"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Posts */}
          {selectedTag === "all" && searchTerm === "" && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Featured Blogs
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map((post) => (
                  <Card
                    key={post.id}
                    className="hover-lift shadow-soft overflow-hidden"
                  >
                    {/* Cover Image */}
                    <div className="w-full aspect-video rounded-none overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 line-clamp-2 leading-tight">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="leading-relaxed">
                            {post.description}
                          </CardDescription>
                        </div>
                        <Badge variant="default" className="shrink-0">
                          Featured
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.createdAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag.name}
                            </Badge>
                          ))}
                        </div>

                        <Button className="w-full group" asChild>
                          <Link to={`/blog/${post.slug}`}>
                            Read Article
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          {filteredPosts.length > 0 ? (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                All Blogs
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="hover-lift shadow-soft overflow-hidden"
                  >
                    {/* Cover Image */}
                    <div className="w-full aspect-video rounded-none overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 line-clamp-2 leading-tight">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="leading-relaxed">
                            {post.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.createdAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag.name}
                            </Badge>
                          ))}
                        </div>

                        <Button className="w-full group" asChild>
                          <Link to={`/blog/${post.slug}`}>
                            Read Article
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card className="shadow-soft">
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No blogs found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTag("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Newsletter CTA */}
          <div className="mt-12">
            <Card className="shadow-soft bg-gradient-card">
              <CardContent className="py-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Subscribe to get notified when I publish new articles about
                  web development, technology trends, and programming tutorials.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    placeholder="Enter your email address"
                    className="flex-1"
                  />
                  <Button>Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
