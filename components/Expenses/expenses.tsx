"use client";
import styles from "./expenses.module.scss";
import DataTable from "components/DataTable/dataTable";
import { Utensils, Home, Car, Heart, Zap, Plus, Edit2, Trash2 } from "lucide-react";

interface ExpenseItem {
  id: number;
  description: string;
  amount: number;
}

const expenseCategories = [
  { name: "Groceries", icon: Utensils },
  { name: "Housing", icon: Home },
  { name: "Transportation", icon: Car },
  { name: "Healthcare", icon: Heart },
  { name: "Utilities", icon: Zap },
];

const categoryExpenses: Record<string, ExpenseItem[]> = {
  Groceries: [
    { id: 1, description: "Weekly grocery shopping", amount: 150 },
    { id: 2, description: "Farmers market", amount: 45 },
  ],
  Housing: [
    { id: 3, description: "Rent/Mortgage", amount: 2000 },
    { id: 4, description: "Home insurance", amount: 150 },
    { id: 5, description: "Maintenance", amount: 200 },
  ],
  Transportation: [
    { id: 6, description: "Gas", amount: 150 },
    { id: 7, description: "Car insurance", amount: 120 },
  ],
  Healthcare: [
    { id: 8, description: "Doctor visit", amount: 100 },
  ],
  Utilities: [
    { id: 9, description: "Electricity", amount: 120 },
    { id: 10, description: "Water", amount: 60 },
    { id: 11, description: "Internet", amount: 80 },
  ],
};

export default function Expenses() {

  const columns = [
    {
      key: "description" as const,
      label: "Item",
      format: (value: string | number) => String(value),
    },
    {
      key: "amount" as const,
      label: "Amount",
      format: (value: string | number) => {
        const num = typeof value === "number" ? value : Number(value || 0);
        return `$${num.toLocaleString()}`;
      },
    },
  ];

  const formattedCategories = expenseCategories.map((category) => ({
    name: category.name,
    icon: category.icon,
    items: categoryExpenses[category.name] || [],
  }));

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

      <DataTable
        categories={formattedCategories}
        columns={columns}
        totalKey="amount"
        onAdd={(cat) => console.log("adding to cat", cat)}
        onEdit={(item) => console.log("Editing", item)}
        onDelete={(item) => console.log("Deleting", item)}
      />

      <div className={styles.grandTotal}>
        <div className={styles.grandTotalContent}>
          <h2>Total Expenses</h2>
          <span className={styles.grandTotalAmount}>
            ${totalExpenses.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
}
