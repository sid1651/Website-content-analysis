import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type User = {
  name: string;
  email: string;
};

type StoredUser = User & { password: string };

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  quickLogin: () => void;
  logout: () => void;
};

const SESSION_KEY = "pd_session";
const USERS_KEY = "pd_users";

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Simulates a network request so the UI can show loading states.
const delay = (ms = 700) => new Promise((r) => setTimeout(r, ms));

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const login = async (email: string, password: string) => {
    await delay();
    const users = readUsers();
    const match = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (!match) throw new Error("No account found with this email.");
    if (match.password !== password)
      throw new Error("Incorrect password. Please try again.");
    const session: User = { name: match.name, email: match.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
  };

  const signup = async (name: string, email: string, password: string) => {
    await delay();
    const users = readUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (exists) throw new Error("An account with this email already exists.");
    const newUser: StoredUser = {
      name: name.trim(),
      email: email.trim(),
      password,
    };
    writeUsers([...users, newUser]);
    const session: User = { name: newUser.name, email: newUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
  };

  // Instant demo sign-in — no credentials required (temporary).
  const quickLogin = () => {
    const session: User = { name: "Devotee", email: "devotee@pawandarshan.com" };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, login, signup, quickLogin, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
