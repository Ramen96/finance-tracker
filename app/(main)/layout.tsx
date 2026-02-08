import styles from "./layout.module.scss";

export default function dashboardLayout({
  sidebar,
  children
}: {
  sidebar: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <main className={styles.mainContainer}>
      {sidebar}
      {children}
    </main>
  )
}
