"use client";
import { useEffect, useState } from "react";
import { useApi } from "@/lib/api";
import styles from "../card.module.scss";
import { Plus, Trash2, Settings, CreditCard as CardIcon } from "lucide-react";
import Loading from "@/components/Loading/loading";
import ManageCards from "@/components/ManageCards/manageCards";
import { TransactionType, accountTypeLabels } from "@/lib/types/enums";

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
  id: string;
  accountId: string;
  amount: number;
  category: string;
  type: number;
  date: string;
  description: string;
};

type Account = {
  id: string;
  name: string;
  type: number;
  balance: number;
};

export default function CreditCard() {
  const { authFetch } = useApi();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<CardTransaction[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [accountsData, transactionsData] = await Promise.all([
          authFetch("api/accounts"),
          authFetch("api/transactions"),
        ]);
        setAccounts(accountsData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsPageLoading(false);
      }
    }
    fetchData();
  }, [authFetch]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showManageCards, setShowManageCards] = useState(false);

  const [formData, setFormData] = useState({
    accountId: "",
    description: "",
    amount: "",
    category: "Groceries",
    date: new Date().toISOString().split("T")[0],
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

  const handleAddTransaction = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!formData.accountId || !formData.description || !formData.amount) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const created = await authFetch("api/transactions", {
        method: "POST",
        body: JSON.stringify({
          accountId: formData.accountId,
          amount: parseFloat(formData.amount),
          description: formData.description,
          category: formData.category,
          type: TransactionType.Expense,
          date: new Date(formData.date).toISOString(),
        }),
      });

      setTransactions((prev) => [created, ...prev]);
      setFormData({
        accountId: "",
        description: "",
        amount: "",
        category: "Groceries",
        date: new Date().toISOString().split("T")[0],
      });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to add transaction: ", error);
      alert("Failed to save transaction");
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await authFetch(`api/transactions/${id}`, { method: "DELETE" });
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete transaction: ", error);
      alert("Failed to delete transaction");
    }
  };

  const getAccountName = (accountId: string): string =>
    accounts.find((a) => a.id === accountId)?.name ?? "Unknown Account";

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  if (isPageLoading) {
    return <Loading />;
  }

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
              <button
                onClick={() => setShowManageCards(true)}
                className={styles.manageCardsBtn}
              >
                <Settings size={16} />
                Edit Cards
              </button>
            </div>

            {accounts.length === 0 ? (
              <p className={styles.emptyState}>
                No cards tracked yet. Add one in Manage Cards.
              </p>
            ) : (
              <div className={styles.cardsGrid}>
                {accounts.map((account) => (
                  <div key={account.id} className={styles.cardInfoTile}>
                    <CardIcon size={24} />
                    <div>
                      <h4>{account.name}</h4>
                      <p>{accountTypeLabels[account.type] ?? "Unknown"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                    <label htmlFor="accountId">Select Card Used *</label>
                    <select
                      id="accountId"
                      name="accountId"
                      value={formData.accountId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Choose a Card --</option>
                      {accounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="description">Description *</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={formData.description}
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
                          <h3>{transaction.description}</h3>
                          <span className={styles.category}>
                            {transaction.category}
                          </span>
                        </div>
                        <div className={styles.transactionDetails}>
                          <p className={styles.accountId}>
                            {getAccountName(transaction.accountId)}
                          </p>
                          <p className={styles.date}>{transaction.date}</p>
                        </div>
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

      <ManageCards
        isOpen={showManageCards}
        onClose={() => setShowManageCards(false)}
        accounts={accounts}
        onAccountsChange={setAccounts}
      />
    </div>
  );
}
