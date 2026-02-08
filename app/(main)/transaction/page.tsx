"use client";
import { useState, useMemo } from "react";
import styles from "./transaction.module.scss";
import { CreditCard, Calendar, Tag, CheckCircle, Circle } from "lucide-react";

type Transaction = {
  id: number;
  merchant: string,
  amount: number,
  date: string,
  category: string,
  cardName: string,
  paid: boolean,
}

interface GroupedTransactions {
  [key: string]: Transaction[];
}

export default function Transactions() {
  const [filter, setFilter] = useState<"all" | "paid" | "unpaid">("all");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      merchant: "Amazon",
      amount: 156.32,
      date: "2026-01-30",
      category: "Shopping",
      cardName: "Chase Sapphire Reserve",
      paid: false,
    },
    {
      id: 2,
      merchant: "Whole Foods",
      amount: 87.45,
      date: "2026-01-29",
      category: "Groceries",
      cardName: "Amex Gold",
      paid: false,
    },
    {
      id: 3,
      merchant: "Shell Gas Station",
      amount: 52.00,
      date: "2026-01-15",
      category: "Transportation",
      cardName: "Chase Sapphire Reserve",
      paid: true,
    },
    {
      id: 4,
      merchant: "Netflix",
      amount: 15.49,
      date: "2026-01-14",
      category: "Entertainment",
      cardName: "Chase Freedom",
      paid: true,
    },
    {
      id: 5,
      merchant: "Starbucks",
      amount: 6.75,
      date: "2025-12-27",
      category: "Dining",
      cardName: "Amex Gold",
      paid: true,
    },
    {
      id: 6,
      merchant: "Target",
      amount: 124.89,
      date: "2025-12-26",
      category: "Shopping",
      cardName: "Chase Freedom",
      paid: false,
    },
    {
      id: 7,
      merchant: "Uber",
      amount: 23.50,
      date: "2025-12-25",
      category: "Transportation",
      cardName: "Chase Sapphire Reserve",
      paid: true,
    },
    {
      id: 8,
      merchant: "Chipotle",
      amount: 12.85,
      date: "2025-11-25",
      category: "Dining",
      cardName: "Amex Gold",
      paid: false,
    },
    {
      id: 9,
      merchant: "Apple Store",
      amount: 299.00,
      date: "2025-11-24",
      category: "Shopping",
      cardName: "Chase Sapphire Reserve",
      paid: false,
    },
    {
      id: 10,
      merchant: "CVS Pharmacy",
      amount: 34.56,
      date: "2025-11-23",
      category: "Healthcare",
      cardName: "Chase Freedom",
      paid: true,
    },
  ]);

  const filteredTransactions = useMemo(() => {
    if (filter === "paid") return transactions.filter((t) => t.paid);
    if (filter === "unpaid") return transactions.filter((t) => !t.paid);
    return transactions;
  }, [transactions, filter]);

  const groupedByMonth = useMemo(() => {
    const groups: GroupedTransactions = {};
    filteredTransactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthKey = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(transaction);
    });
    return groups;
  }, [filteredTransactions]);

  const unpaidTransactions = transactions.filter((t) => !t.paid);
  const totalUnpaid = unpaidTransactions.reduce((sum, t) => sum + t.amount, 0);

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleMarkAsPaid = () => {
    if (selectedIds.length === 0) return;
    setTransactions((prev) =>
      prev.map((t) => (selectedIds.includes(t.id) ? { ...t, paid: true } : t))
    );
    setSelectedIds([]);
  };

  const handleMarkAllAsPaid = () => {
    setTransactions((prev) => prev.map((t) => ({ ...t, paid: true })));
    setSelectedIds([]);
  };

  return (
    <section className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <h1>Transaction History</h1>
          <p>Track and manage your card transactions</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.filters}>
            <button
              className={`${styles.filterBtn} ${filter === "all" ? styles.active : ""
                }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`${styles.filterBtn} ${filter === "unpaid" ? styles.active : ""
                }`}
              onClick={() => setFilter("unpaid")}
            >
              Unpaid
            </button>
            <button
              className={`${styles.filterBtn} ${filter === "paid" ? styles.active : ""
                }`}
              onClick={() => setFilter("paid")}
            >
              Paid
            </button>
          </div>

          <div className={styles.actions}>
            {selectedIds.length > 0 && (
              <button className={styles.markSelectedBtn} onClick={handleMarkAsPaid}>
                Mark Selected as Paid ({selectedIds.length})
              </button>
            )}
            {unpaidTransactions.length > 0 && (
              <button className={styles.markAllBtn} onClick={handleMarkAllAsPaid}>
                Mark All as Paid
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.transactionsGroups}>
        {Object.entries(groupedByMonth).map(([month, monthTransactions]) => {
          const monthTotal = monthTransactions.reduce((sum, t) => sum + t.amount, 0);

          return (
            <div key={month} className={styles.monthGroup}>
              <h2 className={styles.monthHeader}>{month}</h2>
              <div className={styles.transactionsList}>
                {monthTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className={`${styles.transactionCard} ${!transaction.paid && selectedIds.includes(transaction.id)
                      ? styles.selected
                      : ""
                      }`}
                    onClick={() =>
                      !transaction.paid && handleToggleSelect(transaction.id)
                    }
                  >
                    {!transaction.paid && (
                      <div className={styles.checkbox}>
                        {selectedIds.includes(transaction.id) ? (
                          <CheckCircle size={20} />
                        ) : (
                          <Circle size={20} />
                        )}
                      </div>
                    )}

                    <div className={styles.mainInfo}>
                      <div className={styles.merchantRow}>
                        <h3>{transaction.merchant}</h3>
                        <span
                          className={`${styles.status} ${transaction.paid ? styles.paid : styles.unpaid
                            }`}
                        >
                          {transaction.paid ? "Paid" : "Unpaid"}
                        </span>
                      </div>

                      <div className={styles.details}>
                        <div className={styles.detail}>
                          <CreditCard size={16} />
                          <span>{transaction.cardName}</span>
                        </div>
                        <div className={styles.detail}>
                          <Calendar size={16} />
                          <span>{transaction.date}</span>
                        </div>
                        <div className={styles.detail}>
                          <Tag size={16} />
                          <span>{transaction.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.amount}>
                      ${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.monthTotal}>
                <span>Month Total</span>
                <span className={styles.monthTotalAmount}>
                  ${monthTotal.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {unpaidTransactions.length > 0 && (
        <div className={styles.totalBar}>
          <h2>Total Unpaid</h2>
          <span className={styles.totalAmount}>${totalUnpaid.toFixed(2)}</span>
        </div>
      )}
    </section>
  );
}
