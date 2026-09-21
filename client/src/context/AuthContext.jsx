import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, []);

  const updateName = async (newName) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName: newName.trim() });
    setUser({ ...auth.currentUser, displayName: newName.trim() });
  };

  const value = useMemo(() => ({ user, loading, updateName }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
