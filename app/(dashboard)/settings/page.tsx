"use client";
import { useState } from "react";
import SideBar from "@/components/Sidebar/Sidebar";
import styles from "./settings.module.scss";

interface InputField {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder?: string;
}

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

  // Configuration arrays
  const personalInfoFields: InputField[] = [
    { id: "firstName", label: "First Name", type: "text", value: formData.firstName },
    { id: "lastName", label: "Last Name", type: "text", value: formData.lastName },
    { id: "email", label: "Email Address", type: "email", value: formData.email },
    { id: "phone", label: "Phone Number", type: "tel", value: formData.phone },
    { id: "dateOfBirth", label: "Date of Birth", type: "date", value: formData.dateOfBirth },
  ];

  const addressFields: InputField[] = [
    { id: "address", label: "Street Address", type: "text", value: formData.address },
    { id: "city", label: "City", type: "text", value: formData.city },
    { id: "state", label: "State", type: "text", value: formData.state },
    { id: "zipCode", label: "ZIP Code", type: "text", value: formData.zipCode },
  ];

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
    <main className={styles.mainContainer}>
      <SideBar />
      <div className={styles.contentContainer}>
        <div className={styles.pageHeader}>
          <h1>Settings</h1>
          <p>Customize your finance tracking experience</p>
        </div>

        <div className={styles.settingsGrid}>
          {/* Personal Information */}
          <section className={styles.settingCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>👤</div>
              <h2>Personal Information</h2>
            </div>
            {personalInfoFields.map((field) => (
              <div key={field.id} className={styles.settingGroup}>
                <label htmlFor={field.id} className={styles.settingLabel}>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  value={field.value}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className={styles.textInput}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </section>

          {/* Address */}
          <section className={styles.settingCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>📍</div>
              <h2>Address</h2>
            </div>
            {addressFields.map((field) => (
              <div key={field.id} className={styles.settingGroup}>
                <label htmlFor={field.id} className={styles.settingLabel}>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  value={field.value}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className={styles.textInput}
                />
              </div>
            ))}
          </section>

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
    </main>
  );
}
