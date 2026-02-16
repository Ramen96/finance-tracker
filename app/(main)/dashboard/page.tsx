"use client";
import Loading from "@/components/Loading/loading";
import { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import Audit from "@/components/Audit/audit";

// PLACEHOLDER DATA
const placeholderData = [
  {
    id: 1,
    name: "Income",
    amount: 1293109,
    change: 12.5,
    icon: "💰",
    type: "income" as const,
  },
  {
    id: 2,
    name: "Expenses",
    amount: 1231,
    change: -5.2,
    icon: "💸",
    type: "expenses" as const,
  },
  {
    id: 3,
    name: "Assets",
    amount: 400023,
    change: 8.3,
    icon: "📈",
    type: "assets" as const,
  },
  {
    id: 4,
    name: "Liabilities",
    amount: 30203,
    change: -2.1,
    icon: "📊",
    type: "liabilities" as const,
  },
];

interface DataType {
  id: number;
  name: string;
  amount: number;
  change: number;
  icon: string;
  type: "income" | "expenses" | "assets" | "liabilities";
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataType[]>([]);

  // Simulate API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(placeholderData);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatChange = (change: number): string => {
    return `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="content" className={styles.contentContainer}>
      {data.map((element) => (
        <div
          key={element.id}
          className={`${styles.overviewCard} ${styles[element.type]}`}
        >
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>{element.name}</span>
            <span className={`${styles.cardIcon} ${styles[element.type]}`}>
              {element.icon}
            </span>
          </div>

          <div className={styles.cardContent}>
            <div
              className={`${styles.cardAmount} ${element.type === "income" || element.type === "assets"
                  ? styles.positive
                  : ""
                } ${element.type === "expenses" ? styles.negative : ""}`}
            >
              {formatCurrency(element.amount)}
            </div>

            <div
              className={`${styles.cardChange} ${element.change > 0 ? styles.up : styles.down
                }`}
            >
              <span className={styles.arrow}>
                {element.change > 0 ? "↑" : "↓"}
              </span>
              <span>{formatChange(element.change)}</span>
              <span>vs last month</span>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.auditSection}>
        <Audit />
      </div>
    </div>
  );
}
