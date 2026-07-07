import { useState, useRef } from 'react';
import { Sparkles, Upload, AlertCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import AIToolLayout from '../../components/AIToolLayout';
import { useApp } from '../../context/AppContext';
import { improveResume } from '../../services/ai';
import { extractTextFromPDF } from '../../utils/pdfParser';

export default function ResumeImprover() {
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

  const handleImprove = async () => {
    if (!resumeText.trim()) {
      setError('Please upload a resume or paste text');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const improvements = await improveResume(resumeText);
      setResult(improvements);
    } catch (err: any) {
      setError(err.message || 'Analysis failed');
    }
    setLoading(false);
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default: return <Lightbulb className="w-5 h-5 text-blue-500" />;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'error': return darkMode ? 'bg-red-900/20 border-red-500/30' : 'bg-red-50 border-red-200';
      case 'warning': return darkMode ? 'bg-yellow-900/20 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200';
      default: return darkMode ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <AIToolLayout
      title="Resume Improver"
      description="Get specific suggestions to improve your resume"
      icon={<Sparkles className="w-7 h-7 text-white" />}
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
          onClick={handleImprove}
          disabled={loading || !resumeText.trim()}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Get Improvement Suggestions'}
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fade-in">
            {/* Suggestions */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Improvement Suggestions ({result.suggestions.length})
              </h3>
              <div className="space-y-4">
                {result.suggestions.map((suggestion: any, i: number) => (
                  <div key={i} className={`p-4 rounded-xl border ${getSuggestionColor(suggestion.type)}`}>
                    <div className="flex items-start gap-3">
                      {getSuggestionIcon(suggestion.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
                          }`}>
                            {suggestion.category}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Original:</span>
                            <p className={`text-sm line-through ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {suggestion.original}
                            </p>
                          </div>
                          <div>
                            <span className={`text-xs text-green-500`}>Suggested:</span>
                            <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {suggestion.suggested}
                            </p>
                          </div>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            💡 {suggestion.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Improved Resume */}
            {result.improvedResume && (
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Improved Resume
                </h3>
                <pre className={`whitespace-pre-wrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {result.improvedResume}
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(result.improvedResume)}
                  className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600"
                >
                  Copy to Clipboard
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AIToolLayout>
  );
}
