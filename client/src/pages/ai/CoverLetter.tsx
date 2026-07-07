import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileEdit, Copy, Check } from 'lucide-react';
import AIToolLayout from '../../components/AIToolLayout';
import { useApp } from '../../context/AppContext';
import { generateCoverLetter } from '../../services/ai';

export default function CoverLetter() {
  const { darkMode } = useApp();
  const [searchParams] = useSearchParams();
  const [jobTitle, setJobTitle] = useState(searchParams.get('job') || '');
  const [company, setCompany] = useState(searchParams.get('company') || '');
  const [jobDescription, setJobDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setJobTitle(searchParams.get('job') || '');
    setCompany(searchParams.get('company') || '');
  }, [searchParams]);

  const handleGenerate = async () => {
    if (!jobTitle.trim() || !company.trim()) {
      setError('Please enter job title and company');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const letter = await generateCoverLetter(jobTitle, company, jobDescription, skills, experience);
      setResult(letter);
    } catch (err: any) {
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
      title="Cover Letter Generator"
      description="Generate professional cover letters tailored to your target job"
      icon={<FileEdit className="w-7 h-7 text-white" />}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Job Title *
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-indigo-500`}
              placeholder="e.g. Full Stack Developer"
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
              placeholder="e.g. Amazon"
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={3}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-indigo-500`}
            placeholder="Paste the job description for more personalized letter..."
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Your Key Skills
          </label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-indigo-500`}
            placeholder="e.g. React, Node.js, AWS, Team Leadership"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Relevant Experience
          </label>
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            rows={3}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-indigo-500`}
            placeholder="Brief summary of your relevant experience and achievements..."
          />
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading || !jobTitle.trim() || !company.trim()}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Cover Letter'}
        </button>

        {result && (
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} animate-fade-in`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Your Cover Letter
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
