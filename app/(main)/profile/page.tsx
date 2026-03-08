"use client";
import { useState } from "react";
import styles from "./profile.module.scss";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, LucideIcon } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  bio: string;
}

type InfoField = {
  key: keyof Omit<UserProfile, "bio">;
  label: string;
  icon: LucideIcon;
};

type StatItem = {
  label: string;
  value: string;
};

type FormField = {
  key: keyof UserProfile;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
};

const INFO_FIELDS: InfoField[] = [
  { key: "name", label: "Name", icon: User },
  { key: "email", label: "Email", icon: Mail },
  { key: "phone", label: "Phone", icon: Phone },
  { key: "location", label: "Location", icon: MapPin },
  { key: "joinDate", label: "Member Since", icon: Calendar },
];

const STATS: StatItem[] = [
  { label: "Total Transactions", value: "156" },
  { label: "Active Cards", value: "3" },
  { label: "This Month", value: "$1,245" },
];

const FORM_FIELDS: FormField[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Phone", type: "tel" },
  { key: "location", label: "Location", type: "text" },
  { key: "bio", label: "Bio", type: "textarea" },
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "2024-01-15",
    bio: "Managing my finances and tracking expenses to achieve financial goals.",
  });

  const [editForm, setEditForm] = useState<UserProfile>(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm(profile);
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.contentContainer}>
      <section className={styles.container}>
        <div className={styles.header}>
          <h1>Profile</h1>
          <p>Manage your personal information</p>
        </div>

        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>
              <User size={48} />
            </div>
            <div className={styles.headerActions}>
              {!isEditing ? (
                <button className={styles.editBtn} onClick={handleEdit}>
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              ) : (
                <div className={styles.editActions}>
                  <button className={styles.saveBtn} onClick={handleSave}>
                    <Save size={18} />
                    Save
                  </button>
                  <button className={styles.cancelBtn} onClick={handleCancel}>
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.profileContent}>
            {!isEditing ? (
              <>
                <div className={styles.infoSection}>
                  <h2>Personal Information</h2>
                  <div className={styles.infoGrid}>
                    {INFO_FIELDS.map(({ key, label, icon: Icon }) => (
                      <div key={key} className={styles.infoItem}>
                        <Icon size={20} />
                        <div className={styles.infoText}>
                          <span className={styles.label}>{label}</span>
                          <span className={styles.value}>{profile[key]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.bioSection}>
                  <h2>Bio</h2>
                  <p>{profile.bio}</p>
                </div>
              </>
            ) : (
              <form className={styles.editForm}>
                {FORM_FIELDS.map(({ key, label, type }) => (
                  <div key={key} className={styles.formGroup}>
                    <label htmlFor={key}>{label}</label>
                    {type === "textarea" ? (
                      <textarea
                        id={key}
                        name={key}
                        value={editForm[key]}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    ) : (
                      <input
                        type={type}
                        id={key}
                        name={key}
                        value={editForm[key]}
                        onChange={handleInputChange}
                      />
                    )}
                  </div>
                ))}
              </form>
            )}
          </div>
        </div>

        <div className={styles.statsGrid}>
          {STATS.map(({ label, value }) => (
            <div key={label} className={styles.statCard}>
              <h3>{label}</h3>
              <p className={styles.statValue}>{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
