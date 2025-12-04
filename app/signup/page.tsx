"use client";
import styles from "./SignUp.module.scss";
import { redirect } from "next/navigation";

export default function signup() {
  return (
    <main className={`relative h-full w-full ${styles.mainContainer}`}>
      <section className={`${styles.card}`} id="card">
        <div
          className={`w-full flex-center relative-center-top ${styles.headContainer}`}
        >
          <h1 className={styles.loginH1}>Sign Up</h1>
        </div>
        <div className={styles.formContainer}>
          <div className={`${styles.textBoxContainer}`} id="login-container">
            <label htmlFor="email"></label>
            <input
              placeholder="Email"
              autoComplete="on"
              className={`${styles.textInputPrimary}`}
              type="text"
              id="email"
            />
            <label htmlFor="password"></label>
            <input
              placeholder="Create Password"
              className={`${styles.textInputPrimary}`}
              type="password"
              id="password"
            />
            <label htmlFor="confirm-password"></label>
            <input
              placeholder="Confirm Password"
              className={`${styles.textInputPrimary}`}
              type="password"
              id="confirm-password"
            />
          </div>
          <div className={`${styles.btnContainer}`} id="btn-container">
            <button className={`${styles.btnPrimary}`}>Submit</button>
            <button onClick={() => redirect('/login')} className={`${styles.btnPrimary}`}>Login</button>
          </div>
        </div>
          <input id="remember-me" type="checkbox" />
          <label htmlFor="remember-me">Remember Me</label>
      </section>
    </main>
  );
}
