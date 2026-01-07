"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ThemePicker from "components/ThemePicker/themePicker";
import {
  Menu,
  X,
  PanelLeftOpen,
  PanelLeftClose,
  ScanBarcode,
  CreditCard,
  LayoutDashboard,
  BanknoteArrowUp,
  BanknoteArrowDown,
  ChartCandlestick,
  ReceiptText,
  ShieldCheck,
  UserRoundPen,
  Settings,
  Palette
} from "lucide-react";
import styles from "./Sidebar.module.scss";

export default function SideBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isThemePickerOpen, setIsThemePickerOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [exdFromThemePicker, setExdFromThemePicker] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const handleNavClick = (onClick: () => void) => {
    onClick();
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleThemePickerClick = () => {
    if (isExpanded) {
      setIsThemePickerOpen(true);
    } else {
      setIsExpanded(true);
      setIsThemePickerOpen(true);
      setExdFromThemePicker(true);
    }
  }

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
      onClick: () => handleThemePickerClick()
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
    <>
      {/* Hamburger Button - Only visible on mobile/tablet */}
      {isMobile && (
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Overlay */}
      {isMobile && isOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sideBarContainer} ${isOpen ? styles.open : ''} ${isExpanded ? styles.expanded : styles.collapsed}`}
      >
        <ThemePicker
          isThemePickerOpen={isThemePickerOpen}
          setIsThemePickerOpen={() => setIsThemePickerOpen(false)}
          exdFromThemePicker={exdFromThemePicker}
          setExdFromThemePicker={setExdFromThemePicker}
          setIsExpanded={setIsExpanded}
        />

        {/* Toggle Button - Only visible on desktop */}
        {!isMobile && (
          <button
            className={styles.toggleBtn}
            onClick={toggleExpanded}
            data-tooltip={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isExpanded ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
        )}

        <nav className={styles.btnsContainer}>
          {navigationGroups.map((group, index) => (
            <section key={index} className={styles.menu}>
              {(isMobile || isExpanded) && (
                <h3 className={styles.sectionLabel}>{group.label}</h3>
              )}
              {group.items.map((btn) => (
                <button
                  key={btn.id}
                  className={styles.sideBarBtn}
                  onClick={() => handleNavClick(btn.onClick)}
                  data-tooltip={!isMobile && !isExpanded ? btn.name : undefined}
                >
                  {btn.icon}
                  {(isMobile || isExpanded) && (
                    <span className={styles.sidebarBtnTxt}>{btn.name}</span>
                  )}
                </button>
              ))}
            </section>
          ))}
        </nav>
      </aside>
    </>
  );
}
