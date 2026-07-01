import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LoaderCircle,
  AlertCircle,
  Check,
} from "lucide-react";
import { AuthShell } from "../components/AuthShell";
import { useAuth } from "../context/AuthContext";

export function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Please enter your name.");
    if (!validEmail) return setError("Please enter a valid email address.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (!agree) return setError("Please accept the terms to continue.");

    setLoading(true);
    try {
      await signup(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Begin your journey of virtual darshan in minutes."
    >
      <form onSubmit={submit} className="space-y-5">
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        <div>
          <label className="font-body text-sm text-[var(--dd-ink)]/70">
            Full name
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-[var(--dd-gold)]/40 bg-white px-4 focus-within:border-[var(--dd-saffron)]">
            <User className="h-4.5 w-4.5 text-[var(--dd-ink)]/40" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-transparent py-3 font-body text-[var(--dd-ink)] outline-none"
            />
          </div>
        </div>

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
          <label className="font-body text-sm text-[var(--dd-ink)]/70">
            Password
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-[var(--dd-gold)]/40 bg-white px-4 focus-within:border-[var(--dd-saffron)]">
            <Lock className="h-4.5 w-4.5 text-[var(--dd-ink)]/40" />
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
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

        <label className="flex cursor-pointer items-start gap-2.5">
          <button
            type="button"
            onClick={() => setAgree((v) => !v)}
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
              agree
                ? "border-[var(--dd-saffron)] bg-[var(--dd-saffron)] text-white"
                : "border-[var(--dd-gold)]/50 bg-white"
            }`}
            aria-pressed={agree}
          >
            {agree && <Check className="h-3.5 w-3.5" />}
          </button>
          <span className="font-body text-sm text-[var(--dd-ink)]/60">
            I agree to the Terms of Service and Privacy Policy.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--dd-saffron)] py-3.5 font-body text-white shadow-lg shadow-[var(--dd-saffron)]/30 transition-transform hover:-translate-y-0.5 disabled:opacity-70"
        >
          {loading && <LoaderCircle className="h-4.5 w-4.5 animate-spin" />}
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center font-body text-sm text-[var(--dd-ink)]/60">
        Already have an account?{" "}
        <Link to="/login" className="text-[var(--dd-saffron)] hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
