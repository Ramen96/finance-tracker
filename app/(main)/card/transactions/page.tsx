"use client";
import { useEffect, useState } from "react";
import { useApi } from "@/lib/api";
import styles from "../card.module.scss";
import {
  Plus,
  Trash2,
  Settings,
  CreditCard as CardIcon,
  X,
  Loader2,
  Receipt,
  CalendarDays,
  ShoppingCart,
  UtensilsCrossed,
  Car,
  Clapperboard,
  Zap,
  ShoppingBag,
  HeartPulse,
  Tag,
  type LucideIcon,
} from "lucide-react";
import Loading from "@/components/Loading/loading";
import ManageCards from "@/components/ManageCards/manageCards";
import { TransactionType, accountTypeLabels } from "@/lib/types/enums";

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatCurrency = (amount: number): string =>
  amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

const sortByDateDesc = (list: CardTransaction[]): CardTransaction[] =>
  [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

const categoryIcons: Record<string, LucideIcon> = {
  Groceries: ShoppingCart,
  Dining: UtensilsCrossed,
  Transportation: Car,
  Entertainment: Clapperboard,
  Utilities: Zap,
  Shopping: ShoppingBag,
  Healthcare: HeartPulse,
  Other: Tag,
};

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
  const [error, setError] = useState<{ message: string; retryable: boolean } | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [accountsData, transactionsData] = await Promise.all([
          authFetch("api/accounts"),
          authFetch("api/transactions"),
        ]);
        setAccounts(accountsData);
        setTransactions(sortByDateDesc(transactionsData));
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError({
          message: "Couldn't load your cards and transactions.",
          retryable: true,
        });
      } finally {
        setIsPageLoading(false);
      }
    }
    fetchData();
  }, [authFetch, refreshToken]);

  const handleRetry = () => {
    setIsPageLoading(true);
    setError(null);
    setRefreshToken((prev) => prev + 1);
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
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

  const handleSelectAccount = (accountId: string) => {
    setFormData((prev) => ({ ...prev, accountId }));
  };

  const handleSelectCategory = (category: string) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleAddTransaction = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!formData.accountId) {
      setError({ message: "Please select which card you used.", retryable: false });
      return;
    }

    setIsSubmitting(true);
    setError(null);
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

      setTransactions((prev) => sortByDateDesc([created, ...prev]));
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
      setError({ message: "Couldn't save that transaction. Please try again.", retryable: false });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    setDeletingId(id);
    setError(null);
    try {
      await authFetch(`api/transactions/${id}`, { method: "DELETE" });
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete transaction: ", error);
      setError({ message: "Couldn't delete that transaction. Please try again.", retryable: false });
    } finally {
      setDeletingId(null);
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

          {error && (
            <div className={styles.errorBanner} role="alert">
              <span>{error.message}</span>
              <div className={styles.errorActions}>
                {error.retryable && (
                  <button onClick={handleRetry} className={styles.retryBtn}>
                    Retry
                  </button>
                )}
                <button onClick={() => setError(null)} aria-label="Dismiss error">
                  <X size={14} />
                </button>
              </div>
            </div>
          )}

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

            {isFormOpen === false && transactions.length > 0 && (
              <button
                onClick={() => setIsFormOpen((prev) => !prev)}
                className={styles.toggleFormBtn}
                disabled={accounts.length === 0}
              >
                <Plus size={18} />
                Log New Transaction
              </button>
            )}

            {accounts.length === 0 && (
              <p className={styles.formHint}>
                Add a card above before logging a transaction.
              </p>
            )}

            {isFormOpen && (
              <div className={`${styles.formSection} ${styles.fadeIn}`}>
                <div className={styles.formHeader}>
                  <div className={styles.formHeaderIcon}>
                    <Receipt size={18} />
                  </div>
                  <div>
                    <h2>Enter Transaction Details</h2>
                    <p>Log a new purchase against one of your cards</p>
                  </div>
                  <button
                    className={styles.closeFormBtn}
                    onClick={() => setIsFormOpen(false)}>
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleAddTransaction} className={styles.form}>

                  <div className={styles.formGroup}>
                    <label>Select Card Used *</label>
                    <div className={styles.chipPicker}>
                      {accounts.map((account) => (
                        <button
                          type="button"
                          key={account.id}
                          onClick={() => handleSelectAccount(account.id)}
                          className={`${styles.chip} ${formData.accountId === account.id ? styles.chipActive : ""}`}
                        >
                          <CardIcon size={14} />
                          {account.name}
                        </button>
                      ))}
                    </div>
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
                      autoFocus
                      required
                    />
                  </div>

                  <div className={styles.row}>
                    <div className={`${styles.formGroup} ${styles.amountGroup}`}>
                      <label htmlFor="amount">Amount *</label>
                      <div className={styles.amountInputWrapper}>
                        <span className={styles.currencyPrefix}>$</span>
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
                    <label>Category</label>
                    <div className={styles.chipPicker}>
                      {cardCategories.map((cat) => (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => handleSelectCategory(cat)}
                          className={`${styles.chip} ${formData.category === cat ? styles.chipActive : ""}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Transaction"}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* ================= SECTION 3: RECENT TRANSACTIONS ================= */}
          <div className={styles.listSection}>

            <div className={styles.sectionHeader}>
              <h2>Recent Transactions</h2>
              {transactions.length > 0 && (
                <span className={styles.transactionCount}>
                  {transactions.length} {transactions.length === 1 ? "transaction" : "transactions"}
                </span>
              )}
            </div>

            {isFormOpen === false && transactions.length === 0 ? (
              <div className={styles.transactionsEmptyState}>
                <div className={styles.transactionsEmptyIcon}>
                  <Receipt size={28} />
                </div>
                <h3>No transactions yet</h3>
                <p>Log your first purchase to start tracking your spending.</p>
                {accounts.length > 0 && (
                  <button
                    className={styles.emptyStateBtn}
                    onClick={() => setIsFormOpen(true)}
                  >
                    <Plus size={16} />
                    Log Transaction
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className={styles.transactionsList}>
                  {transactions.map((transaction) => {
                    const CategoryIcon = categoryIcons[transaction.category] ?? Tag;
                    const isIncome = transaction.type === TransactionType.Income;

                    return (
                      <div key={transaction.id} className={styles.transactionItem}>
                        <div className={styles.transactionIcon}>
                          <CategoryIcon size={18} />
                        </div>
                        <div className={styles.transactionInfo}>
                          <div className={styles.transactionHeader}>
                            <h3>{transaction.description}</h3>
                            <span className={styles.category}>
                              {transaction.category}
                            </span>
                          </div>
                          <div className={styles.transactionDetails}>
                            <span className={styles.metaItem}>
                              <CardIcon size={12} />
                              {getAccountName(transaction.accountId)}
                            </span>
                            <span className={styles.metaItem}>
                              <CalendarDays size={12} />
                              {formatDate(transaction.date)}
                            </span>
                          </div>
                        </div>
                        <div className={styles.transactionAmount}>
                          <span
                            className={`${styles.amount} ${isIncome ? styles.amountIncome : styles.amountExpense}`}
                          >
                            {isIncome ? "+" : "-"}
                            {formatCurrency(transaction.amount)}
                          </span>
                          <button
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            className={styles.deleteBtn}
                            disabled={deletingId === transaction.id}
                            aria-label="Delete transaction"
                          >
                            {deletingId === transaction.id ? (
                              <Loader2 size={18} className={styles.spinner} />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={styles.totalSection}>
                  <h3>Total Spent</h3>
                  <span className={styles.totalAmount}>
                    {formatCurrency(totalAmount)}
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
