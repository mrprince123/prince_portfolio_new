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
  ExternalLink,
  Search,
  Tag,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { Seo } from "@/components/seo";
const apiUrl = import.meta.env.VITE_ARTICLE_URL;

const Articles = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [articleData, setArticleData] = useState([]);

  const articles = [
    {
      id: 1,
      title: "The Future of React: Server Components and Concurrent Features",
      description:
        "Exploring how React Server Components and Concurrent Features are reshaping the way we build modern web applications.",
      coverImage: "www.google.com",
      publishedAt: "2023-12-20",
      articleLink: "https://medium.com/@yourname/react-server-components",
      tags: ["React", "JavaScript", "Frontend"],
      featured: true,
      readTime: "5 mins",
    },
  ];

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);

        const response = await axios.get(
          apiUrl,
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

  const allTags = [
    "all",
    ...Array.from(new Set(articleData.flatMap((article) => article.tags))),
  ];

  const filteredArticles = articleData.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag =
      selectedTag === "all" || article.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const featuredArticles = articleData.filter((article) => article.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-80 mx-auto mb-6" />
            <Skeleton className="h-6 w-96 mx-auto mb-2" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="text-center shadow-soft">
                <CardContent className="pt-6">
                  <Skeleton className="h-6 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </CardContent>
              </Card>
            ))}
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

          {/* Featured Articles Skeleton */}
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

          {/* All Articles Skeleton */}
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
        title="Articles | Prince Kumar Sahni on Medium"
        description="Discover thought-provoking articles written by Prince Kumar Sahni on Medium — covering software engineering, system design, and tech innovations."
        url="https://princesahni.com/articles"
        image="https://princesahni.com/og-images/articles-page.png"
      />

      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Articles on <span className="text-gradient">Medium</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Sharing knowledge and insights about web development, software
              architecture, and technology trends with the developer community.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center shadow-soft">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-gradient mb-2">
                  {articleData.length}
                </div>
                <p className="text-sm text-muted-foreground">
                  Articles Published
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-gradient mb-2">35K</div>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-gradient mb-2">50K</div>
                <p className="text-sm text-muted-foreground">Total Claps</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-soft">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-gradient mb-2">
                  200K
                </div>
                <p className="text-sm text-muted-foreground">Trending Now</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
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

          {/* Featured Articles */}
          {selectedTag === "all" && searchTerm === "" && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredArticles.slice(0, 2).map((article) => (
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
          )}

          {/* All Articles */}
          {filteredArticles.length > 0 ? (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                All Articles
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
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
                            href={article.articleLink}
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
          ) : (
            <Card className="shadow-soft">
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No articles found
                </h3>
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

          {/* Follow CTA */}
          <div className="mt-12">
            <Card className="shadow-soft bg-gradient-card">
              <CardContent className="py-8 text-center">
                <h3 className="text-xl font-semibold mb-4">
                  Follow me on Medium
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Stay updated with my latest articles about web development,
                  software architecture, and technology insights. Get notified
                  when new content is published.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" asChild className="group">
                    <a
                      href="https://medium.com/@yourname"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                      Follow on Medium
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="/contact">Suggest Topics</a>
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

export default Articles;
