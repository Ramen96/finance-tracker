import SideBar from "@/components/Sidebar/Sidebar";
import styles from "./Dashboard.module.scss";

export default function Dashboard () {
  return (
    <>
      <main className={styles.mainContainer}>
        <SideBar />
        <div id="content" className={styles.contentContainer}>
          <nav id="nav" className={`${styles.nav}`}>
            <h1 className="">Goal and % to goal</h1>
          </nav>
          <section id="income" className={styles.card}>
            <h1>Income</h1>
          </section>
          <section id="audit" className={styles.card}>
            <h1>Audit</h1>
          </section>
          <section id="expenses" className={styles.card}>
            <h1>Expenses</h1>
          </section>
          <section id="assets-and-liabilities" className={styles.card}>
            <span className={styles.cardItem}>
              <h1>Assets</h1>
            </span>
            <span className={styles.cardItem}>
              <h1>Liabilities</h1>
            </span>
          </section>
        </div>
      </main>
    </>
  );
}