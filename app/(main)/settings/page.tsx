"use client";
import { useState } from "react";
import styles from "./settings.module.scss";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectField {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
}

interface CheckboxField {
  id: string;
  label: string;
  checked: boolean;
}

interface ButtonAction {
  label: string;
  variant: "primary" | "secondary" | "danger";
  helperText?: string;
}

export default function Settings() {
  // State management
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-01",
    address: "123 Main St",
    city: "Fort Mill",
    state: "South Carolina",
    zipCode: "29715",
    currency: "USD",
    theme: "catppuccin",
    notifications: true,
    emailUpdates: false,
    budgetAlerts: true,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Settings saved:", formData);
  };

  const generalSettings: SelectField[] = [
    {
      id: "currency",
      label: "Default Currency",
      value: formData.currency,
      options: [
        { value: "USD", label: "USD - US Dollar" },
        { value: "EUR", label: "EUR - Euro" },
        { value: "GBP", label: "GBP - British Pound" },
        { value: "JPY", label: "JPY - Japanese Yen" },
        { value: "CAD", label: "CAD - Canadian Dollar" },
      ],
    },
    {
      id: "theme",
      label: "Theme",
      value: formData.theme,
      options: [
        { value: "catppuccin", label: "Catppuccin" },
        { value: "everforest", label: "Everforest" },
        { value: "gruvbox", label: "Gruvbox" },
        { value: "nord", label: "Nord" },
        { value: "rose-pine", label: "Rose Pine" },
        { value: "tokyo-night", label: "Tokyo Night" },
        { value: "zenburn", label: "Zenburn" },
      ],
    },
  ];

  const notificationSettings: CheckboxField[] = [
    { id: "notifications", label: "Enable push notifications", checked: formData.notifications },
    { id: "emailUpdates", label: "Email updates", checked: formData.emailUpdates },
    { id: "budgetAlerts", label: "Budget threshold alerts", checked: formData.budgetAlerts },
  ];

  const securityActions: ButtonAction[] = [
    { label: "Change Password", variant: "secondary" },
    { label: "Enable Two-Factor Authentication", variant: "secondary" },
    { label: "Manage Sessions", variant: "secondary" },
  ];

  const dataActions: ButtonAction[] = [
    { label: "Export All Data", variant: "secondary", helperText: "Download your financial data in CSV format" },
    { label: "Import Data", variant: "secondary", helperText: "Import transactions from another app" },
    { label: "Delete All Data", variant: "danger", helperText: "Permanently delete all your financial records" },
  ];

  const privacyActions: ButtonAction[] = [
    { label: "Delete Account", variant: "danger", helperText: "This action cannot be undone" },
  ];

  return (
    <div className={styles.contentContainer}>
      <div className={styles.pageHeader}>
        <h1>Settings</h1>
        <p>Customize your finance tracking experience</p>
      </div>

      <div className={styles.settingsGrid}>

        {/* General Settings */}
        <section className={styles.settingCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>⚙️</div>
            <h2>General</h2>
          </div>
          {generalSettings.map((field) => (
            <div key={field.id} className={styles.settingGroup}>
              <label htmlFor={field.id} className={styles.settingLabel}>
                {field.label}
              </label>
              <select
                id={field.id}
                value={field.value}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className={styles.selectInput}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </section>

        {/* Notifications */}
        <section className={styles.settingCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>🔔</div>
            <h2>Notifications</h2>
          </div>
          {notificationSettings.map((field) => (
            <div key={field.id} className={styles.settingGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={field.checked}
                  onChange={(e) => handleInputChange(field.id, e.target.checked)}
                  className={styles.checkbox}
                />
                <span>{field.label}</span>
              </label>
            </div>
          ))}
        </section>

        {/* Account Security */}
        <section className={styles.settingCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>🔐</div>
            <h2>Account Security</h2>
          </div>
          {securityActions.map((action, index) => (
            <div key={index} className={styles.settingGroup}>
              <button className={styles[`btn${action.variant.charAt(0).toUpperCase() + action.variant.slice(1)}`]}>
                {action.label}
              </button>
            </div>
          ))}
        </section>

        {/* Data Management */}
        <section className={styles.settingCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>💾</div>
            <h2>Data Management</h2>
          </div>
          {dataActions.map((action, index) => (
            <div key={index} className={styles.settingGroup}>
              <button className={styles[`btn${action.variant.charAt(0).toUpperCase() + action.variant.slice(1)}`]}>
                {action.label}
              </button>
              {action.helperText && (
                <p className={styles.helperText}>{action.helperText}</p>
              )}
            </div>
          ))}
        </section>

        {/* Privacy */}
        <section className={styles.settingCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>🔒</div>
            <h2>Privacy</h2>
          </div>
          {privacyActions.map((action, index) => (
            <div key={index} className={styles.settingGroup}>
              <button className={styles[`btn${action.variant.charAt(0).toUpperCase() + action.variant.slice(1)}`]}>
                {action.label}
              </button>
              {action.helperText && (
                <p className={styles.helperText}>{action.helperText}</p>
              )}
            </div>
          ))}
        </section>
      </div>

      {/* Save Button */}
      <div className={styles.saveContainer}>
        <button onClick={handleSave} className={styles.btnPrimary}>
          Save All Changes
        </button>
      </div>
    </div>
  );
}
