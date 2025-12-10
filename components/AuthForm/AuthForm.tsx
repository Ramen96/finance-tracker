"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import styles from "./AuthForm.module.scss";
import { useAuth } from "@/context/useAuth";
import SignUpFields from "../SignUpFields/SignUpFields";
import AnimatedBackground from "@/components/AnimatedBackground/AnimatedBackground";


function LoginExtras() {
  return (
    <div className="absolute-bottom-left" id="checkbox-container">
      <input className={styles.checkboxInput} id="remember-me" type="checkbox" />
      <label className={styles.checkbox} htmlFor="remember-me">
      </label>
    </div>
  );
}


function ForgotPassBtn() {
  return (
    <button
      type="button"
      className={`${styles.btnPrimary}`}
    >
      Forgot Password
    </button>
  );
}

type Props = {
  mode: "login" | "signup";
};

export default function AuthForm({ mode }: Props) {
  const router = useRouter();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const title = mode === "login" ? "Login" : "Sign Up";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
      <AnimatedBackground /> 
      <section className={`${styles.card}`} id="card">
        <div
          className={`w-full flex-center relative-center-top ${styles.headContainer}`}
        >
          <h1 className={styles.loginH1}>{title}</h1>
        </div>

        <div id="form-container" className={styles.formContainer}>
          <form
            className={`${styles.textBoxContainer}`}
            id="auth-form"
            onSubmit={handleSubmit}
          >
            <div id="email-wrapper" className="relative">
              <label htmlFor="email"></label>
              <input
                id="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                className={`${styles.textInputPrimary}`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div id="passwd-wrapper" className="relative">
              <label htmlFor="password"></label>
              <input
                id="password"
                name="password"
                placeholder={mode === "login" ? "Password" : "Create Password"}
                className={`${styles.textInputPrimary}`}
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPass(!showPass);
                }}
                aria-label="Toggle password visibility"
              >
                {showPass ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {mode === "signup" ? (
              <SignUpFields
                confirm={confirm}
                setConfirm={setConfirm}
                showConfirm={showConfirm}
                setShowConfirm={setShowConfirm}
              />
            ) : null}

            {error && <div className={styles.error}>{error}</div>}

            <div className={`${styles.btnContainer}`} id="btn-container">
              <button
                type="submit"
                className={`${styles.btnPrimary}`}
                disabled={loading}
              >
                {loading ? "Please wait..." : "Submit"}
              </button>

              <button
                type="button"
                onClick={() => router.push(mode === "login" ? "/signup" : "/login")}
                className={`${styles.btnPrimary}`}
              >
                {mode === "login" ? "Sign Up" : "Login"}
              </button>
              {mode === "login" && <ForgotPassBtn />}
              {mode === "login" ? <LoginExtras /> : null}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}