"use client";
import styles from "./assets.module.scss";
import DataTable from "../DataTable/dataTable";
import { TrendingUp, LineChart } from "lucide-react";

interface ProducingAsset {
  id: number;
  name: string;
  value: number;
  income: number;
}

interface GrowthAsset {
  id: number;
  name: string;
  value: number;
  appreciation: number;
}

const producingAssets: ProducingAsset[] = [
  { id: 1, name: "Rental Property - Main St", value: 250000, income: 2500 },
  { id: 2, name: "Dividend Stocks Portfolio", value: 150000, income: 500 },
];

const growthAssets: GrowthAsset[] = [
  { id: 3, name: "Primary Residence", value: 400000, appreciation: 3.5 },
  { id: 4, name: "Growth Stock Portfolio", value: 75000, appreciation: 8.2 },
];

export default function Assets() {
  const producingColumns = [
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
      key: "income" as const,
      label: "Income",
      format: (value: string | number) => {
        const num = typeof value === "number" ? value : Number(value || 0);
        return `$${num.toLocaleString()}`;
      },
    },
  ];

  const growthColumns = [
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
      key: "appreciation" as const,
      label: "Rate",
      format: (value: string | number) => {
        const num = typeof value === "number" ? value : Number(value || 0);
        return `${num}%`;
      },
    },
  ];

  const producingCategories = [
    {
      name: "Producing Assets",
      icon: TrendingUp,
      items: producingAssets,
    },
  ];

  const growthCategories = [
    {
      name: "Growth Assets",
      icon: LineChart,
      items: growthAssets,
    },
  ];

  const totalAssetValue = [...producingAssets, ...growthAssets].reduce(
    (sum, asset) => sum + asset.value,
    0
  );

  return (
    <section className={styles.assetsContainer}>
      <div className={styles.header}>
        <h1>Assets</h1>
        <p>Track your producing and growth assets</p>
      </div>

      <DataTable
        categories={producingCategories}
        columns={producingColumns}
        totalKey="value"
        onAdd={(cat) => console.log("Adding producing asset to", cat)}
        onEdit={(item) => console.log("Editing producing asset", item)}
        onDelete={(item) => console.log("Deleting producing asset", item)}
      />

      <DataTable
        categories={growthCategories}
        columns={growthColumns}
        totalKey="value"
        onAdd={(cat) => console.log("Adding growth asset to", cat)}
        onEdit={(item) => console.log("Editing growth asset", item)}
        onDelete={(item) => console.log("Deleting growth asset", item)}
      />

      <div className={styles.grandTotal}>
        <div className={styles.grandTotalContent}>
          <h2>Total Asset Value</h2>
          <span className={styles.grandTotalAmount}>
            ${totalAssetValue.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
}
