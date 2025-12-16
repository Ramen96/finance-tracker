import styles from "./income.module.scss";

export default function Income() {
  return (
    <div id="incomeContainer" className={`${styles.incomeContainer}`}>
      <h1 className="w-full text-center">Income</h1>
      <div className={styles.labelRow}>
        <span className="text-center">Description</span>
        <span className="text-center">Cash Flow</span>
      </div>
      <div className={styles.labelRowSecondary}>
        <span className="text-center">Salary</span>
        <span className="text-center">$$$$$$$</span>
      </div>
    </div>
  );
}