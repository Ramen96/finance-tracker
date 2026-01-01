"use client";
import styles from "./liabilities.module.scss";
import DataTable from "components/DataTable/dataTable";
import { CreditCard, Car, GraduationCap, Home, Building2 } from "lucide-react";

interface LiabilityItem {
  id: number;
  name: string;
  balance: number;
  payment: number;
  rate: number;
}

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
  const columns = [
    {
      key: "name" as const,
      label: "Name",
      format: (value: string | number) => String(value),
    },
    {
      key: "balance" as const,
      label: "Balance",
      format: (value: string | number) => {
        const num = typeof value === "number" ? value : Number(value || 0);
        return `$${num.toLocaleString()}`;
      },
    },
    {
      key: "payment" as const,
      label: "Payment",
      format: (value: string | number) => {
        const num = typeof value === "number" ? value : Number(value || 0);
        return `$${num.toLocaleString()}`;
      },
    },
    {
      key: "rate" as const,
      label: "Rate",
      format: (value: string | number) => {
        const num = typeof value === "number" ? value : Number(value || 0);
        return `${num}%`;
      },
    },
  ];

  const formattedCategories = liabilityCategories.map((category) => ({
    name: category.name,
    icon: category.icon,
    items: category.liabilities,
  }));

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

      <DataTable
        categories={formattedCategories}
        columns={columns}
        totalKey="balance"
        onAdd={(cat) => console.log("Adding liability to", cat)}
        onEdit={(item) => console.log("Editing liability", item)}
        onDelete={(item) => console.log("Deleting liability", item)}
      />

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
