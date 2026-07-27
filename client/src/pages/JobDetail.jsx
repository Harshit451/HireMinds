import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Bookmark, BookmarkCheck, Share2, Building, Users, ArrowLeft, CheckCircle, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiApplyToJob } from '../lib/api';

export default function JobDetail() {
  const { id } = useParams();
  const { darkMode, jobs, user, savedJobs, saveJob, unsaveJob } = useApp();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  const isSaved = job ? savedJobs.includes(job.id) : false;

  useEffect(() => {
    const found = jobs.find(j => j.id === id);
    if (found) {
      setJob(found);
    }
  }, [id, jobs]);

  const handleApply = async () => {
    if (!user) {
      navigate('/signin');
      return;
    }

    setApplying(true);
    try {
      await apiApplyToJob(job.id);
      setApplied(true);
    } catch (error) {
      alert(error.message);
    }
    setApplying(false);
  };

  const handleSave = () => {
    if (!job) return;
    if (isSaved) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  if (!job) {
    return (
      <div className={`min-h-screen pt-20 flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
          <Link to="/jobs" className="text-indigo-500 hover:underline">Back to Jobs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/jobs" className={`inline-flex items-center mb-6 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-6xl">{job.logo || '🏢'}</div>
                  <div>
                    <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{job.title}</h1>
                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{job.company}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className={`p-3 rounded-xl ${isSaved ? 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                  </button>
                  <button className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
                  {job.location}
                </div>
                <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                  {job.salary}
                </div>
                <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Clock className="w-5 h-5 mr-2 text-orange-500" />
                  {job.posted}
                </div>
                <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Users className="w-5 h-5 mr-2 text-purple-500" />
                  {job.applicants || 0} applicants
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                  {job.type}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  {job.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Job Description</h2>
              <p className={`whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{job.description}</p>
            </div>

            {/* Requirements */}
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map(skill => (
                  <span key={skill} className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-indigo-50 text-indigo-700'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg sticky top-24`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {applied ? 'Application Submitted!' : 'Apply for this position'}
              </h3>
              
              {applied ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Your application has been submitted successfully!
                  </p>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleApply}
                    disabled={applying}
                    className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {applying ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Apply Now
                      </>
                    )}
                  </button>
                  <p className={`mt-4 text-sm text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {user ? 'Click to submit your application' : 'Sign in to apply for this job'}
                  </p>
                </>
              )}
            </div>

            {/* Company Info */}
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>About the Company</h3>
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">{job.logo || '🏢'}</div>
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{job.company}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{job.category} Industry</p>
                </div>
              </div>
              <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Building className="w-4 h-4 mr-2" />
                {job.location}
              </div>
            </div>

            {/* AI Tools */}
            <div className={`p-6 rounded-2xl border-2 border-dashed ${darkMode ? 'border-indigo-500/30 bg-indigo-900/10' : 'border-indigo-200 bg-indigo-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>🤖 Prepare with AI</h3>
              <div className="space-y-3">
                <Link to={`/ai/interview-guide?job=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}`} className="block p-3 rounded-xl bg-white dark:bg-gray-800 hover:shadow-md transition-all">
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>📝 Get Interview Questions</span>
                </Link>
                <Link to={`/ai/cover-letter?job=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}`} className="block p-3 rounded-xl bg-white dark:bg-gray-800 hover:shadow-md transition-all">
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>✉️ Generate Cover Letter</span>
                </Link>
                <Link to={`/ai/salary-estimator?job=${encodeURIComponent(job.title)}&location=${encodeURIComponent(job.location)}`} className="block p-3 rounded-xl bg-white dark:bg-gray-800 hover:shadow-md transition-all">
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>💰 Estimate Salary</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
