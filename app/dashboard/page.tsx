import SideBar from "@/components/Sidebar/Sidebar";
import styles from "./Dashboard.module.scss";

export default function Dashboard () {
  return (
    <main className={styles.mainContainer}>
      <SideBar />
    </main>
  )
}