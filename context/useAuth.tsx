"use client";
import React, { createContext, useContext, useState } from "react";

type AuthState = {
  user?: { email: string } | null;
  setUser: (u: { email: string } | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null);

  async function login(email: string, password: string) {
    // implement API call
    setUser({ email });
  }

  async function signup(email: string, password: string) {
    // implement API call
    setUser({ email });
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}