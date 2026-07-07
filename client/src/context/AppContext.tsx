import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Job } from '../types';
import { apiGetJobs, apiGetCurrentUser } from '../lib/api';
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  savedJobs: string[];
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  loading: boolean;
  signOut: () => void;
  refreshJobs: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize with sample jobs immediately to avoid white screen
  const [user, setUser] = useState<User | null>(null);
  
  const [jobs, setJobs] = useState<Job[]>([]);
  
  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('hireminds_saved') || '[]');
    } catch {
      return [];
    }
  });
  
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('hireminds_darkmode');
      if (saved === 'true') {
        document.documentElement.classList.add('dark');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  });
  
  const [loading] = useState(false);

  useEffect(() => {

  async function loadData() {

    try {

      const currentUser = await apiGetCurrentUser();

      if (currentUser) {
        setUser(currentUser);
      }

      const fetchedJobs = await apiGetJobs();

      setJobs(fetchedJobs);

    } catch (err) {
      console.error(err);
    }
  }

  loadData();

}, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    try {
      localStorage.setItem('hireminds_darkmode', String(newMode));
      document.documentElement.classList.toggle('dark', newMode);
    } catch {
      // Ignore errors
    }
  };

  const saveJob = (jobId: string) => {
    const updated = [...savedJobs, jobId];
    setSavedJobs(updated);
    try {
      localStorage.setItem('hireminds_saved', JSON.stringify(updated));
    } catch {
      // Ignore errors
    }
  };

  const unsaveJob = (jobId: string) => {
    const updated = savedJobs.filter(id => id !== jobId);
    setSavedJobs(updated);
    try {
      localStorage.setItem('hireminds_saved', JSON.stringify(updated));
    } catch {
      // Ignore errors
    }
  };

  const signOut = () => {
    setUser(null);
    setSavedJobs([]);
    try {
      localStorage.removeItem('hireminds_current_user');
    } catch {
      // Ignore errors
    }
  };

  const refreshJobs = async () => {

  try {

    const fetchedJobs = await apiGetJobs();

    setJobs(fetchedJobs);

  } catch (err) {
    console.error(err);
  }
};

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      jobs,
      setJobs,
      savedJobs,
      saveJob,
      unsaveJob,
      darkMode,
      toggleDarkMode,
      loading,
      signOut,
      refreshJobs
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
