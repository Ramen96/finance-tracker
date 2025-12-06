"use client";
import styles from "./SignUp.module.scss";
import { redirect } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignUp() {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  return (
    <main className={`relative h-full w-full ${styles.mainContainer}`}>
      {/* Card Section */}
      <section className={`${styles.card}`} id="card">
        <div
          className={`w-full flex-center relative-center-top ${styles.headContainer}`}
        >
          <h1 className={styles.loginH1}>Sign Up</h1>
        </div>

        {/* Form Section */}
        <div id="form-container" className={styles.formContainer}>
          {/* Text Inputs */}
          <div className={`${styles.textBoxContainer}`} id="login-container">
            {/* Email */}
            <div id="email-wrapper" className="relative">
              <label htmlFor="email"></label>
              <input
                placeholder="Email"
                autoComplete="on"
                className={`${styles.textInputPrimary}`}
                type="text"
                id="email"
              />
            </div>

            {/* Password */}
            <div id="passwd-wrapper" className="relative">
              <label htmlFor="password"></label>
              <input
                placeholder="Create Password"
                className={`${styles.textInputPrimary}`}
                type={showPass ? "text" : "password"}
                id="password"
              />
              <button
                className={styles.eyeBtn}
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div id="passwd-wrapper" className="relative">
              <label htmlFor="confirm-password"></label>
              <input
                placeholder="Confirm Password"
                className={`${styles.textInputPrimary}`}
                type={showConfirm ? "text" : "password"}
                id="confirm-password"
              />
              <button
                className={styles.eyeBtn}
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className={`${styles.btnContainer}`} id="btn-container">
            <button className={`${styles.btnPrimary}`}>Submit</button>
            <button
              onClick={() => redirect("/login")}
              className={`${styles.btnPrimary}`}
            >
              Login
            </button>

            {/* Remember me */}
            <div className="absolute-bottom-left" id="checkbox-container">
              <input id="remember-me" className={styles.checkbox} type="checkbox" />
              <label className={styles.checkbox} htmlFor="remember-me">Remember Me</label>
            </div>{" "}
          </div>
        </div>
      </section>
    </main>
  );
}
