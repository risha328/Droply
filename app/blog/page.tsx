import React from "react";
import { Calendar, User, Clock, ArrowRight, Search, Tag, Mail } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  // Sample blog posts data
  const featuredPost = {
    id: 1,
    title: "The Future of Cloud Storage: Trends to Watch in 2024",
    excerpt: "Explore the emerging technologies and security practices that will shape cloud storage solutions in the coming year.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Industry Insights",
    image: "/api/placeholder/800/400"
  };

  const blogPosts = [
    {
      id: 2,
      title: "How End-to-End Encryption Protects Your Files",
      excerpt: "A deep dive into our security architecture and how we keep your data safe from unauthorized access.",
      author: "Michael Chen",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Security",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "5 Productivity Tips for Managing Large File Collections",
      excerpt: "Learn how to organize your digital assets efficiently and collaborate effectively with your team.",
      author: "Elena Rodriguez",
      date: "March 5, 2024",
      readTime: "5 min read",
      category: "Productivity",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Behind the Scenes: Building Droply's Infrastructure",
      excerpt: "An inside look at the technology stack and architecture decisions that power our platform.",
      author: "David Kim",
      date: "February 28, 2024",
      readTime: "10 min read",
      category: "Technology",
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Sustainable Cloud Computing: Our Commitment to the Environment",
      excerpt: "How we're reducing our carbon footprint and building eco-friendly data storage solutions.",
      author: "Sarah Johnson",
      date: "February 20, 2024",
      readTime: "7 min read",
      category: "Sustainability",
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "The Psychology of File Organization: Why We Hoard Digital Data",
      excerpt: "Understanding user behavior patterns to create better digital asset management tools.",
      author: "Elena Rodriguez",
      date: "February 15, 2024",
      readTime: "9 min read",
      category: "User Experience",
      image: "/api/placeholder/400/250"
    }
  ];

  const categories = [
    { name: "All Topics", count: 18 },
    { name: "Product Updates", count: 5 },
    { name: "Security", count: 4 },
    { name: "Industry Insights", count: 3 },
    { name: "Productivity", count: 3 },
    { name: "Technology", count: 2 },
    { name: "User Experience", count: 1 }
  ];

  const popularTags = ["Cloud Storage", "Security", "Productivity", "Collaboration", "API", "Mobile App", "Web Version", "Data Privacy"];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Droply Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Insights, updates, and best practices for cloud storage and file management
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Featured Post */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-12">
              <div className="h-64 md:h-80 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{featuredPost.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">CEO & Founder</p>
                    </div>
                  </div>
                  <Link 
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Posts Grid */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Latest Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <article key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{post.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <Link 
                          href={`/blog/${post.id}`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Previous
                </button>
                <button className="px-3 py-2 rounded-md bg-blue-600 text-white">1</button>
                <button className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  2
                </button>
                <button className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  3
                </button>
                <button className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Next
                </button>
              </nav>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link 
                      href="#" 
                      className="flex justify-between items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                    >
                      <span>{category.name}</span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full">
                        {category.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
              <div className="flex items-center mb-4">
                <Mail className="h-6 w-6 mr-2" />
                <h3 className="text-lg font-semibold">Stay Updated</h3>
              </div>
              <p className="text-blue-100 mb-4">
                Get the latest articles and product updates delivered straight to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-blue-200 mt-3">
                No spam. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}