import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Component, ReactNode } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PostJob from './pages/PostJob';
import AITools from './pages/AITools';
import ResumeChecker from './pages/ai/ResumeChecker';
import ResumeImprover from './pages/ai/ResumeImprover';
import InterviewGuide from './pages/ai/InterviewGuide';
import CoverLetter from './pages/ai/CoverLetter';
import SalaryEstimator from './pages/ai/SalaryEstimator';
import JobDescription from './pages/ai/JobDescription';
import About from './pages/About';
import Contact from './pages/Contact';

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center max-w-md">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Don't worry, just refresh the page and try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/ai-tools" element={<AITools />} />
        <Route path="/ai/resume-checker" element={<ResumeChecker />} />
        <Route path="/ai/resume-improver" element={<ResumeImprover />} />
        <Route path="/ai/interview-guide" element={<InterviewGuide />} />
        <Route path="/ai/cover-letter" element={<CoverLetter />} />
        <Route path="/ai/salary-estimator" element={<SalaryEstimator />} />
        <Route path="/ai/job-description" element={<JobDescription />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}
