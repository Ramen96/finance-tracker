"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "../card.module.scss";
import { Plus, Trash2, Settings, CreditCard as CardIcon } from "lucide-react";

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
};

// Mock tracked cards state to populate the form and the cards section
type TrackedCard = {
  id: string;
  name: string;
  network: string;
};

export default function CreditCard() {
  // Mocking global data state of cards a user already set up to track
  const [trackedCards] = useState<TrackedCard[]>([
    { id: "1", name: "Chase Sapphire", network: "Visa" },
    { id: "2", name: "Amex Gold", network: "Amex" },
  ]);

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

  // State to manage visibility of the transaction form UI
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    cardName: "",
    merchant: "",
    amount: "",
    category: "Groceries",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTransaction = (e: React.SubmitEvent) => {
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
      description: formData.description || undefined,
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
    setIsFormOpen(false); // Close form panel after success
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className={styles.contentContainer}>
      <section className={styles.cardContainer}>

        <div className={styles.header}>
          <h1>Card Transactions</h1>
          <p>Log and track your credit and debit card purchases</p>
        </div>

        <div className={styles.content}>

          {/* ================= SECTION 1: USER TRACKED CARDS ================= */}
          <div className={styles.cardsOverviewSection}>
            <div className={styles.sectionHeader}>
              <h2>Your Tracked Cards</h2>
              <Link href="/card/manage-cards" className={styles.manageCardsBtn}>
                <Settings size={16} />
                Edit Cards
              </Link>
            </div>

            <div className={styles.cardsGrid}>
              {trackedCards.map((card) => (
                <div key={card.id} className={styles.cardInfoTile}>
                  <CardIcon size={24} />
                  <div>
                    <h4>{card.name}</h4>
                    <p>{card.network}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= SECTION 2: ADD TRANSACTION ACTION & FORM ================= */}
          <div className={styles.actionSection}>
            <button
              onClick={() => setIsFormOpen((prev) => !prev)}
              className={styles.toggleFormBtn}
            >
              <Plus size={18} />
              {isFormOpen ? "Cancel New Transaction" : "Log New Transaction"}
            </button>

            {isFormOpen && (
              <div className={`${styles.formSection} ${styles.fadeIn}`}>
                <h2>Enter Transaction Details</h2>
                <form onSubmit={handleAddTransaction} className={styles.form}>

                  <div className={styles.formGroup}>
                    <label htmlFor="cardName">Select Card Used *</label>
                    <select
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Choose a Card --</option>
                      {trackedCards.map((card) => (
                        <option key={card.id} value={card.name}>
                          {card.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="merchant">Merchant *</label>
                    <input
                      type="text"
                      id="merchant"
                      name="merchant"
                      value={formData.merchant}
                      onChange={handleInputChange}
                      placeholder="e.g., Target, Starbucks"
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
                      placeholder="Add specific notes"
                      rows={2}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    Save Transaction
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* ================= SECTION 3: RECENT TRANSACTIONS ================= */}
          <div className={styles.listSection}>
            <h2>Recent Transactions</h2>

            {transactions.length === 0 ? (
              <p className={styles.emptyState}>
                No transactions tracked yet.
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
