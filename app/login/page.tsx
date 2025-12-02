import styles from "./Login.module.scss";

export default function login() {
  return (
    <main className={`flex-center h-full w-full`}>
      <section className={`${styles.card} flex-center-v`} id="card">
        <input className="hidden" type="text" name="username" id="username" />
        <label className={`${styles.textInput}`} htmlFor="username">Username</label>
      </section>
    </main>
  );
}