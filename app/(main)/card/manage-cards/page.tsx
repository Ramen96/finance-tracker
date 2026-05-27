"use client";
import { useState } from "react";
import styles from "../card.module.scss";
import { Plus } from "lucide-react";

export type CardNetwork = 'Visa' | 'Mastercard' | 'Discover' | 'Amex' | 'Unknown';

export type CardInformation = {
  cardName: string;
  cardNetwork: CardNetwork;
  lastFourDigits: number | undefined;
  description: string | undefined;
}

export default function ManageCard() {
  const [formData, setFormData] = useState({
    cardName: "",
    cardNetwork: 'Unknown' as CardNetwork,
    lastFourDigits: "",
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

  const handleAddCard = (e: React.SubmitEvent) => {
    e.preventDefault();

    // Validation check
    if (!formData.cardName.trim() || formData.cardNetwork === 'Unknown' || !formData.lastFourDigits) {
      alert("Please fill in all required fields");
      return;
    }

    const cleanCardData: CardInformation = {
      cardName: formData.cardName.trim(),
      cardNetwork: formData.cardNetwork,
      lastFourDigits: formData.lastFourDigits ? parseInt(formData.lastFourDigits, 10) : undefined,
      description: formData.description.trim() || undefined,
    };

    console.log("Card Ready for Database:", cleanCardData);

    // Clear form after successful submit if desired
  };

  return (
    <div className={styles.contentContainer}>
      <section className={styles.cardContainer}>
        <div className={styles.header}>
          <h1>Manage Cards</h1>
          <p>Add and configure your credit and debit cards for manual tracking</p>
        </div>

        <div className={styles.content}>
          <div className={styles.formSection}>
            <h2>Log New Card</h2>
            <form onSubmit={handleAddCard} className={styles.form}>

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
                <label htmlFor="cardNetwork">Network *</label>
                <select
                  id="cardNetwork"
                  name="cardNetwork"
                  value={formData.cardNetwork}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Unknown">Select Network</option>
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Discover">Discover</option>
                  <option value="Amex">Amex</option>
                </select>
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label htmlFor="lastFourDigits">Last Four Digits *</label>
                  <input
                    type="text"
                    id="lastFourDigits"
                    name="lastFourDigits"
                    value={formData.lastFourDigits}
                    onChange={handleInputChange}
                    placeholder="1234"
                    maxLength={4}
                    pattern="\d{4}"
                    title="Enter the last 4 digits"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Description (Optional)</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Add notes like statement dates or rewards categories"
                  rows={3}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <Plus size={18} />
                Add Card
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
