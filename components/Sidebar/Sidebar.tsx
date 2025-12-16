"use client";
import { useState } from "react";
import { PanelLeftOpen, PanelLeftClose, ScanBarcode, CreditCard, LayoutDashboard } from "lucide-react";
import styles from "./Sidebar.module.scss";

type ExpandBtnPropType = {
  sideBarState: boolean;
  handleClick: () => void;
}

function ExpandBtn({ sideBarState, handleClick}: ExpandBtnPropType) {
  return (
    <span id="btn-container">
      <button onClick={handleClick} className={styles.btn}>
        {sideBarState ? <PanelLeftClose /> : <PanelLeftOpen />}
      </button>
    </span>
  )
}

export default function SideBar() {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const sideBarBtns = [
    { 
      id: 0, 
      name: "Dashboard", 
      icon: <LayoutDashboard /> 
    },
    { 
      id: 1, 
      name: "Credit/Debit", 
      icon: <CreditCard /> 
    },
    {
      id: 2,
      name: "Log New Transaction",
      icon: <ScanBarcode />,
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
          <button className={styles.sideBarBtn}>
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