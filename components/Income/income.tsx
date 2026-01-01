"use client";
import styles from "./income.module.scss";
import DataTable from "components/DataTable/dataTable";
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Home,
  Building2,
} from "lucide-react";

interface IncomeItem {
  id: number;
  description: string;
  amount: number;
}

const incomeCategories = [
  { name: "Salary", icon: Briefcase },
  { name: "Interest", icon: DollarSign },
  { name: "Dividends", icon: TrendingUp },
  { name: "Real Estate", icon: Home },
  { name: "Businesses", icon: Building2 },
];

const categoryIncome: Record<string, IncomeItem[]> = {
  Salary: [
    { id: 1, description: "Monthly salary", amount: 5000 },
    { id: 2, description: "Bonus", amount: 1000 },
  ],
  Interest: [
    { id: 3, description: "Savings account", amount: 50 },
    { id: 4, description: "CD interest", amount: 75 },
  ],
  Dividends: [
    { id: 5, description: "Stock dividends", amount: 200 },
  ],
  "Real Estate": [
    { id: 6, description: "Rental property #1", amount: 1500 },
    { id: 7, description: "Rental property #2", amount: 1800 },
  ],
  Businesses: [
    { id: 8, description: "Side business", amount: 800 },
  ],
};

export default function Income() {
  const columns = [
    {
      key: "description" as const,
      label: "Description",
      format: (value: string | number) => String(value),
    },
    {
      key: "amount" as const,
      label: "Cash Flow",
      format: (value: string | number) => {
        const num = typeof value === "number" ? value : Number(value || 0);
        return `$${num.toLocaleString()}`;
      },
    },
  ];

  const formattedCategories = incomeCategories.map((category) => ({
    name: category.name,
    icon: category.icon,
    items: categoryIncome[category.name] || [],
  }));

  const totalIncome = Object.values(categoryIncome)
    .flat()
    .reduce((sum, income) => sum + income.amount, 0);

  return (
    <section className={styles.incomeContainer}>
      <div className={styles.header}>
        <h1>Income</h1>
        <p>Track and manage income sources</p>
      </div>

      <DataTable
        categories={formattedCategories}
        columns={columns}
        totalKey="amount"
        onAdd={(cat) => console.log("Adding income to", cat)}
        onEdit={(item) => console.log("Editing income", item)}
        onDelete={(item) => console.log("Deleting income", item)}
      />

      <div className={styles.grandTotal}>
        <div className={styles.grandTotalContent}>
          <h2>Total Monthly Income</h2>
          <span className={styles.grandTotalAmount}>
            ${totalIncome.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
}
