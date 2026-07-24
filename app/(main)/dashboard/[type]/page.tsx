"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useApi } from "@/lib/api";
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
import styles from "./reports.module.scss";

type ReportType = "income" | "expenses" | "assets" | "liabilities";

export default function Report() {
  const params = useParams();
  const { authFetch } = useApi();
  const reportType = (params?.type as ReportType) || "income";

  const [loading, setLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isItemLoading, setIsItemLoading] = useState(false);

  const [reportData, setReportData] = useState<{
    categories: { name: string, items: unknown[] }[];
    total: number;
  } | null>(null);

  // API init
  useEffect(() => {
    authFetch(`api/report/${reportType}`)
      .then(data => {
        setReportData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [reportType, authFetch]);


  if (loading) {
    return (
      <Loading />
    );
  }

  const formatCategories = (categories: any[], itemsObject: any) => {
    return categories.map((category) => ({
      name: category.name,
      icon: category.icon,
      items: itemsObject[category.name] || [],
      dataItemConfig: category.columns || [],
    }));
  };

  const reportConfig = {
    income: { name: "Income", description: "Track and manage income sources", totalKey: "amount" },
    expenses: { name: "Expenses", description: "Track and manage your monthly expenses", totalKey: "amount" },
    assets: { name: "Assets", description: "Track your producing and growth assets", totalKey: "value" },
    liabilities: { name: "Liabilities", description: "Track your debts and monthly obligations", totalKey: "balance" },
  } as const;

  // Data Config
  const config = reportConfig[reportType];

  const configCategories = config.categories;
  const configTotalKey = config.totalKey;

  const total = config.categories
    .map(category => category.items)
    .flat()
    .reduce((sum, item) => sum + (Number(item[config.totalKey]) || 0), 0);

  // Data manipulation
  const handleAPI = async (method: "POST" | "PUT" | "DELETE", endpoint: string, data?: any) => {
    // Simulate for now
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockData = {
          status: 200,
          message: "Successfully retrived mock data"
        };
        resolve(mockData);
      }, 500);
    })
  }

  const onAdd = async (categoryName: string) => {
    setShowAddForm(categoryName);
  }

  const onAddSubmit = async (item: any) => {
    try {
      console.log(await handleAPI("POST", "/api/items", item));
    } catch (error) {
      console.error("Simulated error", error);
    }
    setShowAddForm(null);
  }

  const onEdit = (item: any) => {
    setIsEdit(true);
  }

  const onEditSubmit = async (item: any) => {
    try {
      console.log(await handleAPI("PUT", `/api/items/${item.id}`));
    } catch (error) {
      console.error("Simulated error", error);
    }
  }

  const onDelete = async (item: any) => {
    try {
      console.log(await handleAPI("DELETE", `/api/items/${item.id}`));
    } catch (error) {
      console.error("Simulated error", error);
    }
  }

  return (
    <div className={styles.contentContainer}>
      <section className={styles.incomeContainer}>
        <div className={styles.header}>
          <h1>{config.name}</h1>
          <p>{config.description}</p>
        </div>

        <DataTable
          categories={configCategories}
          totalKey={configTotalKey}
          onAdd={onAdd}
          onEdit={(item) => onEdit(item)}
          onDelete={(item) => onDelete(item)}
          showAddForm={showAddForm}
          onCancel={() => setShowAddForm(null)}
          isEdit={isEdit}
          isItemLoading={isItemLoading}
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
  );
}
