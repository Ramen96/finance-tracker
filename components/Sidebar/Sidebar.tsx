"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PanelLeftOpen, PanelLeftClose, ScanBarcode, CreditCard, LayoutDashboard, BanknoteArrowUp, BanknoteArrowDown, ChartCandlestick, ReceiptText, ShieldCheck, UserRoundPen, Settings, Palette } from "lucide-react";
import styles from "./Sidebar.module.scss";

type ExpandBtnPropType = {
  sideBarState: boolean;
  handleClick: () => void;
}

function ExpandBtn({ sideBarState, handleClick }: ExpandBtnPropType) {
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

  const topButtons = [
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

  const middleButtons = [
    {
      id: 3,
      name: "Income",
      icon: <BanknoteArrowUp />,
      onClick: () => console.log("nothing for now")
    },
    {
      id: 4,
      name: "Expenses",
      icon: <BanknoteArrowDown />,
      onClick: () => console.log("nothing for now")
    },
    {
      id: 5,
      name: "Assets",
      icon: <ChartCandlestick />,
      onClick: () => console.log("nothing for now")
    },
    {
      id: 6,
      name: "Liabilities",
      icon: <ReceiptText />,
      onClick: () => console.log("nothing for now")
    },
    {
      id: 7,
      name: "Audit",
      icon: <ShieldCheck />,
      onClick: () => console.log("nothing for now")
    },
  ];

  const bottomButtons = [
    {
      id: 8,
      name: "Theme",
      icon: <Palette />,
      onClick: () => console.log("nothing for now")
    },
    {
      id: 9,
      name: "Profile",
      icon: <UserRoundPen />,
      onClick: () => console.log("nothing for now")
    },
    {
      id: 10,
      name: "Settings",
      icon: <Settings />,
      onClick: () => console.log("nothing for now")
    },
  ];


  const navigationGroups = [
    { label: "Workspace", items: topButtons },
    { label: "Ledger", items: middleButtons },
    { label: "System", items: bottomButtons },
  ];

  return (
    <section
      className={`${styles.sideBarContainer} ${isExpanded ? styles.wExpanded : styles.wContracted
        }`}
    >
      <ExpandBtn sideBarState={isExpanded} handleClick={toggleExpanded} />
      <div className={styles.btnsContainer}>
        <div className={styles.btnsContainer}>
          {navigationGroups.map((group, index) => (
            <section key={index} className={styles.menu}>
              {isExpanded && <h3 className={styles.sectionLabel}>{group.label}</h3>}
              {group.items.map((btn) => (
                <span key={btn.id}>
                  <button
                    data-tooltip={!isExpanded ? btn.name : undefined}
                    className={styles.sideBarBtn}
                    onClick={btn.onClick}
                  >
                    {btn.icon}
                    {isExpanded && <p className={styles.sidebarBtnTxt}>{btn.name}</p>}
                  </button>
                </span>
              ))}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
