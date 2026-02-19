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
  GraduationCap,
  LineChart
} from "lucide-react";
import Loading from "@/components/Loading/loading";
import Audit from "@/components/Audit/audit";
import styles from "./reports.module.scss";

type ReportType = "income" | "expenses" | "assets" | "liabilities" | "audit";

// ALL OF THE DATA BELOW IS PLACEHOLDER DATA
// UNTIL AN API IS CREATED

//////////////////////////////////////////
///////////// INCOME DATA ///////////////
////////////////////////////////////////
interface incomeReportType {
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

const incomeItem: Record<string, incomeReportType[]> = {
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

const incomeColumns = [
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

const expenseItems: Record<string, ExpenseItem[]> = {
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

const expensesColumns = [
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

////////////////////////////////////////////////
/////////////// ASSETS DATA ///////////////////
//////////////////////////////////////////////
interface Asset {
  id: number;
  name: string;
  value: number;
  incomeOrRate: string;
}

const assetCategories = [
  { name: "Producing Assets", icon: TrendingUp },
  { name: "Growth Assets", icon: LineChart },
];

const assetItems: Record<string, Asset[]> = {
  "Producing Assets": [
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
  ],
  "Growth Assets": [
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
  ],
};

const assetsColumns = [
  {
    key: "name" as const,
    label: "Asset Name",
    format: (value: string | number) => String(value),
  },
  {
    key: "value" as const,
    label: "Value",
    format: (value: string | number) => {
      const num = typeof value === "number" ? value : Number(value || 0);
      return `$${num.toLocaleString()}`;
    },
  },
  {
    key: "incomeOrRate" as const,
    label: "Income/Rate",
    format: (value: string | number) => String(value),
  },
];

//////////////////////////////////////////
////////// LIABILITIES DATA /////////////
////////////////////////////////////////
interface liabilityType {
  id: number;
  name: string;
  balance: number;
  payment: number;
  rate: number;
}

const liabilityCategories = [
  { name: "Credit Cards", icon: CreditCard },
  { name: "Auto Loans", icon: Car },
  { name: "Student Loans", icon: GraduationCap },
  { name: "Real Estate", icon: Home },
  { name: "Business Loans", icon: Building2 },
];

const liabilitiesItems: Record<string, liabilityType[]> = {
  "Credit Cards": [
    { id: 1, name: "Chase Sapphire", balance: 3500, payment: 150, rate: 18.99 },
    { id: 2, name: "American Express", balance: 2100, payment: 100, rate: 16.49 },
  ],
  "Auto Loans": [
    { id: 3, name: "Tesla Model 3", balance: 35000, payment: 650, rate: 4.5 },
  ],
  "Student Loans": [
    { id: 4, name: "Federal Student Loan", balance: 25000, payment: 300, rate: 5.8 },
  ],
  "Real Estate": [
    { id: 5, name: "Primary Mortgage", balance: 320000, payment: 2200, rate: 3.75 },
    { id: 6, name: "Rental Property Mortgage", balance: 180000, payment: 1400, rate: 4.25 },
  ],
  "Business Loans": [
    { id: 7, name: "Small Business Loan", balance: 50000, payment: 800, rate: 6.5 },
  ]
};

const liabilitiesColumns = [
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

export default function Report() {
  const params = useParams();
  const reportType = (params?.type as ReportType) || "income";

  const [loading, setLoading] = useState<boolean>(true);

  // Simulate API call
  useEffect(() => {

    setTimeout(() => {

      setLoading(false);
    }, 500)
  }, []);


  if (loading) {
    return (
      <Loading />
    )
  }

  if (reportType === "audit") {
    return (
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.auditWrapper}>
            <Audit />
          </div>
        </div>
      </div>
    );
  }

  const formatCategories = (categories: any[], itemsObject: any) => {
    return categories.map((category) => ({
      name: category.name,
      icon: category.icon,
      items: itemsObject[category.name] || []
    }));
  };

  const formattedIncome = formatCategories(incomeCategories, incomeItem);
  const formattedExpenses = formatCategories(expenseCategories, expenseItems);
  const formattedAssets = formatCategories(assetCategories, assetItems);
  const formattedLiabilities = formatCategories(liabilityCategories, liabilitiesItems);

  type ReportConfig = {
    income: {
      categories: any[];
      columns: typeof incomeColumns;
      totalKey: keyof incomeReportType;
      name: string;
      description: string;
    };
    expenses: {
      categories: any[];
      columns: typeof expensesColumns;
      totalKey: keyof ExpenseItem;
      name: string;
      description: string;
    };
    assets: {
      categories: any[];
      columns: typeof assetsColumns;
      totalKey: keyof Asset;
      name: string;
      description: string;
    };
    liabilities: {
      categories: any[];
      columns: typeof liabilitiesColumns;
      totalKey: keyof liabilityType;
      name: string;
      description: string;
    };
  };

  const reportConfig: ReportConfig = {
    income: {
      categories: formattedIncome,
      columns: incomeColumns,
      totalKey: "amount",
      name: "Income",
      description: "Track and manage income sources",
    },
    expenses: {
      categories: formattedExpenses,
      columns: expensesColumns,
      totalKey: "amount",
      name: "Expenses",
      description: "Track and manage your monthly expenses"
    },
    assets: {
      categories: formattedAssets,
      columns: assetsColumns,
      totalKey: "value",
      name: "Assets",
      description: "Track your producing and growth assets"
    },
    liabilities: {
      categories: formattedLiabilities,
      columns: liabilitiesColumns,
      totalKey: "balance",
      name: "Liabilities",
      description: "Track your debts and monthly obligations"
    }
  }

  type ValidReportType = Exclude<ReportType, "audit">;
  const config = reportConfig[reportType as ValidReportType];

  const configCategories = config.categories;
  const configTotalKey = config.totalKey;
  const configColumns = config.columns;

  const total = config.categories
    .map(category => category.items)
    .flat()
    .reduce((sum, item) => sum + (Number(item[config.totalKey]) || 0), 0);

  return (
    <div className={styles.contentContainer}>
      <section className={styles.incomeContainer}>
        <div className={styles.header}>
          <h1>{config.name}</h1>
          <p>{config.description}</p>
        </div>

        <DataTable
          categories={configCategories}
          columns={configColumns}
          totalKey={configTotalKey}
          onAdd={(cat) => console.log("Adding income to", cat)}
          onEdit={(item) => console.log("Editing income", item)}
          onDelete={(item) => console.log("Deleting income", item)}
        />

        <div className={styles.grandTotal}>
          <div className={styles.grandTotalContent}>
            <h2>Total Monthly {config.name}</h2>
            <span className={styles.grandTotalAmount}>
              ${total.toLocaleString()}
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
