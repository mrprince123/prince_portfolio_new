import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Heart, ArrowLeft, Share2, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
const apiUrl = import.meta.env.VITE_BLOG_URL;
import placeholder from "@/assets/placeholder.jpg";


interface Tag {
  name: string;
  icon?: string;
}

interface BlogPost {
  title: string;
  slug: string;
  readTime: number;
  description: string;
  coverImage: string;
  content: string;
  tags: Tag[];
  likes: number;
  author: string;
  isVisible: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState<BlogPost | null>(null);
  const [liked, setLiked] = useState(false);
  const { toast } = useToast();

  const mockPost: BlogPost = {
    title: "Building Scalable React Applications: Best Practices and Patterns",
    slug: slug || "",
    readTime: 8,
    description:
      "Learn how to structure large-scale React applications with proven patterns, state management strategies, and performance optimization techniques.",
    coverImage:
      placeholder,
    content: `
# Introduction

In this comprehensive guide, we'll explore the architectural decisions that make React applications maintainable and scalable. Whether you're building a small project or a large enterprise application, following these best practices will set you up for success.

## Component Architecture

One of the most important aspects of building scalable React applications is having a well-thought-out component architecture. Here are some key principles:

### 1. Single Responsibility Principle

Each component should do one thing and do it well. If a component is doing too much, consider breaking it down into smaller, more focused components.

### 2. Composition over Inheritance

React's composition model allows you to build complex UIs from simple components. Instead of creating complex inheritance hierarchies, compose smaller components together.

### 3. Container vs Presentational Components

Separate your components into two categories:
- **Container components**: Handle the logic and state management
- **Presentational components**: Focus on how things look

## State Management

As your application grows, managing state becomes increasingly important. Here are some strategies:

### Local State

For simple component-specific state, React's built-in useState hook is perfect. Don't overcomplicate things by reaching for a state management library too early.

### Context API

For sharing state across multiple components, the Context API is a great built-in solution. It's perfect for things like theme, authentication, and user preferences.

### State Management Libraries

For complex applications with lots of shared state, consider libraries like Redux, Zustand, or Recoil. Each has its own trade-offs, so choose based on your specific needs.

## Performance Optimization

Performance is crucial for user experience. Here are some optimization techniques:

### 1. Code Splitting

Use React.lazy() and Suspense to split your code into smaller chunks that can be loaded on demand.

### 2. Memoization

Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders.

### 3. Virtual Lists

For long lists, use libraries like react-window or react-virtualized to render only the visible items.

## Testing Strategy

A comprehensive testing strategy is essential for maintainability:

### Unit Tests

Test individual components and functions in isolation using Jest and React Testing Library.

### Integration Tests

Test how different parts of your application work together.

### End-to-End Tests

Use tools like Cypress or Playwright to test complete user flows.

## Conclusion

Building scalable React applications requires careful planning and adherence to best practices. By following the patterns and principles outlined in this guide, you'll be well-equipped to build applications that can grow with your needs.

Remember, the key is to start simple and add complexity only when needed. Happy coding!
        `,
    tags: [
      { name: "React", icon: "⚛️" },
      { name: "JavaScript", icon: "📜" },
      { name: "Architecture", icon: "🏗️" },
    ],
    likes: 247,
    author: "John Doe",
    isVisible: true,
    featured: true,
    createdAt: new Date("2023-12-15").toISOString(),
    updatedAt: new Date("2023-12-15").toISOString(),
  };

  // Call the same api
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);

        const response = await axios.get(
          `${apiUrl}/slug/${slug}`,
          { signal: controller.signal }
        );

        clearTimeout(timeout);

        const serverData = response.data.data;
        console.log("data ", serverData);

        if (serverData && Object.keys(serverData).length > 0) {
          setBlogData(serverData);
        } else {
          setBlogData(mockPost);
        }
      } catch (error) {
        console.warn("Error fetching blog details:", error.message);
        setBlogData(mockPost);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from favorites" : "Added to favorites",
      description: liked
        ? "Article removed from your favorites"
        : "Article added to your favorites",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Article link copied to clipboard",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button Skeleton */}
          <Skeleton className="h-10 w-32 mb-8" />

          {/* Cover Image Skeleton */}
          <Skeleton className="w-full aspect-video rounded-lg mb-8" />

          {/* Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-2/3" />
          </div>

          {/* Meta Info Skeleton */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-28" />
          </div>

          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-6 w-20" />
            ))}
          </div>

          <Separator className="mb-8" />

          {/* Content Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold mb-4">Blog post not found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Button variant="outline" className="mb-8" asChild>
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Cover Image */}
        <div className="w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-soft">
          <img
            src={blogData.coverImage}
            alt={blogData.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Header */}
        <div className="mb-8 animate-fade-in">
          {blogData.featured && (
            <Badge className="mb-4">Featured Article</Badge>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {blogData.title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            {blogData.description}
          </p>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="font-medium text-foreground">
              {blogData.author}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(blogData.createdAt)}
          </div>

          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {blogData.readTime} min read
          </div>

          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            {blogData.likes + (liked ? 1 : 0)} likes
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blogData.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag.icon && <span className="mr-1">{tag.icon}</span>}
              {tag.name}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <Button
            variant={liked ? "default" : "outline"}
            size="sm"
            onClick={handleLike}
            className="gap-2"
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            {liked ? "Liked" : "Like"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        <Separator className="mb-8" />

        {/* Article Content */}
        <Card className="shadow-soft">
          <CardContent className="prose prose-lg dark:prose-invert max-w-none pt-8">
            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: blogData.content
                  .split("\n")
                  .map((line) => {
                    if (line.startsWith("# ")) {
                      return `<h1 class="text-3xl font-bold mt-8 mb-4">${line.slice(
                        2
                      )}</h1>`;
                    } else if (line.startsWith("## ")) {
                      return `<h2 class="text-2xl font-bold mt-6 mb-3">${line.slice(
                        3
                      )}</h2>`;
                    } else if (line.startsWith("### ")) {
                      return `<h3 class="text-xl font-semibold mt-4 mb-2">${line.slice(
                        4
                      )}</h3>`;
                    } else if (line.startsWith("- ")) {
                      return `<li class="ml-6">${line.slice(2)}</li>`;
                    } else if (line.trim() === "") {
                      return "<br />";
                    } else {
                      return `<p class="mb-4">${line}</p>`;
                    }
                  })
                  .join(""),
              }}
            />
          </CardContent>
        </Card>

        {/* Author Info */}
        <Card className="mt-8 shadow-soft">
          <CardContent className="py-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                {blogData.author.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Written by {blogData.author}
                </h3>
                <p className="text-muted-foreground">
                  Software engineer passionate about web development and sharing
                  knowledge
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Want to read more?</h3>
          <p className="text-muted-foreground mb-6">
            Check out other articles on web development and technology
          </p>
          <Button asChild>
            <Link to="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
