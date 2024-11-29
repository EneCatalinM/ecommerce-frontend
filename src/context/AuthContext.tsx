import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  user: {
    email: string,
    role: string,
    accessToken: string
  } | null;
  login: (userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ accessToken: string; email: string; role: string } | null>(null);

  const login = async (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);

    try {
      const response = await fetch('http://localhost:6060/users/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const profileData = await response.json();

        setUser({
          accessToken,
          email: profileData.email,
          role: profileData.role,
        });
        localStorage.setItem('email', profileData.email);
        localStorage.setItem('role', profileData.role);
      } else {
        console.error('Failed to fetch user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    if (accessToken && email && role) {
      setUser({ accessToken, email, role });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
