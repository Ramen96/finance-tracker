import styles from "./Login.module.scss";

export default function login() {
  return (
    <main className={`flex-center h-full w-full ${styles.mainContainer}`}>
      <section className={`${styles.card} flex-center-h`} id="card">
        <h1 className={styles.invertTextColor}>Login</h1>
        <div className={styles.loginContainer} id="login-container">
          <div className={`flex-center-v ${styles.inputContainer}`}>
            <label htmlFor="email"></label>
            <input
              placeholder="Email"
              autoComplete="on"
              className={`${styles.textInputPrimary}`}
              type="text"
              id="email"
            />
          </div>
          <div className={`flex-center-v ${styles.inputContainer}`}>
            <label htmlFor="password"></label>
            <input
              placeholder="Password"
              className={`${styles.textInputPrimary}`}
              type="password"
              id="password"
            />
          </div>
        </div>
        <div className={`${styles.btnContainer}`} id="btn-container">
          <button className={`${styles.btnPrimary}`}>Submit</button>
          <button className={`${styles.btnSecondary}`}>Sign up</button>
          <button className={`${styles.btnTertiary}`}>Forgot Password</button>
        </div>
      </section>
    </main>
  );
}
