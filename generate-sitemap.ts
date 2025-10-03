import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: "https://princesahni.com" });

  // Static routes
  const staticRoutes = [
    "/",
    "/about",
    "/skills",
    "/projects",
    "/contact",
    "/blog",
    "/courses",
    "/resume",
    "/articles",
  ];

  staticRoutes.forEach(route => sitemap.write({ url: route, changefreq: "weekly", priority: 0.8 }));

  // Dynamic routes: replace with real slugs or fetch from your API
  const blogSlugs = ["my-first-blog", "react-tips", "vite-typescript-guide"];
  const courseSlugs = ["react-course", "typescript-course", "fullstack-course"];

  blogSlugs.forEach(slug => sitemap.write({
    url: `/blog/${slug}`,
    changefreq: "daily",
    priority: 0.9
  }));

  courseSlugs.forEach(slug => sitemap.write({
    url: `/courses/${slug}`,
    changefreq: "weekly",
    priority: 0.9
  }));

  sitemap.end();

  const sitemapData = await streamToPromise(sitemap);
  writeFileSync("./public/sitemap.xml", sitemapData.toString());

  console.log("Sitemap generated at public/sitemap.xml");
}

generateSitemap().catch(err => console.error(err));
