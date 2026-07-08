import { createContext, useContext, useState, useEffect } from 'react';

import { apiGetJobs, apiGetCurrentUser } from '../lib/api';

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  // Initialize with sample jobs immediately to avoid white screen
  const [user, setUser] = useState(null);
  
  const [jobs, setJobs] = useState([]);
  
  const [savedJobs, setSavedJobs] = useState(() => {
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

  const saveJob = (jobId) => {
    const updated = [...savedJobs, jobId];
    setSavedJobs(updated);
    try {
      localStorage.setItem('hireminds_saved', JSON.stringify(updated));
    } catch {
      // Ignore errors
    }
  };

  const unsaveJob = (jobId) => {
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
