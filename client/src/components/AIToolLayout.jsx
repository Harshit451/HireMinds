// Layout wrapper for AI tool pages.
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

/**
 * Layout component used by AI‑tool pages.
 *
 * @param {object} props
 * @param {string} props.title – Page title.
 * @param {string} props.description – Short description.
 * @param {ReactNode} props.icon – Icon element.
 * @param {ReactNode} props.children – Page content.
 */
export default function AIToolLayout({ title, description, icon, children }) {
  const { darkMode } = useApp();

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/ai-tools"
          className={`inline-flex items-center mb-6 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to AI Tools
        </Link>

        <div className={`p-8 rounded-2xl mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mr-4">
              {icon}
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
            </div>
            <div className="ml-auto">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm">
                <Sparkles className="w-3 h-3 mr-1" />
                Gemini AI
              </span>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
