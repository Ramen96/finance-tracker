"use client";
import { useState } from "react";
import styles from "./profile.module.scss";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  bio: string;
}

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
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
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
                  <div className={styles.infoItem}>
                    <User size={20} />
                    <div className={styles.infoText}>
                      <span className={styles.label}>Name</span>
                      <span className={styles.value}>{profile.name}</span>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <Mail size={20} />
                    <div className={styles.infoText}>
                      <span className={styles.label}>Email</span>
                      <span className={styles.value}>{profile.email}</span>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <Phone size={20} />
                    <div className={styles.infoText}>
                      <span className={styles.label}>Phone</span>
                      <span className={styles.value}>{profile.phone}</span>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <MapPin size={20} />
                    <div className={styles.infoText}>
                      <span className={styles.label}>Location</span>
                      <span className={styles.value}>{profile.location}</span>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <Calendar size={20} />
                    <div className={styles.infoText}>
                      <span className={styles.label}>Member Since</span>
                      <span className={styles.value}>{profile.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.bioSection}>
                <h2>Bio</h2>
                <p>{profile.bio}</p>
              </div>
            </>
          ) : (
            <form className={styles.editForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={editForm.location}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={editForm.bio}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
            </form>
          )}
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Transactions</h3>
          <p className={styles.statValue}>156</p>
        </div>
        <div className={styles.statCard}>
          <h3>Active Cards</h3>
          <p className={styles.statValue}>3</p>
        </div>
        <div className={styles.statCard}>
          <h3>This Month</h3>
          <p className={styles.statValue}>$1,245</p>
        </div>
      </div>
    </section>
  );
}
