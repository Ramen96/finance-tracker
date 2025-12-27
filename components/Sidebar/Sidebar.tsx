"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PanelLeftOpen, PanelLeftClose, ScanBarcode, CreditCard, LayoutDashboard } from "lucide-react";
import styles from "./Sidebar.module.scss";

type ExpandBtnPropType = {
  sideBarState: boolean;
  handleClick: () => void;
}

function ExpandBtn({ sideBarState, handleClick}: ExpandBtnPropType) {
  return (
    <span id="btn-container">
      <button onClick={handleClick} className={styles.btn} data-tooltip={sideBarState ? "Collapse Sidebar" : "Expand Sidebar"}>
        {sideBarState ? <PanelLeftClose /> : <PanelLeftOpen />}
      </button>
    </span>
  )
}

export default function SideBar() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const sideBarBtns = [
    { 
      id: 0, 
      name: "Dashboard", 
      icon: <LayoutDashboard />,
      onClick: () => router.push("/dashboard")
    },
    { 
      id: 1, 
      name: "Credit/Debit", 
      icon: <CreditCard />,
      onClick: () => router.push("/card")
    },
    {
      id: 2,
      name: "Log New Transaction",
      icon: <ScanBarcode />,
      onClick: () => router.push("/transaction")
    },
  ];

  return (
    <section
      className={`${styles.sideBarContainer} ${
        isExpanded ? styles.wExpanded : styles.wContracted
      }`}
    >
      <ExpandBtn sideBarState={isExpanded} handleClick={toggleExpanded} />
      <section id="menuItems" className={styles.menu}>
      {sideBarBtns.map((btn) => (
        <span key={btn.id}>
          <button 
            data-tooltip={!isExpanded ? btn.name : undefined} 
            className={styles.sideBarBtn}
            onClick={btn.onClick}
            >
            {btn.icon}
            {isExpanded && (
              <p className={styles.sidebarBtnTxt}>
                {btn.name}
              </p>
            )}
          </button>
        </span>
      ))}
      </section>
    </section>
  );
}