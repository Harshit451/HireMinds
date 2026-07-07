import { useState, useRef } from 'react';
import { FileText, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import AIToolLayout from '../../components/AIToolLayout';
import { useApp } from '../../context/AppContext';
import { checkResume } from '../../services/ai';
import { extractTextFromPDF } from '../../utils/pdfParser';

export default function ResumeChecker() {
  const { darkMode } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please upload a PDF file');
      return;
    }

    setFileName(file.name);
    setParsing(true);
    setError('');

    try {
      const text = await extractTextFromPDF(file);
      setResumeText(text);
    } catch {
      setError('Failed to parse PDF. Please paste your resume text instead.');
    }
    setParsing(false);
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError('Please upload a resume or paste text');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const analysis = await checkResume(resumeText);
      setResult(analysis);
    } catch (err: any) {
      setError(err.message || 'Analysis failed');
    }
    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Work';
  };

  return (
    <AIToolLayout
      title="Resume Checker"
      description="Upload your PDF resume and get an AI-powered score"
      icon={<FileText className="w-7 h-7 text-white" />}
    >
      <div className="space-y-6">
        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            darkMode 
              ? 'border-gray-600 hover:border-indigo-500 bg-gray-700/50' 
              : 'border-gray-300 hover:border-indigo-400 bg-gray-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Upload className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {parsing ? 'Parsing PDF...' : fileName || 'Click or drag to upload PDF'}
          </p>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Or paste your resume text below
          </p>
        </div>

        {/* Text Area */}
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows={8}
          className={`w-full px-4 py-3 rounded-xl border ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
          } focus:ring-2 focus:ring-indigo-500`}
          placeholder="Paste your resume text here..."
        />

        {error && (
          <div className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading || !resumeText.trim()}
          className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fade-in">
            {/* Main Score */}
            <div className={`p-8 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="relative inline-flex items-center justify-center w-40 h-40">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80" cy="80" r="70"
                    fill="none"
                    stroke={darkMode ? '#374151' : '#e5e7eb'}
                    strokeWidth="12"
                  />
                  <circle
                    cx="80" cy="80" r="70"
                    fill="none"
                    stroke={result.score >= 80 ? '#22c55e' : result.score >= 60 ? '#eab308' : '#ef4444'}
                    strokeWidth="12"
                    strokeDasharray={`${(result.score / 100) * 440} 440`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className={`text-4xl font-bold ${getScoreColor(result.score)}`}>{result.score}</span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>out of 100</span>
                </div>
              </div>
              <p className={`mt-4 text-xl font-semibold ${getScoreColor(result.score)}`}>
                {getScoreLabel(result.score)}
              </p>
              <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                ATS Compatibility: {result.atsScore}%
              </p>
            </div>

            {/* Section Scores */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Section Analysis
              </h3>
              <div className="space-y-4">
                {result.sections.map((section: any) => (
                  <div key={section.name}>
                    <div className="flex justify-between mb-1">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{section.name}</span>
                      <span className={getScoreColor(section.score)}>{section.score}%</span>
                    </div>
                    <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      <div
                        className={`h-2 rounded-full ${section.score >= 80 ? 'bg-green-500' : section.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${section.score}%` }}
                      />
                    </div>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {section.feedback}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {result.strengths.map((s: string, i: number) => (
                    <li key={i} className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="text-green-500 mr-2">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
                <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Areas to Improve
                </h3>
                <ul className="space-y-2">
                  {result.weaknesses.map((w: string, i: number) => (
                    <li key={i} className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="text-red-500 mr-2">!</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </AIToolLayout>
  );
}
