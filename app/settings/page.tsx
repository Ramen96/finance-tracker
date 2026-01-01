"use client";
import SideBar from "@/components/Sidebar/Sidebar";
import styles from "./settings.module.scss";

export default function Settings() {
  return (

    <main className={styles.mainContainer}>
      <SideBar />
      <div id="content" className={styles.contentContainer}>

      </div>
    </main>
  );
}
