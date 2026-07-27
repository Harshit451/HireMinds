import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import AIToolLayout from '../../components/AIToolLayout';
import { useApp } from '../../context/AppContext';
import { generateInterviewGuide } from '../../services/ai';

export default function InterviewGuide() {
  const { darkMode } = useApp();
  const [searchParams] = useSearchParams();
  const [jobTitle, setJobTitle] = useState(searchParams.get('job') || '');
  const [company, setCompany] = useState(searchParams.get('company') || '');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setJobTitle(searchParams.get('job') || '');
    setCompany(searchParams.get('company') || '');
  }, [searchParams]);

  const handleGenerate = async () => {
    if (!jobTitle.trim()) {
      setError('Please enter a job title');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const guide = await generateInterviewGuide(jobTitle, company, jobDescription);
      setResult(guide);
    } catch (err) {
      setError(err.message || 'Generation failed');
    }
    setLoading(false);
  };

  return (
    <AIToolLayout
      title="Interview Guide"
      description="Get personalized interview questions and preparation tips"
      icon={<MessageSquare className="w-7 h-7 text-white" />}
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
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              } focus:ring-2 focus:ring-indigo-500`}
              placeholder="e.g. Senior Software Engineer"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Company
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              } focus:ring-2 focus:ring-indigo-500`}
              placeholder="e.g. Google"
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Job Description (optional)
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            } focus:ring-2 focus:ring-indigo-500`}
            placeholder="Paste the job description for more tailored questions..."
          />
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading || !jobTitle.trim()}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Generating Guide...' : 'Generate Interview Guide'}
        </button>

        {result && (
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} animate-fade-in`}>
            <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </AIToolLayout>
  );
}
