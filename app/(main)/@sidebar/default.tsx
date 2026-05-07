"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import ThemePicker from "components/ThemePicker/themePicker";
import Image from "next/image";
import logo from "public/Penros-Triangle.svg";
import {
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
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

type NavItem = {
  id: number;
  name: string;
  icon: React.ReactNode;
  path?: string;
  onClick?: () => void;
};

export default function SideBar() {
  const router = useRouter();

  // States
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isDeskOpen, setIsDeskOpen] = useState<boolean>(true);
  const [isThemePickerOpen, setIsThemePickerOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, [path]);

  // Check mobile
  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);

      if (width >= 1024) {
        setIsMobileOpen(false);
      }
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Nav logic
  const toggleMenu = () => {
    setIsMobileOpen(!isMobileOpen);
    if (isThemePickerOpen) setIsThemePickerOpen(false);
  }
  const toggleExpanded = () => {
    setIsDeskOpen(!isDeskOpen);
    if (isThemePickerOpen) setIsThemePickerOpen(false);
  }

  const handleThemePickerClick = () => {
    if (isDeskOpen) {
      setIsThemePickerOpen(true);
    } else {
      setIsDeskOpen(true);
      setIsThemePickerOpen(true);
    }
  }

  const handleNavClick = (btn: NavItem) => {
    if (btn.path) {
      router.push(btn.path);
    } else {
      btn.onClick?.();
    }
  };

  const topButtons = useMemo<NavItem[]>(() => [
    { id: 0, name: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
    { id: 1, name: "Credit/Debit", icon: <CreditCard />, path: "/card" },
    { id: 2, name: "Log New Transaction", icon: <ScanBarcode />, path: "/transaction" },
  ], []);

  const middleButtons = useMemo<NavItem[]>(() => [
    { id: 3, name: "Income", icon: <BanknoteArrowUp />, path: "/dashboard/income" },
    { id: 4, name: "Expenses", icon: <BanknoteArrowDown />, path: "/dashboard/expenses" },
    { id: 5, name: "Assets", icon: <ChartCandlestick />, path: "/dashboard/assets" },
    { id: 6, name: "Liabilities", icon: <ReceiptText />, path: "/dashboard/liabilities" },
  ], []);

  const bottomButtons = useMemo<NavItem[]>(() => [
    { id: 8, name: "Theme", icon: <Palette />, onClick: () => handleThemePickerClick() },
    { id: 9, name: "Profile", icon: <UserRoundPen />, path: "/profile" },
    { id: 10, name: "Settings", icon: <Settings />, path: "/settings" }
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
            className={`${styles.hamburger} ${isMobileOpen ? styles.open : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </>
      )}

      {isMobile && (
        <div className={styles.topNavbar}>
          <div className={styles.logoContainer}>
            <Image src={logo} alt="logo" width={30} height={30} />
          </div>
        </div>
      )}

      {/* Overlay */}
      {isMobile && isMobileOpen && (
        <div
          className={styles.overlay}
          onClick={() => {
            setIsMobileOpen(false);
            setIsThemePickerOpen(false);
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sideBarContainer} ${isMobileOpen ? styles.open : ''} ${isDeskOpen ? styles.expanded : styles.collapsed}`}
      >
        <ThemePicker
          isThemePickerOpen={isThemePickerOpen}
          setIsThemePickerOpen={(boolType: boolean) => setIsThemePickerOpen(boolType)}
          setIsDeskOpen={(boolType: boolean) => setIsDeskOpen(boolType)}
        />

        {/* Top Control Bar - Only visible on desktop */}
        {!isMobile && (
          <div className={styles.topControlBar}>
            <button
              className={styles.toggleBtn}
              onClick={toggleExpanded}
            >
              {isDeskOpen ? <ChevronsLeft size={16} /> : <ChevronsRight size={16} />}
            </button>
          </div>
        )}

        <nav className={styles.btnsContainer}>
          {navigationGroups.map((group, index) => (
            <section key={index} className={styles.menu}>
              {(isMobile || isDeskOpen) && (
                <h3 className={styles.sectionLabel}>{group.label}</h3>
              )}
              {group.items.map((btn) => (
                <button
                  key={btn.id}
                  className={styles.sideBarBtn}
                  onClick={() => {
                    if (isMobile && btn.name !== "Theme") setIsMobileOpen(false);
                    handleNavClick(btn);
                  }}
                  data-tooltip={!isMobile && !isDeskOpen ? btn.name : undefined}
                >
                  {btn.icon}
                  {(isMobile || isDeskOpen) && (
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
