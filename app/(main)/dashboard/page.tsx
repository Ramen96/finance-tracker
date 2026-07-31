"use client";
import Loading from "@/components/Loading/loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/api";
import { LucideIcon } from "lucide-react";
import {
  AlignHorizontalDistributeCenter,
  ChartSpline,
  CircleDollarSign,
  BanknoteArrowDown,
} from "lucide-react";
import styles from "./Dashboard.module.scss";
import Audit from "@/components/Audit/audit";

interface DataType {
  id: number;
  name: string;
  amount: number;
  change: number;
  icon: LucideIcon;
  type: "income" | "expenses" | "assets" | "liabilities";
}

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataType[]>([]);
  const { authFetch } = useApi();

  // Initialize API call
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await authFetch("api/dashboard");
        const dashboardConfig = [
          { id: 1, name: "Income", icon: CircleDollarSign, type: "income" as const },
          { id: 2, name: "Expenses", icon: BanknoteArrowDown, type: "expenses" as const },
          { id: 3, name: "Assets", icon: ChartSpline, type: "assets" as const },
          { id: 4, name: "Liabilities", icon: AlignHorizontalDistributeCenter, type: "liabilities" as const },
        ];
        const apiData = dashboardConfig.map(item => ({
          ...item,
          amount: response[item.type + "Total"] ?? 0,
          change: 0
        }))
        setData(apiData);
      } catch (err) {
        console.error("Error: ", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboard();
  }, [authFetch]);

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

  // Log-scale bar: normalises each card so even small values show a meaningful bar.
  const logMax = Math.log(Math.max(...data.map((d) => d.amount)));
  const getBarWidth = (amount: number): number => {
    const pct = (Math.log(amount) / logMax) * 100;
    return Math.round(Math.max(15, pct));
  };

  const currentMonth = new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  if (isLoading) return <Loading />;

  return (
    <div id="content" className={styles.contentContainer}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <p className={styles.headerSub}>Overview · {currentMonth}</p>
      </div>

      <div className={styles.sectionsContainer}>
        {data.map((element) => {
          const ElementIcon = element.icon;
          const isPositiveType =
            element.type === "income" || element.type === "assets";
          const isNegativeType = element.type === "expenses";

          return (
            <div
              key={element.id}
              className={`${styles.overviewCard} ${styles[element.type]}`}
              onClick={() => router.push(`/dashboard/${element.type}`)}
            >
              {/* Header: label + icon */}
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>{element.name}</span>
                <span className={`${styles.cardIcon} ${styles[element.type]}`}>
                  <ElementIcon size={18} />
                </span>
              </div>

              {/* Amount */}
              <div
                className={`${styles.cardAmount} ${isPositiveType ? styles.positive : ""
                  } ${isNegativeType ? styles.negative : ""}`}
              >
                {formatCurrency(element.amount)}
              </div>

              {/* Bottom row: delta + progress bar */}
              <div className={styles.cardFooter}>
                <div
                  className={`${styles.cardChange} ${element.change > 0 ? styles.up : styles.down
                    }`}
                >
                  <span className={styles.arrow}>
                    {element.change > 0 ? "↑" : "↓"}
                  </span>
                  <span>{formatChange(element.change)}</span>
                  <span className={styles.vsText}>vs last month</span>
                </div>

                <div className={styles.miniBarTrack}>
                  <div
                    className={`${styles.miniBarFill} ${styles[element.type]}`}
                    style={{ width: `${getBarWidth(element.amount)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.auditSection}>
        <Audit />
      </div>
    </div>
  );
}
