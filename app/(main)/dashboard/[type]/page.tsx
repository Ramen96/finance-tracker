"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useApi } from "@/lib/api";
import DataTable from "@/components/DataTable/dataTable";
import {
  incomeCategories,
  expenseCategories,
  assetCategories,
  liabilityCategories,
} from "@/config/categories";
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
    categories: { name: string; items: unknown[] }[];
    total: number;
  } | null>(null);

  useEffect(() => {
    authFetch(`api/report/${reportType}`)
      .then(data => {
        setReportData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [reportType, authFetch]);

  if (loading) {
    return <Loading />;
  }

  const reportConfig = {
    income: { name: "Income", description: "Track and manage income sources", totalKey: "amount" },
    expenses: { name: "Expenses", description: "Track and manage your monthly expenses", totalKey: "amount" },
    assets: { name: "Assets", description: "Track your producing and growth assets", totalKey: "value" },
    liabilities: { name: "Liabilities", description: "Track your debts and monthly obligations", totalKey: "balance" },
  } as const;

  // Data Config
  const config = reportConfig[reportType];

  const categoryConfigs = {
    income: incomeCategories,
    expenses: expenseCategories,
    assets: assetCategories,
    liabilities: liabilityCategories,
  };

  // Merge frontend config (icon, column defs) with API data (actual items)
  const configCategories = categoryConfigs[reportType].map((category) => ({
    name: category.name,
    icon: category.icon,
    dataItemConfig: category.columns,
    items: reportData?.categories.find((c) => c.name === category.name)?.items ?? [],
  }));

  const configTotalKey = config.totalKey;

  const total =
    reportData?.categories
      .map((category) => category.items)
      .flat()
      .reduce((sum: number, item: any) => sum + (Number(item[config.totalKey]) || 0), 0) ?? 0;

  const onAdd = async (categoryName: string) => {
    setShowAddForm(categoryName);
  };

  const onAddSubmit = async (item: any) => {
    setIsItemLoading(true);
    try {
      console.log(await handleAPI("POST", "/api/items", item));
    } catch (error) {
      console.error("Failed to add item", error);
    } finally {
      setIsItemLoading(false);
      setShowAddForm(null);
    }
  };

  const onEdit = (item: any) => {
    setIsEdit(true);
    setShowAddForm(item.category);
  };

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
