import { useState } from "react";
import Icon from "../components/Icon";
import Select from "../components/Select";
import { ErrorBanner, Field, SuccessBanner, fieldInputClass } from "../components/ui";
import { api } from "../lib/api";
import { CURRENCIES } from "../lib/constants";
import { initialsOf } from "../lib/utils";
import { useAuthStore } from "../store/useAuthStore";
import { useFinanceStore } from "../store/useFinanceStore";

export default function Profile() {
  const { user, setUser, logout } = useAuthStore();
  const refreshAll = useFinanceStore((state) => state.refreshAll);

  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [baseCurrency, setBaseCurrency] = useState(user?.baseCurrency ?? "MYR");
  const [profileError, setProfileError] = useState("");
  const [profileNotice, setProfileNotice] = useState("");
  const [isSavingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordNotice, setPasswordNotice] = useState("");
  const [isSavingPassword, setSavingPassword] = useState(false);

  const handleProfileSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setSavingProfile(true);
    setProfileError("");
    setProfileNotice("");

    try {
      const updated = await api.auth.updateProfile({ displayName, baseCurrency });
      setUser(updated);
      await refreshAll();
      setProfileNotice("Profile updated.");
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : "Unable to update your profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setSavingPassword(true);
    setPasswordError("");
    setPasswordNotice("");

    try {
      await api.auth.changePassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setPasswordNotice("Password changed.");
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : "Unable to change your password.");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="flex flex-col gap-gutter">
      <section className="glass-panel flex flex-col items-center gap-4 rounded-xl p-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-headline-md font-bold text-primary">{initialsOf(user?.displayName ?? "")}</div>
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-background">{user?.displayName}</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">{user?.email}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
        <section className="glass-panel flex flex-col gap-6 rounded-xl p-8">
          <h2 className="font-headline-md text-headline-md text-primary">Details</h2>
          <form onSubmit={handleProfileSave} className="flex flex-col gap-6">
            <Field label="Display Name" htmlFor="profile-name" icon="person">
              <input id="profile-name" required value={displayName} onChange={(event) => setDisplayName(event.target.value)} className={fieldInputClass} />
            </Field>

            <Field label="Base Currency" htmlFor="profile-currency" icon="payments" hint="Used for dashboard and summary totals.">
              <Select
                id="profile-currency"
                value={baseCurrency}
                onChange={setBaseCurrency}
                options={CURRENCIES.map((currency) => ({
                  value: currency.code,
                  label: `${currency.code} — ${currency.name}`,
                }))}
              />
            </Field>

            {profileError && <ErrorBanner message={profileError} />}
            {profileNotice && <SuccessBanner message={profileNotice} />}

            <button type="submit" disabled={isSavingProfile} className="font-label-md text-label-md w-full rounded-xl bg-primary py-4 uppercase tracking-wider text-on-primary transition-all hover:bg-primary-container disabled:opacity-50">
              {isSavingProfile ? "Saving" : "Save Changes"}
            </button>
          </form>
        </section>

        <section className="glass-panel flex flex-col gap-6 rounded-xl p-8">
          <h2 className="font-headline-md text-headline-md text-primary">Change Password</h2>
          <form onSubmit={handlePasswordSave} className="flex flex-col gap-6">
            <Field label="Current Password" htmlFor="current-password" icon="lock">
              <input id="current-password" type="password" required value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className={fieldInputClass} />
            </Field>

            <Field label="New Password" htmlFor="new-password" icon="key" hint="At least 8 characters.">
              <input id="new-password" type="password" required minLength={8} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className={fieldInputClass} />
            </Field>

            {passwordError && <ErrorBanner message={passwordError} />}
            {passwordNotice && <SuccessBanner message={passwordNotice} />}

            <button
              type="submit"
              disabled={isSavingPassword}
              className="font-label-md text-label-md w-full rounded-xl border border-white/20 py-4 uppercase tracking-wider text-on-background transition-colors hover:bg-white/5 disabled:opacity-50"
            >
              {isSavingPassword ? "Saving" : "Change Password"}
            </button>
          </form>
        </section>
      </div>

      <button
        type="button"
        onClick={logout}
        className="font-label-md text-label-md flex w-full items-center justify-center gap-2 rounded-xl border border-error/30 bg-error/10 py-4 uppercase tracking-wider text-error transition-colors hover:bg-error/20"
      >
        <Icon name="logout" size={18} />
        Sign Out
      </button>
    </div>
  );
}
