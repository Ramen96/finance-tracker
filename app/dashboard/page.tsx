import SideBar from "@/components/Sidebar/Sidebar";
import Income from "@/components/Income/income";
import Audit from "@/components/Audit/audit";
import Expenses from "@/components/Expenses/expenses";
import Assets from "@/components/Assets/assets";
import styles from "./Dashboard.module.scss";

export default function Dashboard () {
  return (
    <>
      <main className={styles.mainContainer}>
        <SideBar />
        <div id="content" className={styles.contentContainer}>

          {/* Navigation */}
          <nav id="nav" className={`${styles.nav}`}>
            <h1 className="">Goal and % to goal</h1>
          </nav>

          {/* Income Section */}
          <section id="income" className={styles.card}>
            <Income />
          </section>

          {/* Audit Section */}
          <section id="audit" className={styles.card}>
            <Audit />
          </section>

          {/* Expenses Section */}
          <section id="expenses" className={styles.card}>
            <Expenses />
          </section>

          {/* Assets Section */}
          <section id="assets-and-liabilities" className={styles.card}>
            <span className={styles.cardItem}>
              <Assets />
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