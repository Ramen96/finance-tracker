import styles from "./loading.module.scss";

export default function Loading() {
  return (
    <section className={styles.container}>
      <div className={styles.loading}>Loading...</div>
    </section>
  )
}
