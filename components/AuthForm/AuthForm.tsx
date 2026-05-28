"use client";
import React, { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import styles from "./AuthForm.module.scss";

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
  rightSlot?: React.ReactNode;
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
          {/* The line belwo is causing some kind of issue with hydration
              see https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html
              and https://nextjs.org/docs/messages/react-hydration-error
          */}
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

      <span className={styles.floatingLabel} aria-hidden="true">
        {label}
      </span>

      {!rightSlot && fieldState !== "idle" && (
        <span className={styles.fieldIcon}>
          {fieldState === "valid"
            ? <Check size={14} strokeWidth={2.5} />
            : <X size={14} strokeWidth={2.5} />}
        </span>
      )}

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

function getEmailState(
  email: string,
  touched: boolean
): { state: FieldState; error?: string } {
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

  // Core 3 / v7 API — no setActive destructured here
  const { signIn, fetchStatus: signInStatus } = useSignIn();
  const { signUp, fetchStatus: signUpStatus } = useSignUp();

  const uid = useId();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const title = mode === "login" ? "Login" : "Sign Up";

  const emailField = getEmailState(email, emailTouched);
  const passwordField = getPasswordState(password, passwordTouched, mode);
  const confirmField = getConfirmState(confirm, password, confirmTouched);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
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
        if (!signInStatus || !signIn) return;

        // Core 3 API: signIn.password() instead of signIn.create()
        const { error: signInError } = await signIn.password({
          emailAddress: email,
          password,
        });

        if (signInError) {
          setError(signInError.message ?? "Login failed");
          return;
        }

        if (signIn.status === "complete") {
          // Core 3 API: finalize() instead of setActive()
          await signIn.finalize({
            navigate: ({ decorateUrl }) => {
              const url = decorateUrl("/dashboard");
              if (url.startsWith("http")) {
                window.location.href = url;
              } else {
                router.push(url);
              }
            },
          });
        } else {
          setError("Login incomplete — please try again");
        }

      } else {
        if (!signUpStatus || !signUp) return;

        // Core 3 API: signUp.create() then signUp.verifications.sendEmailCode()
        const { error: createError } = await signUp.create({
          emailAddress: email,
          password,
        });

        if (createError) {
          setError(createError.message ?? "Sign up failed");
          return;
        }

        // Send verification email
        await signUp.verifications.sendEmailCode();

        // Redirect to verification page
        router.push("/verify-email");
      }

    } catch (err: unknown) {
      const clerkError = err as { errors?: { message: string }[] };
      const message =
        clerkError?.errors?.[0]?.message ??
        (err as Error)?.message ??
        "An error occurred";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.mainContainer}>
      <section className={styles.card} id="card">
        <div className={styles.headContainer}>
          <h1 className={styles.loginH1}>{title}</h1>
        </div>

        <div id="form-container" className={styles.formContainer}>
          <form
            className={styles.textBoxContainer}
            id="auth-form"
            onSubmit={handleSubmit as unknown as React.SubmitEventHandler<HTMLFormElement>}
          >
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

            {mode === "signup" && <PasswordStrength password={password} />}

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

            {error && (
              <div key={error} className={styles.error} role="alert">
                {error}
              </div>
            )}

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
                onClick={() => router.push(mode === "login" ? "/signup" : "/login")}
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
