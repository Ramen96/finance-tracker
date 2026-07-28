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

  const config = reportConfig[reportType];

  const categoryConfigs = {
    income: incomeCategories,
    expenses: expenseCategories,
    assets: assetCategories,
    liabilities: liabilityCategories,
  };

  interface ReportItem {
    id: number | string;
    [key: string]: unknown;
  }

  const configCategories: {
    name: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    dataItemConfig: { key: keyof ReportItem; label: string; className?: string; inputType?: "text" | "number" | null; format: (value: any) => string | number }[];
    items: ReportItem[];
  }[] = categoryConfigs[reportType].map((category) => ({
    name: category.name,
    icon: category.icon,
    dataItemConfig: category.columns as any,
    items: (reportData?.categories.find((c) => c.name === category.name)?.items ?? []) as ReportItem[],
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
      const created = await authFetch(`api/report/${reportType}/items`, {
        method: "POST",
        body: JSON.stringify(item),
      });
      setReportData((prev) =>
        prev
          ? {
            ...prev,
            categories: prev.categories.map((c) =>
              c.name === item.category ? { ...c, items: [...c.items, created] } : c
            ),
          }
          : prev
      );
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
    setIsItemLoading(true);
    try {
      const updated = await authFetch(`api/report/items/${item.id}`, {
        method: "PUT",
        body: JSON.stringify(item),
      });
      setReportData((prev) =>
        prev
          ? {
            ...prev,
            categories: prev.categories.map((c) => ({
              ...c,
              items: c.items.map((i: any) => (i.id === item.id ? updated : i)),
            })),
          }
          : prev
      );
    } catch (error) {
      console.error("Failed to update item", error);
    } finally {
      setIsItemLoading(false);
      setIsEdit(false);
    }
  };

  const onDelete = async (item: any) => {
    try {
      await authFetch(`api/report/items/${item.id}`, { method: "DELETE" });
      setReportData((prev) =>
        prev
          ? {
            ...prev,
            categories: prev.categories.map((c) => ({
              ...c,
              items: c.items.filter((i: any) => i.id !== item.id),
            })),
          }
          : prev
      );
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

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
          onEdit={onEdit}
          onDelete={onDelete}
          showAddForm={showAddForm}
          onCancel={() => setShowAddForm(null)}
          isEdit={isEdit}
          isItemLoading={isItemLoading}
        />

        <div className={styles.grandTotal}>
          <div className={styles.grandTotalContent}>
            <h2>Total Monthly {config.name}</h2>
            <span className={styles.grandTotalAmount}>${total.toLocaleString()}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
