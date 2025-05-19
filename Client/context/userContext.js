import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token in localStorage
    const token = localStorage.getItem('auth-token');
    if (token) {
      // Here you would typically verify the token with your backend
      // For now we'll just set a basic user object
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const loginUserContext = (userData) => {
    localStorage.setItem('auth-token', userData.token);
    setUser(userData);
  };

  const logoutUserContext = () => {
    localStorage.removeItem('auth-token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, loginUserContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
