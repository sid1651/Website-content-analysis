import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, LoaderCircle, AlertCircle } from "lucide-react";
import { AuthShell } from "../components/AuthShell";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { quickLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // For now, signing in logs you in instantly as a demo user.
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      quickLogin();
      navigate("/");
    }, 500);
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue your virtual pilgrimage."
    >
      <form onSubmit={submit} className="space-y-5">
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        <div>
          <label className="font-body text-sm text-[var(--dd-ink)]/70">
            Email address
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-[var(--dd-gold)]/40 bg-white px-4 focus-within:border-[var(--dd-saffron)]">
            <Mail className="h-4.5 w-4.5 text-[var(--dd-ink)]/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent py-3 font-body text-[var(--dd-ink)] outline-none"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="font-body text-sm text-[var(--dd-ink)]/70">
              Password
            </label>
            <button
              type="button"
              className="font-body text-sm text-[var(--dd-saffron)] hover:underline"
            >
              Forgot?
            </button>
          </div>
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-[var(--dd-gold)]/40 bg-white px-4 focus-within:border-[var(--dd-saffron)]">
            <Lock className="h-4.5 w-4.5 text-[var(--dd-ink)]/40" />
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-transparent py-3 font-body text-[var(--dd-ink)] outline-none"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="text-[var(--dd-ink)]/40 hover:text-[var(--dd-maroon)]"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--dd-saffron)] py-3.5 font-body text-white shadow-lg shadow-[var(--dd-saffron)]/30 transition-transform hover:-translate-y-0.5 disabled:opacity-70"
        >
          {loading && <LoaderCircle className="h-4.5 w-4.5 animate-spin" />}
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center font-body text-sm text-[var(--dd-ink)]/60">
        New to Pawan Darshan?{" "}
        <Link to="/signup" className="text-[var(--dd-saffron)] hover:underline">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
