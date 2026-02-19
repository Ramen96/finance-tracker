import { Fragment } from "react";
import styles from "./audit.module.scss";
import { Briefcase, TrendingUp, ShoppingCart, LucideIcon } from "lucide-react";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

interface LineItem {
  icon: LucideIcon;
  label: string;
  amount: number;
}

interface Block {
  tag: string;
  items: LineItem[];
}

export default function Audit() {
  const salary = 0.00;
  const passiveIncome = 0.00;
  const totalExpenses = 0.00;

  const blocks: Block[] = [
    {
      tag: "Income",
      items: [
        { icon: Briefcase, label: "Salary", amount: salary },
        { icon: TrendingUp, label: "Passive Income", amount: passiveIncome },
      ],
    },
    {
      tag: "Expenses",
      items: [
        { icon: ShoppingCart, label: "Total Expenses", amount: totalExpenses },
      ],
    },
  ];

  const totalIncome = blocks[0].items.reduce((s, i) => s + i.amount, 0);
  const cashFlow = totalIncome - totalExpenses;
  const isPositive = cashFlow >= 0;

  return (
    <section className={styles.auditContainer}>
      <div className={styles.header}>
        <h1>Cash Flow</h1>
        <p>Monthly breakdown</p>
      </div>

      {blocks.map((block, bi) => (
        <Fragment key={block.tag}>
          {bi > 0 && (
            <div className={styles.operator}>
              <span className={styles.operatorSymbol}>−</span>
              <span className={styles.operatorLine} />
            </div>
          )}

          <div className={styles.block}>
            <span className={styles.blockTag}>{block.tag}</span>
            <div className={styles.blockItems}>
              {block.items.map(({ icon: Icon, label, amount }) => (
                <div key={label} className={styles.item}>
                  <Icon size={13} />
                  <span>{label}</span>
                  <span className={styles.itemAmount}>{fmt(amount)}</span>
                </div>
              ))}
            </div>
            <div className={styles.blockTotal}>
              <span>Total</span>
              <span>{fmt(block.items.reduce((s, i) => s + i.amount, 0))}</span>
            </div>
          </div>
        </Fragment>
      ))}

      <div className={`${styles.result} ${isPositive ? styles.positive : styles.negative}`}>
        <span className={styles.resultLabel}>Monthly Cash Flow</span>
        <span className={styles.resultAmount}>{fmt(cashFlow)}</span>
      </div>
    </section>
  );
}
