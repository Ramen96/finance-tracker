"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Plus, Trash2, Loader2, CreditCard as CardIcon } from "lucide-react";
import { useApi } from "@/lib/api";
import { AccountType, accountTypeLabels, accountTypeOptions } from "@/lib/types/enums";
import styles from "./manageCards.module.scss";

type Account = {
  id: string;
  name: string;
  type: number;
  balance: number;
};

type ManageCardsProps = {
  isOpen: boolean;
  onClose: () => void;
  accounts: Account[];
  onAccountsChange: (accounts: Account[]) => void;
};

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function ManageCards({
  isOpen,
  onClose,
  accounts,
  onAccountsChange,
}: ManageCardsProps) {
  const { authFetch } = useApi();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    type: String(AccountType.Checking),
    balance: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: "", type: String(AccountType.Checking), balance: "" });
    setIsFormOpen(false);
  };

  const handleAddAccount = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.balance) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await authFetch("api/accounts", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name.trim(),
          type: Number(formData.type),
          balance: parseFloat(formData.balance),
        }),
      });

      onAccountsChange([created, ...accounts]);
      resetForm();
    } catch (error) {
      console.error("Failed to add account: ", error);
      alert("Failed to save account");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async (id: string) => {
    setDeletingId(id);
    try {
      await authFetch(`api/accounts/${id}`, { method: "DELETE" });
      onAccountsChange(accounts.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Failed to delete account: ", error);
      alert("Failed to delete account");
    } finally {
      setDeletingId(null);
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Manage Cards"
      >
        <div className={styles.header}>
          <h2>Manage Cards</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close manage cards"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.content}>
          {accounts.length === 0 ? (
            <p className={styles.emptyState}>
              No cards tracked yet. Add one below.
            </p>
          ) : (
            <div className={styles.accountList}>
              {accounts.map((account) => (
                <div key={account.id} className={styles.accountRow}>
                  <CardIcon size={20} className={styles.accountIcon} />
                  <div className={styles.accountInfo}>
                    <span className={styles.accountName}>{account.name}</span>
                    <span className={styles.accountMeta}>
                      {accountTypeLabels[account.type] ?? "Unknown"} · {fmt(account.balance)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteAccount(account.id)}
                    className={styles.deleteBtn}
                    disabled={deletingId === account.id}
                    aria-label={`Delete ${account.name}`}
                  >
                    {deletingId === account.id ? (
                      <Loader2 size={16} className={styles.spinner} />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {isFormOpen ? (
            <form onSubmit={handleAddAccount} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="mc-name">Card Name *</label>
                <input
                  type="text"
                  id="mc-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Chase Sapphire"
                  autoFocus
                  required
                />
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label htmlFor="mc-type">Type *</label>
                  <select
                    id="mc-type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    {accountTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="mc-balance">Balance *</label>
                  <input
                    type="number"
                    id="mc-balance"
                    name="balance"
                    value={formData.balance}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Card"}
                </button>
              </div>
            </form>
          ) : (
            <button className={styles.addBtn} onClick={() => setIsFormOpen(true)}>
              <Plus size={16} />
              Add New Card
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
