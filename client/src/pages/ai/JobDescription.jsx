import { useState } from 'react';
import { Wand2, Copy, Check } from 'lucide-react';
import AIToolLayout from '../../components/AIToolLayout';
import { useApp } from '../../context/AppContext';
import { generateJobDescription } from '../../services/ai';

export default function JobDescription() {
  const { darkMode } = useApp();
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [type, setType] = useState('Full-time');
  const [requirements, setRequirements] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!title.trim() || !company.trim()) {
      setError('Please enter job title and company name');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const description = await generateJobDescription(title, company, type, requirements, responsibilities);
      setResult(description);
    } catch (err) {
      setError(err.message || 'Generation failed');
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AIToolLayout
      title="Job Description Generator"
      description="Create compelling, SEO-optimized job descriptions"
      icon={<Wand2 className="w-7 h-7 text-white" />}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Job Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-indigo-500`}
              placeholder="e.g. Senior Developer"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Company *
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-indigo-500`}
              placeholder="Your Company"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Job Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Key Requirements (optional)
          </label>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            rows={3}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-indigo-500`}
            placeholder="List key requirements (e.g., 5+ years experience, React, Node.js...)"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Key Responsibilities (optional)
          </label>
          <textarea
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            rows={3}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-indigo-500`}
            placeholder="List key responsibilities (e.g., lead development team, design architecture...)"
          />
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading || !title.trim() || !company.trim()}
          className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Job Description'}
        </button>

        {result && (
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} animate-fade-in`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Generated Job Description
              </h3>
              <button
                onClick={handleCopy}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className={`whitespace-pre-wrap ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {result}
            </div>
          </div>
        )}
      </div>
    </AIToolLayout>
  );
}
