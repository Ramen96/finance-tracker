"use client";
import React, { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Check, X } from "lucide-react";
import styles from "./AuthForm.module.scss";
import { useAuth } from "@/context/useAuth";

// ─── Password strength ────────────────────────────────────────────────────────

function getPasswordStrength(password: string): 0 | 1 | 2 | 3 | 4 {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score as 0 | 1 | 2 | 3 | 4;
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];

function PasswordStrength({ password }: { password: string }) {
  const strength = getPasswordStrength(password);
  if (!password) return null;

  return (
    <div className={styles.strengthMeter}>
      <div className={styles.strengthBars}>
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={styles.strengthBar}
            data-active={strength >= level ? "true" : "false"}
            data-level={level}
          />
        ))}
      </div>
      <span className={styles.strengthLabel} data-level={strength}>
        {STRENGTH_LABELS[strength]}
      </span>
    </div>
  );
}

// ─── Floating label field ─────────────────────────────────────────────────────

type FieldState = "idle" | "valid" | "error";

interface FloatingFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  fieldState?: FieldState;
  fieldError?: string;
  rightSlot?: React.ReactNode; // for the eye button
}

function FloatingField({
  id,
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
  fieldState = "idle",
  fieldError,
  rightSlot,
}: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const isFilled = value.length > 0;

  return (
    <div
      className={styles.fieldWrapper}
      data-focused={focused ? "true" : "false"}
      data-filled={isFilled ? "true" : "false"}
      data-error={fieldState === "error" ? "true" : "false"}
      data-valid={fieldState === "valid" ? "true" : "false"}
    >
      {/* The password wrapper handles the eye button row */}
      {rightSlot ? (
        <div className={styles.passwdWrapper}>
          <label htmlFor={id} className="sr-only">{label}</label>
          <input
            id={id}
            name={id}
            type={type}
            autoComplete={autoComplete}
            className={`${styles.textInputPrimary} ${styles.withIcon}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder=" "
          />
          {rightSlot}
        </div>
      ) : (
        <>
          <label htmlFor={id} className="sr-only">{label}</label>
          <input
            id={id}
            name={id}
            type={type}
            autoComplete={autoComplete}
            className={`${styles.textInputPrimary} ${fieldState !== "idle" ? styles.withIcon : ""}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder=" "
          />
        </>
      )}

      {/* Floating label */}
      <span className={styles.floatingLabel} aria-hidden="true">
        {label}
      </span>

      {/* Inline validation icon — not shown when there's an eye button */}
      {!rightSlot && fieldState !== "idle" && (
        <span className={styles.fieldIcon}>
          {fieldState === "valid"
            ? <Check size={14} strokeWidth={2.5} />
            : <X size={14} strokeWidth={2.5} />}
        </span>
      )}

      {/* Inline field-level error */}
      {fieldState === "error" && fieldError && (
        <p className={styles.fieldError} role="alert">{fieldError}</p>
      )}
    </div>
  );
}

// ─── Remember me ─────────────────────────────────────────────────────────────

function LoginExtras() {
  return (
    <div className="absolute-bottom-left" id="checkbox-container">
      <input
        className={styles.checkboxInput}
        id="remember-me"
        type="checkbox"
      />
      <label className={styles.checkbox} htmlFor="remember-me">
        Remember me
      </label>
    </div>
  );
}

// ─── Validation helpers ───────────────────────────────────────────────────────

function getEmailState(email: string, touched: boolean): { state: FieldState; error?: string } {
  if (!touched || !email) return { state: "idle" };
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return valid
    ? { state: "valid" }
    : { state: "error", error: "Enter a valid email address" };
}

function getPasswordState(
  password: string,
  touched: boolean,
  mode: "login" | "signup"
): { state: FieldState; error?: string } {
  if (!touched || !password) return { state: "idle" };
  if (mode === "signup" && password.length < 8)
    return { state: "error", error: "At least 8 characters required" };
  return { state: "valid" };
}

function getConfirmState(
  confirm: string,
  password: string,
  touched: boolean
): { state: FieldState; error?: string } {
  if (!touched || !confirm) return { state: "idle" };
  return confirm === password
    ? { state: "valid" }
    : { state: "error", error: "Passwords do not match" };
}

// ─── Main component ───────────────────────────────────────────────────────────

type Props = {
  mode: "login" | "signup";
};

export default function AuthForm({ mode }: Props) {
  const router = useRouter();
  const auth = useAuth();
  const uid = useId(); // stable prefix for IDs

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Track which fields have been touched for inline validation
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const title = mode === "login" ? "Login" : "Sign Up";

  const emailField = getEmailState(email, emailTouched);
  const passwordField = getPasswordState(password, passwordTouched, mode);
  const confirmField = getConfirmState(confirm, password, confirmTouched);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mark all as touched to surface any remaining errors
    setEmailTouched(true);
    setPasswordTouched(true);
    if (mode === "signup") setConfirmTouched(true);
    setError(null);

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    if (mode === "signup" && password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      if (mode === "login") {
        await auth.login(email, password);
      } else {
        await auth.signup(email, password);
      }
      router.push("/dashboard");
    } catch (err) {
      setError((err as Error)?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.mainContainer}>
      <section className={styles.card} id="card">
        {/* Header */}
        <div className={styles.headContainer}>
          <h1 className={styles.loginH1}>{title}</h1>
        </div>

        {/* Form */}
        <div id="form-container" className={styles.formContainer}>
          <form
            className={styles.textBoxContainer}
            id="auth-form"
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <FloatingField
              id={`${uid}-email`}
              label="Email"
              type="email"
              value={email}
              autoComplete="email"
              onChange={(v) => { setEmail(v); setEmailTouched(true); }}
              fieldState={emailField.state}
              fieldError={emailField.error}
            />

            {/* Password */}
            <FloatingField
              id={`${uid}-password`}
              label={mode === "login" ? "Password" : "Create Password"}
              type={showPass ? "text" : "password"}
              value={password}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              onChange={(v) => { setPassword(v); setPasswordTouched(true); }}
              fieldState={passwordField.state}
              fieldError={passwordField.error}
              rightSlot={
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPass((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            {/* Password strength — signup only */}
            {mode === "signup" && (
              <PasswordStrength password={password} />
            )}

            {/* Confirm password — signup only */}
            {mode === "signup" && (
              <FloatingField
                id={`${uid}-confirm`}
                label="Confirm Password"
                type={showConfirm ? "text" : "password"}
                value={confirm}
                autoComplete="new-password"
                onChange={(v) => { setConfirm(v); setConfirmTouched(true); }}
                fieldState={confirmField.state}
                fieldError={confirmField.error}
                rightSlot={
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />
            )}

            {/* Form-level error */}
            {error && (
              // key forces re-mount so shake animation replays on repeated errors
              <div key={error} className={styles.error} role="alert">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className={styles.btnContainer} id="btn-container">
              <button
                type="submit"
                className={styles.btnPrimary}
                disabled={loading}
              >
                {loading ? "Please wait…" : title}
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push(mode === "login" ? "/signup" : "/login")
                }
                className={styles.btnSecondary}
              >
                {mode === "login" ? "Create an account" : "Back to login"}
              </button>

              {mode === "login" && (
                <button type="button" className={styles.btnTertiary}>
                  Forgot password
                </button>
              )}

              {mode === "login" && <LoginExtras />}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
