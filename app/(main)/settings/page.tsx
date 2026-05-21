"use client";
import { useState } from "react";
import {
  Settings2,
  Bell,
  ShieldCheck,
  Database,
  Lock,
  KeyRound,
  ShieldPlus,
  MonitorSmartphone,
  Download,
  Upload,
  Trash2,
  UserX,
} from "lucide-react";
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
  icon: React.ReactNode;
}

export default function Settings() {
  const [formData, setFormData] = useState({
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
    { label: "Change Password", variant: "secondary", icon: <KeyRound size={15} /> },
    { label: "Enable Two-Factor Authentication", variant: "secondary", icon: <ShieldPlus size={15} /> },
    { label: "Manage Sessions", variant: "secondary", icon: <MonitorSmartphone size={15} /> },
  ];

  const dataActions: ButtonAction[] = [
    { label: "Export All Data", variant: "secondary", icon: <Download size={15} />, helperText: "Download your financial data in CSV format" },
    { label: "Import Data", variant: "secondary", icon: <Upload size={15} />, helperText: "Import transactions from another app" },
    { label: "Delete All Data", variant: "danger", icon: <Trash2 size={15} />, helperText: "Permanently delete all your financial records" },
  ];

  const privacyActions: ButtonAction[] = [
    { label: "Delete Account", variant: "danger", icon: <UserX size={15} />, helperText: "This action cannot be undone" },
  ];

  const getBtnClass = (variant: ButtonAction["variant"]) => {
    if (variant === "primary") return styles.btnPrimary;
    if (variant === "danger") return styles.btnDanger;
    return styles.btnSecondary;
  };

  const ActionButton = ({ action }: { action: ButtonAction }) => (
    <div className={`${styles.settingGroup} ${action.variant === "danger" ? styles.dangerGroup : ""}`}>
      <button className={getBtnClass(action.variant)}>
        {action.icon}
        {action.label}
      </button>
      {action.helperText && (
        <p className={styles.helperText}>{action.helperText}</p>
      )}
    </div>
  );

  return (
    <div className={styles.contentContainer}>
      <div className={styles.pageHeader}>
        <h1>Settings</h1>
        <p className={styles.headerSub}>Customize your experience</p>
      </div>

      <div className={styles.settingsGrid}>

        {/* General */}
        <section className={styles.settingCard}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}><Settings2 size={16} /></span>
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
            <span className={styles.sectionIcon}><Bell size={16} /></span>
            <h2>Notifications</h2>
          </div>
          {notificationSettings.map((field) => (
            <div key={field.id} className={styles.settingGroup}>
              <label className={styles.toggleLabel}>
                <span>{field.label}</span>
                <div className={styles.toggleWrapper}>
                  <input
                    type="checkbox"
                    checked={field.checked}
                    onChange={(e) => handleInputChange(field.id, e.target.checked)}
                    className={styles.toggleInput}
                  />
                  <div className={styles.toggleTrack} />
                  <div className={styles.toggleThumb} />
                </div>
              </label>
            </div>
          ))}
        </section>

        {/* Account Security */}
        <section className={styles.settingCard}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}><ShieldCheck size={16} /></span>
            <h2>Account Security</h2>
          </div>
          {securityActions.map((action, index) => (
            <ActionButton key={index} action={action} />
          ))}
        </section>

        {/* Data Management */}
        <section className={styles.settingCard}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}><Database size={16} /></span>
            <h2>Data Management</h2>
          </div>
          {dataActions.map((action, index) => (
            <ActionButton key={index} action={action} />
          ))}
        </section>

        {/* Privacy */}
        <section className={`${styles.settingCard} ${styles.dangerCard}`}>
          <div className={`${styles.sectionHeader} ${styles.dangerSectionHeader}`}>
            <span className={`${styles.sectionIcon} ${styles.dangerIcon}`}><Lock size={16} /></span>
            <h2>Privacy</h2>
          </div>
          {privacyActions.map((action, index) => (
            <ActionButton key={index} action={action} />
          ))}
        </section>

      </div>

      <div className={styles.saveContainer}>
        <button onClick={handleSave} className={styles.btnPrimary}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
