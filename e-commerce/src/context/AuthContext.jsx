import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for session
    const storedUser = localStorage.getItem("ecom_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // simulate network delay

    // Validate email / password (dummy check)
    if (!email || !password) {
      setLoading(false);
      throw new Error("Please enter both email and password");
    }

    if (password.length < 6) {
      setLoading(false);
      throw new Error("Password must be at least 6 characters");
    }

    // Mock successful login
    const name = email.split("@")[0];
    const loggedUser = {
      email,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      token: "mock-jwt-token-12345"
    };

    localStorage.setItem("ecom_user", JSON.stringify(loggedUser));
    setUser(loggedUser);
    setLoading(false);
    return loggedUser;
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // simulate network delay

    if (!name || !email || !password) {
      setLoading(false);
      throw new Error("All fields are required");
    }

    if (password.length < 6) {
      setLoading(false);
      throw new Error("Password must be at least 6 characters");
    }

    const newUser = {
      email,
      name,
      token: "mock-jwt-token-54321"
    };

    localStorage.setItem("ecom_user", JSON.stringify(newUser));
    setUser(newUser);
    setLoading(false);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem("ecom_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
