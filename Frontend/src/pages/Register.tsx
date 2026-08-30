import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Select from "../components/Select";
import { ErrorBanner, Field, fieldInputClass } from "../components/ui";
import { CURRENCIES } from "../lib/constants";
import { useAuthStore } from "../store/useAuthStore";

export default function Register() {
  const register = useAuthStore((state) => state.register);

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("MYR");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await register(email, displayName, password, baseCurrency);
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : "Unable to create your account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative z-10 flex min-h-screen w-full items-center justify-center px-margin-mobile py-12 md:px-margin-desktop">
      <div className="glass-panel w-full max-w-md rounded-xl p-8 md:p-10">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-secondary/20 bg-secondary/10">
            <Icon name="person_add" filled size={30} className="text-secondary" />
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary">Create your account</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Your accounts, categories and budgets stay private to you.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Field label="Display Name" htmlFor="register-name" icon="person">
            <input id="register-name" required value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Your name" className={fieldInputClass} />
          </Field>

          <Field label="Email" htmlFor="register-email" icon="mail">
            <input id="register-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className={fieldInputClass} />
          </Field>

          <Field label="Password" htmlFor="register-password" icon="lock" hint="At least 8 characters.">
            <input id="register-password" type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className={fieldInputClass} />
          </Field>

          <Field label="Base Currency" htmlFor="register-currency" icon="payments">
            <Select
              id="register-currency"
              value={baseCurrency}
              onChange={setBaseCurrency}
              options={CURRENCIES.map((currency) => ({
                value: currency.code,
                label: `${currency.code} — ${currency.name}`,
              }))}
            />
          </Field>

          {error && <ErrorBanner message={error} />}

          <button
            type="submit"
            disabled={isSubmitting}
            className="font-label-md text-label-md flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 uppercase tracking-wider text-on-primary shadow-[0_0_20px_rgba(216,226,255,0.1)] transition-all hover:bg-primary-container hover:shadow-[0_0_30px_rgba(216,226,255,0.2)] disabled:opacity-50"
          >
            {isSubmitting ? "Creating account" : "Create Account"}
            <Icon name="arrow_forward" size={20} />
          </button>
        </form>

        <p className="font-body-md text-body-md mt-8 text-center text-on-surface-variant">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
