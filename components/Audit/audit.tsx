import styles from "./audit.module.scss";
import { Briefcase, TrendingUp, ShoppingCart, Plus, Minus, DollarSign } from "lucide-react";

export default function Audit() {
  return (
    <section className={styles.auditContainer}>
      <div className={styles.header}>
        <h1>Financial Audit</h1>
        <p>Your complete monthly financial overview</p>
      </div>

      {/* Income Section */}
      <section className={styles.auditSection}>
        <div className={styles.sectionHeader}>
          <Briefcase className={styles.sectionIcon} size={20} />
          <h2>Salary</h2>
        </div>
        <div className={styles.amountDisplay}>
          <span className={styles.amountValue}>$0.00</span>
        </div>
      </section>

      {/* Plus Operator */}
      <div className={styles.operator}>
        <Plus size={20} />
      </div>

      {/* Passive Income Section */}
      <section className={styles.auditSection}>
        <div className={styles.sectionHeader}>
          <TrendingUp className={styles.sectionIcon} size={20} />
          <h2>Passive Income</h2>
        </div>
        <div className={styles.amountDisplay}>
          <span className={styles.amountValue}>$0.00</span>
        </div>
      </section>

      {/* Equals Operator */}
      <div className={styles.operatorEquals}>
        <div className={styles.equalsLine}></div>
      </div>

      {/* Total Income */}
      <section className={styles.totalSection}>
        <div className={styles.totalHeader}>
          <DollarSign className={styles.totalIcon} size={24} />
          <h2>Total Income</h2>
        </div>
        <div className={styles.totalAmount}>
          <span className={styles.totalValue}>$0.00</span>
        </div>
      </section>

      {/* Minus Operator */}
      <div className={styles.operator}>
        <Minus size={20} />
      </div>

      {/* Total Expenses Section */}
      <section className={styles.auditSection}>
        <div className={styles.sectionHeader}>
          <ShoppingCart className={styles.sectionIcon} size={20} />
          <h2>Total Expenses</h2>
        </div>
        <div className={styles.amountDisplay}>
          <span className={styles.amountValue}>$0.00</span>
        </div>
      </section>

      {/* Equals Operator */}
      <div className={styles.operatorEquals}>
        <div className={styles.equalsLine}></div>
      </div>

      {/* Monthly Cash Flow */}
      <section className={styles.finalTotal}>
        <div className={styles.finalHeader}>
          <h2>Monthly Cash Flow</h2>
        </div>
        <div className={styles.finalAmount}>
          <span className={styles.finalValue}>$0.00</span>
        </div>
      </section>
    </section>
  );
}