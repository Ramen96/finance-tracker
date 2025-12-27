import styles from "./assets.module.scss";
import { TrendingUp, LineChart, Edit2, Trash2, Plus } from "lucide-react";

const producingAssets = [
  { id: 1, name: "Rental Property - Main St", value: 250000, income: 2500 },
  { id: 2, name: "Dividend Stocks Portfolio", value: 150000, income: 500 },
];

const growthAssets = [
  { id: 3, name: "Primary Residence", value: 400000, appreciation: 3.5 },
  { id: 4, name: "Growth Stock Portfolio", value: 75000, appreciation: 8.2 },
];

export default function Assets() {
  return (
    <section className={styles.assetsContainer}>
      <div className={styles.header}>
        <h1>Assets</h1>
        <p>Track your producing and growth assets</p>
      </div>

      <section className={styles.categoriesGrid}>
        {/* Producing Assets */}
        <section className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <TrendingUp className={styles.categoryIcon} size={24} />
            <h2>Producing Assets</h2>
          </div>

          <button className={styles.addBtn}>
            <Plus size={18} />
            Add Producing Asset
          </button>

          <div className={styles.assetsTable}>
            <div className={styles.tableHeader}>
              <span className={styles.nameCol}>Asset Name</span>
              <span className={styles.valueCol}>Value</span>
              <span className={styles.incomeCol}>Income</span>
              <span className={styles.actionsCol}>Actions</span>
            </div>

            <div className={styles.tableBody}>
              {producingAssets.map((asset) => (
                <div key={asset.id} className={styles.tableRow}>
                  <span className={styles.nameCol}>{asset.name}</span>
                  <span className={styles.valueCol}>
                    ${asset.value.toLocaleString()}
                  </span>
                  <span className={styles.incomeCol}>
                    ${asset.income.toLocaleString()}
                  </span>
                  <span className={styles.actionsCol}>
                    <button className={styles.editBtn}>
                      <Edit2 size={16} />
                    </button>
                    <button className={styles.deleteBtn}>
                      <Trash2 size={16} />
                    </button>
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.categoryTotal}>
              <span className={styles.totalLabel}>Category Total:</span>
              <span className={styles.totalAmount}>
                $
                {producingAssets
                  .reduce((sum, asset) => sum + asset.value, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>
        </section>

        {/* Growth Assets */}
        <section className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <LineChart className={styles.categoryIcon} size={24} />
            <h2>Growth Assets</h2>
          </div>

          <button className={styles.addBtn}>
            <Plus size={18} />
            Add Growth Asset
          </button>

          <div className={styles.assetsTable}>
            <div className={styles.tableHeader}>
              <span className={styles.nameCol}>Asset Name</span>
              <span className={styles.valueCol}>Value</span>
              <span className={styles.growthCol}>Rate</span>
              <span className={styles.actionsCol}>Actions</span>
            </div>

            <div className={styles.tableBody}>
              {growthAssets.map((asset) => (
                <div key={asset.id} className={styles.tableRow}>
                  <span className={styles.nameCol}>{asset.name}</span>
                  <span className={styles.valueCol}>
                    ${asset.value.toLocaleString()}
                  </span>
                  <span className={styles.growthCol}>
                    {asset.appreciation}%
                  </span>
                  <span className={styles.actionsCol}>
                    <button className={styles.editBtn}>
                      <Edit2 size={16} />
                    </button>
                    <button className={styles.deleteBtn}>
                      <Trash2 size={16} />
                    </button>
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.categoryTotal}>
              <span className={styles.totalLabel}>Category Total:</span>
              <span className={styles.totalAmount}>
                $
                {growthAssets
                  .reduce((sum, asset) => sum + asset.value, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>
        </section>
      </section>

      {/* Grand Total */}
      <div className={styles.grandTotal}>
        <div className={styles.grandTotalContent}>
          <h2>Total Asset Value</h2>
          <span className={styles.grandTotalAmount}>
            $
            {[...producingAssets, ...growthAssets]
              .reduce((sum, asset) => sum + asset.value, 0)
              .toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
}