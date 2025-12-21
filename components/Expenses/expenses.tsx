import styles from "./expenses.module.scss";
import { Utensils, Home, Car, Heart, Zap, Plus, Edit2, Trash2 } from "lucide-react";

const expenseCategories = [
  { name: "Groceries", icon: Utensils },
  { name: "Housing", icon: Home },
  { name: "Transportation", icon: Car },
  { name: "Healthcare", icon: Heart },
  { name: "Utilities", icon: Zap },
];

const groceryExpenses = [
  { id: 1, description: "Weekly grocery shopping", amount: 150 },
  { id: 2, description: "Farmers market", amount: 45 },
];

const housingExpenses = [
  { id: 3, description: "Rent/Mortgage", amount: 2000 },
  { id: 4, description: "Home insurance", amount: 150 },
  { id: 5, description: "Maintenance", amount: 200 },
];

const transportationExpenses = [
  { id: 6, description: "Gas", amount: 150 },
  { id: 7, description: "Car insurance", amount: 120 },
];

const healthcareExpenses = [
  { id: 8, description: "Doctor visit", amount: 100 },
];

const utilitiesExpenses = [
  { id: 9, description: "Electricity", amount: 120 },
  { id: 10, description: "Water", amount: 60 },
  { id: 11, description: "Internet", amount: 80 },
];

const categoryExpenses = {
  Groceries: groceryExpenses,
  Housing: housingExpenses,
  Transportation: transportationExpenses,
  Healthcare: healthcareExpenses,
  Utilities: utilitiesExpenses,
};

export default function Expenses() {
  const calculateCategoryTotal = (category: string) => {
    return categoryExpenses[category as keyof typeof categoryExpenses].reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
  };

  const totalExpenses = Object.values(categoryExpenses).flat().reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <section className={styles.expensesContainer}>
      <div className={styles.header}>
        <h1>Expenses</h1>
        <p>Track and manage your monthly expenses</p>
      </div>

      <section className={styles.categoriesGrid}>
        {expenseCategories.map((category) => {
          const IconComponent = category.icon;
          const expenses = categoryExpenses[category.name as keyof typeof categoryExpenses];
          const categoryTotal = calculateCategoryTotal(category.name);

          return (
            <section key={category.name} className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <IconComponent className={styles.categoryIcon} size={24} />
                <h2>{category.name}</h2>
              </div>

              <button className={styles.addBtn}>
                <Plus size={18} />
                Add Expense
              </button>

              <div className={styles.expensesTable}>
                <div className={styles.tableHeader}>
                  <span className={styles.descriptionCol}>Description</span>
                  <span className={styles.amountCol}>Monthly Amount</span>
                  <span className={styles.actionsCol}>Actions</span>
                </div>

                <div className={styles.tableBody}>
                  {expenses.map((expense) => (
                    <div key={expense.id} className={styles.tableRow}>
                      <span className={styles.descriptionCol}>
                        {expense.description}
                      </span>
                      <span className={styles.amountCol}>
                        ${expense.amount.toLocaleString()}
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

      {/* Grand Total */}
      <div className={styles.grandTotal}>
        <div className={styles.grandTotalContent}>
          <h2>Total Monthly Expenses</h2>
          <span className={styles.grandTotalAmount}>
            ${totalExpenses.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
}