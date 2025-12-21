import styles from "./liabilities.module.scss";
import { CreditCard, Car, GraduationCap, Home, Building2, Edit2, Trash2, Plus } from "lucide-react";

// Example Data
const liabilityCategories = [
  {
    name: "Credit Cards",
    icon: CreditCard,
    liabilities: [
      { id: 1, name: "Chase Sapphire", balance: 3500, payment: 150, rate: 18.99 },
      { id: 2, name: "American Express", balance: 2100, payment: 100, rate: 16.49 },
    ],
  },
  {
    name: "Auto Loans",
    icon: Car,
    liabilities: [
      { id: 3, name: "Tesla Model 3", balance: 35000, payment: 650, rate: 4.5 },
    ],
  },
  {
    name: "Student Loans",
    icon: GraduationCap,
    liabilities: [
      { id: 4, name: "Federal Student Loan", balance: 25000, payment: 300, rate: 5.8 },
    ],
  },
  {
    name: "Real Estate",
    icon: Home,
    liabilities: [
      { id: 5, name: "Primary Mortgage", balance: 320000, payment: 2200, rate: 3.75 },
      { id: 6, name: "Rental Property Mortgage", balance: 180000, payment: 1400, rate: 4.25 },
    ],
  },
  {
    name: "Business Loans",
    icon: Building2,
    liabilities: [
      { id: 7, name: "Small Business Loan", balance: 50000, payment: 800, rate: 6.5 },
    ],
  },
];

export default function Liabilities() {
  const totalBalance = liabilityCategories.reduce(
    (sum, cat) => sum + cat.liabilities.reduce((s, l) => s + l.balance, 0),
    0
  );

  const totalPayment = liabilityCategories.reduce(
    (sum, cat) => sum + cat.liabilities.reduce((s, l) => s + l.payment, 0),
    0
  );

  return (
    <section className={styles.liabilitiesContainer}>
      <div className={styles.header}>
        <h1>Liabilities</h1>
        <p>Track your debts and monthly obligations</p>
      </div>

      <section className={styles.categoriesGrid}>
        {liabilityCategories.map((category) => {
          const IconComponent = category.icon;
          const categoryTotal = category.liabilities.reduce(
            (sum, liability) => sum + liability.balance,
            0
          );

          return (
            <section key={category.name} className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <IconComponent className={styles.categoryIcon} size={24} />
                <h2>{category.name}</h2>
              </div>

              <button className={styles.addBtn}>
                <Plus size={18} />
                Add {category.name}
              </button>

              <div className={styles.liabilitiesTable}>
                <div className={styles.tableHeader}>
                  <span className={styles.nameCol}>Name</span>
                  <span className={styles.balanceCol}>Balance</span>
                  <span className={styles.paymentCol}>Payment</span>
                  <span className={styles.rateCol}>Rate</span>
                  <span className={styles.actionsCol}>Actions</span>
                </div>

                <div className={styles.tableBody}>
                  {category.liabilities.map((liability) => (
                    <div key={liability.id} className={styles.tableRow}>
                      <span className={styles.nameCol}>{liability.name}</span>
                      <span className={styles.balanceCol}>
                        ${liability.balance.toLocaleString()}
                      </span>
                      <span className={styles.paymentCol}>
                        ${liability.payment.toLocaleString()}
                      </span>
                      <span className={styles.rateCol}>
                        {liability.rate}%
                      </span>
                      <span className={styles.actionsCol}>
                        <button className={styles.editBtn}>
                          <Edit2 size={16} />
                        </button>
                        <button className={styles.deleteBtn}>
                          <Trash2 size={16} />
                        </button>
                      </span>
                    </div>
                  ))}
                </div>

                <div className={styles.categoryTotal}>
                  <span className={styles.totalLabel}>Category Total:</span>
                  <span className={styles.totalAmount}>
                    ${categoryTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </section>
          );
        })}
      </section>

      {/* Grand Totals */}
      <div className={styles.totalsSection}>
        <div className={styles.grandTotal}>
          <div className={styles.grandTotalContent}>
            <h2>Total Debt Balance</h2>
            <span className={styles.grandTotalAmount}>
              ${totalBalance.toLocaleString()}
            </span>
          </div>
        </div>

        <div className={styles.monthlyTotal}>
          <div className={styles.monthlyTotalContent}>
            <h2>Total Monthly Payment</h2>
            <span className={styles.monthlyTotalAmount}>
              ${totalPayment.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}