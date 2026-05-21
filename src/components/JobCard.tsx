import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Bookmark, BookmarkCheck, Users } from 'lucide-react';
import { Job } from '../types';
import { useApp } from '../context/AppContext';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const { darkMode, savedJobs, saveJob, unsaveJob } = useApp();
  const isSaved = savedJobs.includes(job.id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  const typeColors: Record<string, string> = {
    'Full-time': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Part-time': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Contract': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    'Remote': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'Internship': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  };

  return (
    <Link to={`/jobs/${job.id}`}>
      <div className={`group p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        darkMode 
          ? 'bg-gray-800/50 border-gray-700 hover:border-indigo-500/50' 
          : 'bg-white border-gray-200 hover:border-indigo-300'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{job.logo || '🏢'}</div>
            <div>
              <h3 className={`font-semibold text-lg group-hover:text-indigo-500 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {job.title}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{job.company}</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className={`p-2 rounded-lg transition-all ${
              isSaved 
                ? 'text-indigo-500' 
                : darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[job.type] || typeColors['Full-time']}`}>
            {job.type}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
            {job.category}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
            {job.location}
          </div>
          <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <DollarSign className="w-4 h-4 mr-2 text-green-500" />
            {job.salary}
          </div>
          <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Clock className="w-4 h-4 mr-2 text-orange-500" />
            {job.posted}
          </div>
          <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Users className="w-4 h-4 mr-2 text-purple-500" />
            {job.applicants || 0} applicants
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.slice(0, 4).map(skill => (
            <span 
              key={skill} 
              className={`px-2 py-1 rounded-md text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-indigo-50 text-indigo-600'}`}
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className={`px-2 py-1 rounded-md text-xs ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
