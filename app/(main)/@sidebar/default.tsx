"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import ThemePicker from "components/ThemePicker/themePicker";
import ThemeToggle from "components/ThemeToggle/ThemeToggle";
import Image from "next/image";
import logo from "public/Penros-Triangle.svg";
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
  UserRoundPen,
  Settings,
  Palette
} from "lucide-react";
import styles from "./Sidebar.module.scss";

export default function SideBar() {
  const router = useRouter();

  // States
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isThemePickerOpen, setIsThemePickerOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check mobile
  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);

      if (width >= 1024) {
        setIsOpen(false);
      }
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Nav logic
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const handleNavClick = (onClick: () => void) => {
    onClick();
  };

  const handleThemePickerClick = () => {
    if (isExpanded) {
      setIsThemePickerOpen(true);
    } else {
      setIsExpanded(true);
      setIsThemePickerOpen(true);
    }
  }

  const topButtons = useMemo(() => [
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
  ], [router]);

  const middleButtons = useMemo(() => [
    {
      id: 3,
      name: "Income",
      icon: <BanknoteArrowUp />,
      onClick: () => router.push('/dashboard/income')
    },
    {
      id: 4,
      name: "Expenses",
      icon: <BanknoteArrowDown />,
      onClick: () => router.push('/dashboard/expenses')
    },
    {
      id: 5,
      name: "Assets",
      icon: <ChartCandlestick />,
      onClick: () => router.push('/dashboard/assets')
    },
    {
      id: 6,
      name: "Liabilities",
      icon: <ReceiptText />,
      onClick: () => router.push('/dashboard/liabilities')
    },
  ], []);

  const bottomButtons = useMemo(() => [
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
      onClick: () => router.push('/profile')
    },
    {
      id: 10,
      name: "Settings",
      icon: <Settings />,
      onClick: () => router.push('/settings')
    },
  ], []);

  const navigationGroups = useMemo(() => [
    { label: "Workspace", items: topButtons },
    { label: "Ledger", items: middleButtons },
    { label: "System", items: bottomButtons },
  ], [topButtons, middleButtons, bottomButtons]);

  return (
    <>
      {/* Top Navbar (Mobile & Tablet) */}
      {isMobile && (
        <>
          <button
            className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>

        </>
      )}

      {isMobile && (
        <div className={styles.topNavbar}>
          <div className={styles.logoContainer}>
            <Image src={logo} alt="logo" width={40} height={40} />
          </div>
          {!isOpen && <ThemeToggle />}
        </div>
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
          setIsExpanded={setIsExpanded}
        />

        {/* Top Control Bar - Only visible on desktop */}
        {!isMobile && (
          <div className={styles.topControlBar}>
            <button
              className={styles.toggleBtn}
              onClick={toggleExpanded}
            >
              {isExpanded ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
            </button>
            {isExpanded && (
              <ThemeToggle />
            )}
          </div>
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
                  onClick={() => {
                    if (isMobile) setIsOpen(false);
                    handleNavClick(btn.onClick);
                  }}
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
