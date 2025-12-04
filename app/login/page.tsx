import styles from "./Login.module.scss";

export default function login() {
  return (
    <main className={`relative h-full w-full ${styles.mainContainer}`}>
      <section className={`${styles.card}`} id="card">
        <div
          className={`w-full flex-center relative-center-top ${styles.headContainer}`}
        >
          <h1 className={styles.loginH1}>Login</h1>
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
              placeholder="Password"
              className={`${styles.textInputPrimary}`}
              type="password"
              id="password"
            />
          </div>
          <div className={`${styles.btnContainer}`} id="btn-container">
            <button className={`${styles.btnPrimary}`}>Submit</button>
            <button className={`${styles.btnPrimary}`}>Sign Up</button>
            <button className={`${styles.btnPrimary}`}>Forgot Password</button>
          </div>
        </div>
      </section>
    </main>
  );
}
