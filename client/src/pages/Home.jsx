// Restored Home.tsx (exact content from previous commit)
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";
import JobCard from "../components/JobCard";
import { useApp } from "../context/AppContext";
import { aiTools, categories, stats } from "../data";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
  };
  const { jobs } = useApp();

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Career Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Your Dream Job with
              <span className="block mt-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                AI Intelligence
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Leverage cutting-edge AI tools to optimize your resume, prepare for interviews, and land your perfect role.
            </p>
          </div>
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-md rounded-2xl">
              <div className="flex-1 flex items-center px-4 py-3 bg-white rounded-xl">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, skills, or company..."
                  className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Search Jobs
              </button>
            </div>
          </form>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <stat.icon className="w-8 h-8 text-white/80 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`py-20 ${"darkMode" ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${"darkMode" ? 'text-white' : 'text-gray-900'}`}>
              Browse by Category
            </h2>
            <p className={`mt-2 ${"darkMode" ? 'text-gray-400' : 'text-gray-600'}`}>
              Explore jobs across different industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className={`p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1 ${"darkMode" ? 'bg-gray-800 border-gray-700 hover:border-indigo-500' : 'bg-gray-50 border-gray-200 hover:border-indigo-300'}`}
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className={`font-semibold ${"darkMode" ? 'text-white' : 'text-gray-900'}`}>{cat.name}</h3>
                <p className={`text-sm ${"darkMode" ? 'text-gray-400' : 'text-gray-500'}`}>{cat.count} jobs</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className={`py-20 ${"darkMode" ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by Gemini AI
            </span>
            <h2 className={`text-3xl font-bold ${"darkMode" ? 'text-white' : 'text-gray-900'}`}>
              AI Career Tools
            </h2>
            <p className={`mt-2 ${"darkMode" ? 'text-gray-400' : 'text-gray-600'}`}>
              Supercharge your job search with intelligent AI assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className={`group p-6 rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-2 ${"darkMode" ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${"darkMode" ? 'text-white' : 'text-gray-900'}`}>
                  {tool.name}
                </h3>
                <p className={`text-sm ${"darkMode" ? 'text-gray-400' : 'text-gray-600'}`}>
                  {tool.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className={`py-20 ${"darkMode" ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className={`text-3xl font-bold ${"darkMode" ? 'text-white' : 'text-gray-900'}`}>
                Featured Jobs
              </h2>
              <p className={`mt-2 ${"darkMode" ? 'text-gray-400' : 'text-gray-600'}`}>
                Latest opportunities from top companies
              </p>
            </div>
            <Link
              to="/jobs"
              className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              View All Jobs
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.slice(0, 6).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Join thousands of professionals who have found their dream jobs with HireMinds AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Create Free Account
            </Link>
            <Link
              to="/ai-tools"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              Try AI Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
