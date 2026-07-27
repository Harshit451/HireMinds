import { Link } from 'react-router-dom';
import { FileText, MessageSquare, FileEdit, DollarSign, Wand2, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AITools() {
  const { darkMode } = useApp();

  const tools = [
    {
      icon: FileText,
      name: 'Resume Checker',
      description: 'Upload your PDF resume and get an AI-powered score out of 100 with detailed feedback on each section.',
      path: '/ai/resume-checker',
      color: 'from-blue-500 to-cyan-500',
      features: ['PDF Upload', 'Score out of 100', 'ATS Compatibility', 'Section Analysis']
    },
    {
      icon: MessageSquare,
      name: 'Interview Guide',
      description: 'Get personalized interview questions and answers based on the job you\'re applying for.',
      path: '/ai/interview-guide',
      color: 'from-green-500 to-emerald-500',
      features: ['Custom Questions', 'STAR Answers', 'Technical Prep', 'Behavioral Tips']
    },
    {
      icon: FileEdit,
      name: 'Cover Letter Generator',
      description: 'Generate professional cover letters tailored to your target job and experience.',
      path: '/ai/cover-letter',
      color: 'from-purple-500 to-pink-500',
      features: ['Personalized', 'Professional Tone', 'Ready to Use', 'ATS Friendly']
    },
    {
      icon: DollarSign,
      name: 'Salary Estimator',
      description: 'Get detailed salary insights based on role, location, experience, and skills.',
      path: '/ai/salary-estimator',
      color: 'from-yellow-500 to-orange-500',
      features: ['Market Data', 'Location Factors', 'Negotiation Tips', 'Benefits Value']
    },
    {
      icon: Wand2,
      name: 'Job Description Generator',
      description: 'Create compelling, SEO-optimized job descriptions that attract top talent.',
      path: '/ai/job-description',
      color: 'from-indigo-500 to-purple-500',
      features: ['SEO Optimized', 'Inclusive Language', 'Complete Format', 'Ready to Post']
    },
    {
      icon: Sparkles,
      name: 'Resume Improver',
      description: 'Upload your resume and get specific suggestions for improvements with before/after examples.',
      path: '/ai/resume-improver',
      color: 'from-pink-500 to-rose-500',
      features: ['PDF Upload', 'Error Detection', 'Action Verbs', 'ATS Optimization']
    },
  ];

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by Google Gemini AI
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            AI Career Tools
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Supercharge your job search with intelligent AI tools designed to help you land your dream job.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className={`group p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <tool.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {tool.name}
              </h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {tool.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {tool.features.map(feature => (
                  <span key={feature} className={`px-2 py-1 rounded-md text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    {feature}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
