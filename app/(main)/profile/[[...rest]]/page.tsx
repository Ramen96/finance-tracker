import { UserProfile } from '@clerk/nextjs'
import styles from "./profile.module.scss";

export default function Profile() {
  return (
    <div className={styles.contentContainer}>
      <section className={styles.container}>
        <UserProfile />
      </section>
    </div>
  );
}
