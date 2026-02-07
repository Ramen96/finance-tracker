"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TrendingUp, TrendingDown, PieChart, FileText, ShieldCheck } from "lucide-react";
import styles from "./reports.module.scss";

type ReportType = "income" | "expenses" | "assets" | "liabilities" | "audit";

interface ReportData {
  id: number;
  title: string;
  amount: number;
  date: string;
  category: string;
  description?: string;
}

const PLACEHOLDER_DATA: Record<ReportType, ReportData[]> = {
  income: [
    { id: 1, title: "Salary", amount: 5000, date: "2026-01-31", category: "Employment" },
    { id: 2, title: "Freelance Project", amount: 1200, date: "2026-01-15", category: "Freelance" },
  ],
  expenses: [
    { id: 1, title: "Rent", amount: 1500, date: "2026-01-01", category: "Housing" },
    { id: 2, title: "Groceries", amount: 450, date: "2026-01-15", category: "Food" },
  ],
  assets: [
    { id: 1, title: "Savings Account", amount: 15000, date: "2026-01-31", category: "Cash" },
    { id: 2, title: "Investment Portfolio", amount: 25000, date: "2026-01-31", category: "Stocks" },
  ],
  liabilities: [
    { id: 1, title: "Credit Card", amount: 2500, date: "2026-01-31", category: "Debt" },
    { id: 2, title: "Student Loan", amount: 18000, date: "2026-01-31", category: "Debt" },
  ],
  audit: [
    { id: 1, title: "January Review", amount: 0, date: "2026-01-31", category: "Monthly" },
  ],
};

const REPORT_CONFIG: Record<ReportType, {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}> = {
  income: {
    title: "Income",
    description: "Track your earnings and revenue streams",
    icon: <TrendingUp size={24} />,
    color: "success",
  },
  expenses: {
    title: "Expenses",
    description: "Monitor your spending and outflows",
    icon: <TrendingDown size={24} />,
    color: "danger",
  },
  assets: {
    title: "Assets",
    description: "Manage your valuable possessions and investments",
    icon: <PieChart size={24} />,
    color: "primary",
  },
  liabilities: {
    title: "Liabilities",
    description: "Track debts and financial obligations",
    icon: <FileText size={24} />,
    color: "warning",
  },
  audit: {
    title: "Audit",
    description: "Review and verify your financial records",
    icon: <ShieldCheck size={24} />,
    color: "info",
  },
};

export default function Report() {
  const params = useParams();
  const reportType = (params?.type as ReportType) || "income";

  const [data, setData] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // simulate api call for now
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      setTimeout(() => {
        const validTypes: ReportType[] = ["income", "expenses", "assets", "liabilities", "audit"];
        if (validTypes.includes(reportType)) {
          setData(PLACEHOLDER_DATA[reportType]);
        } else {
          setData([]);
        }
        setLoading(false);
      }, 500);
    }

    fetchData();
  }, [reportType]);

  const config = REPORT_CONFIG[reportType];
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  if (loading) {
    return (
      <section className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </section>
    )
  }

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={`${styles.icon} ${styles[config.color]}`}>
            {config.icon}
          </div>
          <div>
            <h1>{config.title}</h1>
            <p>{config.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {data.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No {reportType} records found</p>
          </div>
        ) : (
          <>
            <div className={styles.itemsList}>
              {data.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <h3>{item.title}</h3>
                    <div className={styles.itemMeta}>
                      <span className={styles.category}>{item.category}</span>
                      <span className={styles.date}>{item.date}</span>
                    </div>
                    {item.description && (
                      <p className={styles.description}>{item.description}</p>
                    )}
                  </div>
                  <div className={`${styles.amount} ${styles[config.color]}`}>
                    ${item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className={`${styles.totalBar} ${styles[config.color]}`}>
              <h2>Total {config.title}</h2>
              <span className={styles.totalAmount}>
                ${total.toLocaleString()}
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
