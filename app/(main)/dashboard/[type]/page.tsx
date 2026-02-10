"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DataTable from "@/components/DataTable/dataTable";
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Home,
  Building2,
  Utensils,
  Car,
  Heart,
  Zap,
  CreditCard,
  GraduationCap
} from "lucide-react";
import Audit from "@/components/Audit/audit";
import Income from "@/components/Income/income";
import styles from "./reports.module.scss";

type ReportType = "income" | "expenses" | "assets" | "liabilities" | "audit";

interface ReportItem {
  id: number;
  description: string;
  amount: number;
}

// ALL OF THE DATA BELOW IS PLACEHOLDER DATA
// UNTIL AN API IS CREATED

//////////////////////////////////////////
///////////// INCOME DATA ///////////////
////////////////////////////////////////

const incomeCategories = [
  { name: "Salary", icon: Briefcase },
  { name: "Interest", icon: DollarSign },
  { name: "Dividends", icon: TrendingUp },
  { name: "Real Estate", icon: Home },
  { name: "Businesses", icon: Building2 },
];

const categoryIncome: Record<string, ReportItem[]> = {
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





//////////////////////////////////////////
/////////// EXPENSES DATA ///////////////
////////////////////////////////////////

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

////////////////////////////////////////////////
/////////////// ASSETS DATA ///////////////////
//////////////////////////////////////////////
interface Asset {
  id: number;
  name: string;
  value: number;
  incomeOrRate: string;
}

const producingAssets: Asset[] = [
  {
    id: 1,
    name: "Rental Property - Main St",
    value: 250000,
    incomeOrRate: "$2,500"
  },
  {
    id: 2,
    name: "Dividend Stocks Portfolio",
    value: 150000,
    incomeOrRate: "$500"
  },
];

const growthAssets: Asset[] = [
  {
    id: 3,
    name: "Primary Residence",
    value: 400000,
    incomeOrRate: "3.5%"
  },
  {
    id: 4,
    name: "Growth Stock Portfolio",
    value: 75000,
    incomeOrRate: "8.2%"
  },
];

//////////////////////////////////////////
////////// LIABILITIES DATA /////////////
////////////////////////////////////////
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


export default function Report() {
  const params = useParams();
  const reportType = (params?.type as ReportType) || "income";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate API call
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500)
  }, []);

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



  if (loading) {
    return (
      <section className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </section>
    )
  }

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
