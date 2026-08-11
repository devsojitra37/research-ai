"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  image: string | null;
  userType: string | null;
  researchAreas?: string;
  onboardingCompleted: boolean;
  profile?: {
    bio: string | null;
    institution: string | null;
    department: string | null;
    researchInterests: string;
    website: string | null;
    linkedin: string | null;
    twitter: string | null;
    googleScholar: string | null;
    orcid: string | null;
    isPublic: boolean;
  } | null;
  creditBalance: { amount: number } | null;
  subscription: {
    plan: { name: string; slug: string };
    status: string;
    billingCycle?: string;
  } | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await fetch("/api/auth/session");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/auth/session", { method: "DELETE" });
    setUser(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
