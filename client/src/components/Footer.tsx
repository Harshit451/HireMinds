import { Link } from 'react-router-dom';
import { Brain, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { darkMode } = useApp();

  return (
    <footer className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} border-t`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Hire<span className="gradient-text">Minds</span>
              </span>
            </Link>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              AI-powered job portal helping you find your dream job and build your career.
            </p>
            <div className="flex space-x-3">
              <a href="#" className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'}`}>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Links</h3>
            <ul className="space-y-3">
              {['Find Jobs', 'Post a Job', 'AI Tools', 'About Us', 'Contact'].map(link => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase().replace(/\s+/g, '-')}`} className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Tools</h3>
            <ul className="space-y-3">
              {[
                { name: 'Resume Checker', path: '/ai/resume-checker' },
                { name: 'Interview Guide', path: '/ai/interview-guide' },
                { name: 'Cover Letter', path: '/ai/cover-letter' },
                { name: 'Salary Estimator', path: '/ai/salary-estimator' },
                { name: 'Resume Improver', path: '/ai/resume-improver' },
              ].map(tool => (
                <li key={tool.path}>
                  <Link to={tool.path} className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contact Us</h3>
            <ul className="space-y-3">
              <li className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Mail className="w-4 h-4 mr-2" />
                support@hireminds.ai
              </li>
              <li className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Phone className="w-4 h-4 mr-2" />
                +1 (555) 123-4567
              </li>
              <li className={`flex items-start text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                123 Tech Street, San Francisco, CA 94105
              </li>
            </ul>
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} flex flex-col md:flex-row justify-between items-center`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2024 HireMinds AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Privacy Policy</a>
            <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
