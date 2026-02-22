"use client";
import { useState } from "react";
import styles from "./card.module.scss";
import { Plus, Trash2 } from "lucide-react";

const cardCategories = [
  "Groceries",
  "Dining",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Shopping",
  "Healthcare",
  "Other",
];

type CardTransaction = {
  id: number;
  cardName: string;
  merchant: string;
  amount: number;
  category: string;
  date: string;
  description: string | undefined;
}

export default function CreditCard() {
  const [transactions, setTransactions] = useState<CardTransaction[]>([
    {
      id: 1,
      cardName: "Chase Sapphire",
      merchant: "Whole Foods",
      amount: 125.50,
      category: "Groceries",
      date: "2026-01-28",
      description: undefined
    },
    {
      id: 2,
      cardName: "Amex Gold",
      merchant: "Restaurant XYZ",
      amount: 85.00,
      category: "Dining",
      date: "2026-01-27",
      description: undefined
    },
  ]);

  const [formData, setFormData] = useState({
    cardName: "",
    merchant: "",
    amount: "",
    category: "Groceries",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.cardName || !formData.merchant || !formData.amount) {
      alert("Please fill in all required fields");
      return;
    }

    const newTransaction: CardTransaction = {
      id: Date.now(),
      cardName: formData.cardName,
      merchant: formData.merchant,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      description: formData.description,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setFormData({
      cardName: "",
      merchant: "",
      amount: "",
      category: "Groceries",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div>
      <section className={styles.cardContainer}>
        <div className={styles.header}>
          <h1>Card Transactions</h1>
          <p>Log and track your credit and debit card purchases</p>
        </div>

        <div className={styles.content}>
          {/* Add Transaction Form */}
          <div className={styles.formSection}>
            <h2>Log New Transaction</h2>
            <form onSubmit={handleAddTransaction} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="cardName">Card Name *</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="e.g., Chase Sapphire, Amex Gold"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="merchant">Merchant *</label>
                <input
                  type="text"
                  id="merchant"
                  name="merchant"
                  value={formData.merchant}
                  onChange={handleInputChange}
                  placeholder="Where did you make the purchase?"
                  required
                />
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label htmlFor="amount">Amount *</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {cardCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Description (Optional)</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Add any notes about this transaction"
                  rows={3}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <Plus size={18} />
                Add Transaction
              </button>
            </form>
          </div>

          {/* Transactions List */}
          <div className={styles.listSection}>
            <h2>Recent Transactions</h2>

            {transactions.length === 0 ? (
              <p className={styles.emptyState}>
                No transactions yet. Add one to get started!
              </p>
            ) : (
              <>
                <div className={styles.transactionsList}>
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className={styles.transactionItem}>
                      <div className={styles.transactionInfo}>
                        <div className={styles.transactionHeader}>
                          <h3>{transaction.merchant}</h3>
                          <span className={styles.category}>
                            {transaction.category}
                          </span>
                        </div>
                        <div className={styles.transactionDetails}>
                          <p className={styles.cardName}>{transaction.cardName}</p>
                          <p className={styles.date}>{transaction.date}</p>
                        </div>
                        {transaction.description && (
                          <p className={styles.description}>
                            {transaction.description}
                          </p>
                        )}
                      </div>
                      <div className={styles.transactionAmount}>
                        <span className={styles.amount}>
                          ${transaction.amount.toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleDeleteTransaction(transaction.id)}
                          className={styles.deleteBtn}
                          aria-label="Delete transaction"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.totalSection}>
                  <h3>Total Spent</h3>
                  <span className={styles.totalAmount}>
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
