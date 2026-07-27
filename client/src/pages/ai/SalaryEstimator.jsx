import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import AIToolLayout from '../../components/AIToolLayout';
import { useApp } from '../../context/AppContext';
import { estimateSalary } from '../../services/ai';

export default function SalaryEstimator() {
  const { darkMode } = useApp();
  const [searchParams] = useSearchParams();
  const [jobTitle, setJobTitle] = useState(searchParams.get('job') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setJobTitle(searchParams.get('job') || '');
    setLocation(searchParams.get('location') || '');
  }, [searchParams]);

  const handleEstimate = async () => {
    if (!jobTitle.trim() || !location.trim()) {
      setError('Please enter job title and location');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const estimate = await estimateSalary(jobTitle, location, experience, skills);
      setResult(estimate);
    } catch (err) {
      setError(err.message || 'Estimation failed');
    }
    setLoading(false);
  };

  return (
    <AIToolLayout
      title="Salary Estimator"
      description="Get detailed salary insights based on role, location, and experience"
      icon={<DollarSign className="w-7 h-7 text-white" />}
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
              placeholder="e.g. Software Engineer"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Location *
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-indigo-500`}
              placeholder="e.g. San Francisco, CA"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Experience Level
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="">Select experience</option>
              <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
              <option value="Mid Level (3-5 years)">Mid Level (3-5 years)</option>
              <option value="Senior (5-8 years)">Senior (5-8 years)</option>
              <option value="Lead/Principal (8+ years)">Lead/Principal (8+ years)</option>
              <option value="Executive (10+ years)">Executive (10+ years)</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Key Skills
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
              placeholder="e.g. Python, Machine Learning, AWS"
            />
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <button
          onClick={handleEstimate}
          disabled={loading || !jobTitle.trim() || !location.trim()}
          className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Estimating...' : 'Estimate Salary'}
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
