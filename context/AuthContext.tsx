import { auth } from "@/utils/firebase";
import { useRouter, useSegments } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect, createContext, useContext, PropsWithChildren } from "react";

interface AuthContextType {
  signOut: () => void;
  login: () => void;
  authenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const rootSegment = useSegments()[0];
  const router = useRouter();

  const login = async () => {
    // Lógica de login aqui
  };

  const signOut = async () => {
    // Lógica de logout aqui
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isAuthenticated = user?.emailVerified ?? false;
      setAuthenticated(isAuthenticated);

      if (!isAuthenticated && rootSegment !== "(auth)") {
        router.replace("/(auth)/");
      } else if (isAuthenticated && rootSegment === "(auth)") {
        router.replace("/(app)/(tabs)/");
      }
    });

    return () => unsubscribe();
  }, [rootSegment, router]);

  return (
    <AuthContext.Provider value={{ authenticated, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
