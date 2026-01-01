import styles from "./audit.module.scss";
import { Briefcase, TrendingUp, ShoppingCart, DollarSign } from "lucide-react";

export default function Audit() {
  return (
    <section className={styles.auditContainer}>
      <div className={styles.header}>
        <h1>Financial Audit</h1>
        <p>Your monthly financial overview</p>
      </div>

      <div className={styles.auditCard}>
        {/* Salary */}
        <div className={styles.incomeRow}>
          <Briefcase className={`${styles.rowIcon} ${styles.primary}`} size={18} />
          <span className={styles.rowLabel}>Salary</span>
          <span className={styles.rowAmount}>$0.00</span>
        </div>

        {/* Passive Income */}
        <div className={styles.incomeRowBorder}>
          <TrendingUp className={`${styles.rowIcon} ${styles.success}`} size={18} />
          <span className={styles.rowLabel}>Passive Income</span>
          <span className={styles.rowAmount}>$0.00</span>
        </div>

        {/* Total Income */}
        <div className={styles.totalRow}>
          <DollarSign className={styles.rowIcon} size={20} />
          <span className={styles.totalLabel}>Total Income</span>
          <span className={styles.totalAmount}>$0.00</span>
        </div>

        {/* Total Expenses */}
        <div className={styles.expenseRow}>
          <ShoppingCart className={`${styles.rowIcon} ${styles.error}`} size={18} />
          <span className={styles.rowLabel}>Total Expenses</span>
          <span className={styles.rowAmount}>$0.00</span>
        </div>

        <div className={styles.divider}></div>

        {/* Monthly Cash Flow */}
        <div className={styles.finalTotal}>
          <DollarSign className={styles.rowIcon} size={22} />
          <span className={styles.finalLabel}>Monthly Cash Flow</span>
          <span className={styles.finalAmount}>$0.00</span>
        </div>
      </div>
    </section>
  );
}
