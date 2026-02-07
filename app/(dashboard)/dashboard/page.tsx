import Income from "@/components/Income/income";
import Audit from "@/components/Audit/audit";
import Expenses from "@/components/Expenses/expenses";
import Assets from "@/components/Assets/assets";
import styles from "./Dashboard.module.scss";
import Liabilities from "@/components/Liabilities/liabilities";

export default function Dashboard() {
  return (
    <div id="content" className={styles.contentContainer}>
      <div className={styles.cardsContainer}>
        {/* Income Section */}
        <section id="income" className={styles.card}>
          <Income />
        </section>

        {/* Expenses Section */}
        <section id="expenses" className={styles.card}>
          <Expenses />
        </section>

        {/* Assets Section */}
        <section id="assets-and-liabilities" className={styles.card}>
          <Assets />
        </section>

        {/* Liabilities Section */}
        <section id="liabilities" className={styles.card}>
          <Liabilities />
        </section>

        {/* Audit Section */}
        <section id="audit" className={styles.card}>
          <Audit />
        </section>
      </div>
    </div>
  );
}
