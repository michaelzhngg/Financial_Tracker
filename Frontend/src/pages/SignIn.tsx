import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { ErrorBanner, Field, fieldInputClass } from "../components/ui";
import { useAuthStore } from "../store/useAuthStore";

export default function SignIn() {
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await login(email, password);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative z-10 flex min-h-screen w-full items-center justify-center px-margin-mobile py-12 md:px-margin-desktop">
      <div className="glass-panel w-full max-w-md rounded-xl p-8 md:p-10">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
            <Icon name="account_balance_wallet" filled size={30} className="text-primary" />
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary">Welcome back</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Sign in to your financial tracker.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Field label="Email" htmlFor="signin-email" icon="mail">
            <input id="signin-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className={fieldInputClass} />
          </Field>

          <Field label="Password" htmlFor="signin-password" icon="lock">
            <input id="signin-password" type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className={fieldInputClass} />
          </Field>

          {error && <ErrorBanner message={error} />}

          <button
            type="submit"
            disabled={isSubmitting}
            className="font-label-md text-label-md flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 uppercase tracking-wider text-on-primary shadow-[0_0_20px_rgba(216,226,255,0.1)] transition-all hover:bg-primary-container hover:shadow-[0_0_30px_rgba(216,226,255,0.2)] disabled:opacity-50"
          >
            {isSubmitting ? "Signing in" : "Sign In"}
            <Icon name="arrow_forward" size={20} />
          </button>
        </form>

        <p className="font-body-md text-body-md mt-8 text-center text-on-surface-variant">
          No account yet?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
