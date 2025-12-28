import { Plus, Edit2, Trash2, Car, CreditCard, GraduationCap, Home, Building2 } from "lucide-react";
import styles from "./Card.module.scss";
export default function Card() {

  // Just here to preserve structure from Liabilities component
  const categories = [
    {
      name: "Credit Cards",
      icon: CreditCard,
      liabilities: [
      // ToDo: All keys in objects must match eg. you can not have another object who's keys do not match the others
      // any thing different should throw an error
      // Make sure to check the keys in this nested array of objects and the keys of objects at the root level
      // Once the data structure has been checked for purity it may pass to the next stage
      // Mapping the keys columns (keys) into the tsx structure 
      // This will be done where the div with the className  "styles.tableHeader" is currently with the actions
      // Make sure to leave the actions span where it is because it is constant regardless of the key value/mappings
        {
          id: 1,  
          name: "Chase Sapphire",
          balance: 3500,
          payment: 150,
          rate: 18.99,
        },
        {
          id: 2,
          name: "American Express",
          balance: 2100,
          payment: 100,
          rate: 16.49,
        },
      ],
    },
    {
      name: "Auto Loans",
      icon: Car,
      liabilities: [
        {
          id: 3,
          name: "Tesla Model 3",
          balance: 35000,
          payment: 650,
          rate: 4.5,
        },
      ],
    },
    {
      name: "Student Loans",
      icon: GraduationCap,
      liabilities: [
        {
          id: 4,
          name: "Federal Student Loan",
          balance: 25000,
          payment: 300,
          rate: 5.8,
        },
      ],
    },
    {
      name: "Real Estate",
      icon: Home,
      liabilities: [
        {
          id: 5,
          name: "Primary Mortgage",
          balance: 320000,
          payment: 2200,
          rate: 3.75,
        },
        {
          id: 6,
          name: "Rental Property Mortgage",
          balance: 180000,
          payment: 1400,
          rate: 4.25,
        },
      ],
    },
    {
      name: "Business Loans",
      icon: Building2,
      liabilities: [
        {
          id: 7,
          name: "Small Business Loan",
          balance: 50000,
          payment: 800,
          rate: 6.5,
        },
      ],
    },
  ];

  return (
    <section className={styles.categoriesGrid}>
      {categories.map((category) => {
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
                    <span className={styles.rateCol}>{liability.rate}%</span>
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
  );
}
