import { Target, Eye, Heart, Code, Database, Server, Shield, Zap, Cloud, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function About() {
  const { darkMode } = useApp();

  const values = [
    { icon: Target, title: 'Mission', desc: 'Empower job seekers and recruiters with AI-powered tools to make hiring smarter and faster.' },
    { icon: Eye, title: 'Vision', desc: 'A world where finding the perfect job or candidate is effortless and intelligent.' },
    { icon: Heart, title: 'Values', desc: 'Innovation, transparency, accessibility, and putting people first in everything we do.' },
  ];

  const techStack = [
    { icon: Code, name: 'Frontend', techs: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'] },
    { icon: Server, name: 'Backend', techs: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'] },
    { icon: Database, name: 'Database', techs: ['MongoDB', 'PostgreSQL', 'Prisma ORM', 'Mongoose'] },
    { icon: Shield, name: 'Security', techs: ['Bcrypt', 'Passport.js', 'Sessions', 'CORS'] },
    { icon: Zap, name: 'Real-time', techs: ['Socket.io', 'WebSockets', 'Live Updates'] },
    { icon: Cloud, name: 'Deploy', techs: ['Vercel', 'Render', 'AWS', 'Docker'] },
  ];

  const curriculum = [
    {
      module: 'Module 1: Node.js Foundations',
      topics: [
        'Introduction to Client Server Architecture',
        'Understanding Server and request handling',
        'Installing NodeJS and environment setup',
        'File handling module and file dependency',
        'Advantages and disadvantages vs other languages',
        'HTTP module for creating endpoints'
      ]
    },
    {
      module: 'Module 2: Express.js Framework',
      topics: [
        'Serving static files',
        'Routing: methods, paths, parameters, handlers',
        'Response methods and status codes',
        'Handling static pages with file stream',
        'Exception handling'
      ]
    },
    {
      module: 'Module 3: Middleware',
      topics: [
        'Middleware lifecycle',
        'Application-level middleware',
        'Router-level middleware',
        'Error-handling middleware',
        'Third-party middleware',
        'Blocking vs non-blocking code',
        'Body parser implementation'
      ]
    },
    {
      module: 'Module 4: Template Engines',
      topics: [
        'SSR vs CSR comparison',
        'EJS template engine',
        'Handlebars (HBS) template engine',
        'Dynamic page rendering'
      ]
    },
    {
      module: 'Module 5: Databases',
      topics: [
        'SQL vs NoSQL databases',
        'MongoDB connection and operations',
        'Mongoose ODM with Node.js',
        'PostgreSQL CRUD operations',
        'Prisma ORM deep dive'
      ]
    },
    {
      module: 'Module 6: Authentication',
      topics: [
        'Session management',
        'Cookies and Express-Sessions',
        'Bcrypt password hashing',
        'JWT token authentication',
        'Passport.js strategies'
      ]
    },
    {
      module: 'Module 7: Advanced Topics',
      topics: [
        'Socket.io for real-time communication',
        'Full duplex communication',
        'Multer for file uploads',
        'Cloudinary integration',
        'Unit testing'
      ]
    },
    {
      module: 'Module 8: Deployment',
      topics: [
        'Deployment on Vercel',
        'Deployment on Render',
        'AWS deployment',
        'Environment variables',
        'Production best practices'
      ]
    }
  ];

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About HireMinds AI
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            We're building the future of job search with AI-powered tools that help you land your dream career.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item) => (
              <div key={item.title} className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Our Tech Stack</h2>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Built with modern, scalable technologies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((stack) => (
              <div key={stack.name} className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <div className="flex items-center mb-4">
                  <stack.icon className="w-6 h-6 text-indigo-500 mr-3" />
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stack.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stack.techs.map((tech) => (
                    <span key={tech} className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-indigo-50 text-indigo-700'}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Full Stack Node.js Curriculum
            </h2>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Complete learning path from basics to deployment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curriculum.map((mod, i) => (
              <div key={i} className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {mod.module}
                </h3>
                <ul className="space-y-2">
                  {mod.topics.map((topic, j) => (
                    <li key={j} className={`flex items-start ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="text-indigo-500 mr-2">•</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-8">
            <Users className="w-12 h-12 text-indigo-500" />
          </div>
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Built by Developers, for Developers
          </h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            HireMinds AI is built by a passionate team of developers who understand the challenges of job hunting and recruiting in the tech industry.
          </p>
        </div>
      </section>
    </div>
  );
}
