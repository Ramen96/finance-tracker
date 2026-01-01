"use client";
import styles from "./assets.module.scss";
import DataTable from "../DataTable/dataTable";
import { TrendingUp, LineChart } from "lucide-react";

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

export default function Assets() {
  const columns = [
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

  const allCategories = [
    {
      name: "Producing Assets",
      icon: TrendingUp,
      items: producingAssets,
    },
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
        categories={allCategories}
        columns={columns}
        totalKey="value"
        onAdd={(cat) => console.log("Adding asset to", cat)}
        onEdit={(item) => console.log("Editing asset", item)}
        onDelete={(item) => console.log("Deleting asset", item)}
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