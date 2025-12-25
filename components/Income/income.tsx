import styles from "./income.module.scss";
import { Briefcase, DollarSign, TrendingUp, Home, Building2 } from "lucide-react";

const incomeCategories = [
  { name: "Salary", icon: Briefcase },
  { name: "Interest", icon: DollarSign },
  { name: "Dividends", icon: TrendingUp },
  { name: "Real Estate", icon: Home },
  { name: "Businesses", icon: Building2 },
];

export default function Income() {
  return (
    <section className={styles.incomeContainer}>
      <div className={styles.header}>
        <h1>Income</h1>
        <p>Track your and manage income sources</p>
      </div>

      <section className={styles.categoriesGrid}>
        {incomeCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <section key={category.name} className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <IconComponent className={styles.categoryIcon} size={24} />
                <h2>{category.name}</h2>
              </div>

              {/* Description */}
              <div className={styles.incomeTable}>
                <div className={styles.tableHeader}>
                  <span className={styles.descriptionCol}>Description</span>
                  <span className={styles.amountCol}>Monthly Cash Flow</span>
                </div>

                {/* Sources */}
                <div className={styles.tableBody}>
                  <div className={styles.tableRow}>
                    <span className={styles.descriptionCol}>
                      Add income sources here
                    </span>
                    <span className={styles.amountCol}>
                      $0.00
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className={styles.categoryTotal}>
                  <span className={styles.totalLabel}>Category Total:</span>
                  <span className={styles.totalAmount}>$0.00</span>
                </div>
              </div>
            </section>
          );
        })}
      </section>

      {/* Grand Total */}
      <div className={styles.grandTotal}>
        <div className={styles.grandTotalContent}>
          <h2>Total Monthly Income</h2>
          <span className={styles.grandTotalAmount}>$0.00</span>
        </div>
      </div>
    </section>
  );
}