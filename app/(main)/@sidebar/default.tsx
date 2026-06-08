"use client";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import ThemePicker from "components/ThemePicker/themePicker";
import {
  ChevronsLeft,
  ChevronsRight,
  ScanBarcode,
  LayoutDashboard,
  BanknoteArrowUp,
  BanknoteArrowDown,
  ChartCandlestick,
  ReceiptText,
  UserRoundPen,
  Settings,
  Palette,
  ChevronUp,
  History
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

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isDeskOpen, setIsDeskOpen] = useState<boolean>(true);
  const [isThemePickerOpen, setIsThemePickerOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
      if (width >= 1024) setIsSheetOpen(false);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Close sheet on outside tap
  useEffect(() => {
    if (!isSheetOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        setIsSheetOpen(false);
        setIsThemePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isSheetOpen]);

  const toggleSheet = () => {
    setIsSheetOpen((prev) => !prev);
    if (isThemePickerOpen) setIsThemePickerOpen(false);
  };

  const toggleExpanded = () => {
    setIsDeskOpen((prev) => !prev);
    if (isThemePickerOpen) setIsThemePickerOpen(false);
  };

  const handleThemePickerClick = useCallback(() => {
    if (isMobile) {
      setIsSheetOpen(false);
      setIsThemePickerOpen(true);
    } else if (isDeskOpen) {
      setIsThemePickerOpen(true);
    } else {
      setIsDeskOpen(true);
      setIsThemePickerOpen(true);
    }
  }, [isMobile, isDeskOpen]);

  const handleNavClick = (btn: NavItem) => {
    if (btn.path) {
      router.push(btn.path);
    } else {
      btn.onClick?.();
    }
  };

  const topButtons = useMemo<NavItem[]>(
    () => [
      { id: 0, name: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
      { id: 1, name: "Log New Transaction", icon: <ScanBarcode />, path: "/card/transactions" },
      { id: 2, name: "Transaction History", icon: <History />, path: "/transaction-history" },
    ],
    []
  );

  const middleButtons = useMemo<NavItem[]>(
    () => [
      { id: 3, name: "Income", icon: <BanknoteArrowUp />, path: "/dashboard/income" },
      { id: 4, name: "Expenses", icon: <BanknoteArrowDown />, path: "/dashboard/expenses" },
      { id: 5, name: "Assets", icon: <ChartCandlestick />, path: "/dashboard/assets" },
      { id: 6, name: "Liabilities", icon: <ReceiptText />, path: "/dashboard/liabilities" },
    ],
    []
  );

  // Remove the Profile entry from bottomButtons entirely
  const bottomButtons = useMemo<NavItem[]>(
    () => [
      { id: 8, name: "Theme", icon: <Palette />, onClick: () => handleThemePickerClick() },
      { id: 10, name: "Settings", icon: <Settings />, path: "/settings" },
    ],
    [handleThemePickerClick]
  );

  const navigationGroups = useMemo(
    () => [
      { label: "Workspace", items: topButtons },
      { label: "Ledger", items: middleButtons },
      { label: "System", items: bottomButtons },
    ],
    [topButtons, middleButtons, bottomButtons]
  );

  const url = usePathname();
  const [currentPath, setCurrentPath] = useState<string>(url);
  useEffect(() => {
    setCurrentPath(url);
  }, [url]);



  // ─── Mobile layout ────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        {/* Mobile theme picker — bottom sheet */}
        <ThemePicker
          isThemePickerOpen={isThemePickerOpen}
          setIsThemePickerOpen={setIsThemePickerOpen}
          setIsDeskOpen={setIsDeskOpen}
          isMobile={true}
        />
        {/* Swipe pill — fixed top-right */}
        <button
          className={`${styles.swipePill} ${isSheetOpen ? styles.pillOpen : ""}`}
          onClick={toggleSheet}
          aria-label={isSheetOpen ? "Close navigation" : "Open navigation"}
        >
          <ChevronUp size={14} />
          <span>{isSheetOpen ? "close" : "menu"}</span>
        </button>

        {/* Overlay */}
        {isSheetOpen && (
          <div className={styles.overlay} onClick={() => setIsSheetOpen(false)} />
        )}

        {/* Bottom sheet */}
        <div
          ref={sheetRef}
          className={`${styles.bottomSheet} ${isSheetOpen ? styles.sheetOpen : ""}`}
        >
          <div className={styles.sheetHandle} />

          <nav className={styles.sheetNav}>
            {navigationGroups.map((group, index) => (
              <section key={index} className={styles.sheetSection}>
                <h3 className={styles.sheetSectionLabel}>{group.label}</h3>
                <div className={styles.sheetItems}>
                  {group.items.map((btn) => (
                    <button
                      key={btn.id}
                      className={styles.sheetItem}
                      data-active={btn.path === currentPath || undefined}
                      onClick={() => {
                        if (btn.name !== "Theme") setIsSheetOpen(false);
                        handleNavClick(btn);
                      }}
                    >
                      {btn.icon}
                      <span className={styles.sheetItemLabel}>{btn.name}</span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
            <div className={styles.sidebarFooter} data-ui-mode="mobile">
              <UserButton appearance={{ elements: { avatarBox: { width: 34, height: 34 } } }} />
              <button onClick={() => router.push('/profile')} className={styles.footerUsername}>My Account</button>
            </div>
          </nav>
        </div>
      </>
    );
  }

  // ─── Desktop layout (unchanged) ───────────────────────────────────────────
  return (
    <aside
      className={`${styles.sideBarContainer} ${isDeskOpen ? styles.expanded : styles.collapsed}`}
    >
      <ThemePicker
        isThemePickerOpen={isThemePickerOpen}
        setIsThemePickerOpen={(b: boolean) => setIsThemePickerOpen(b)}
        setIsDeskOpen={(b: boolean) => setIsDeskOpen(b)}
      />

      <div className={styles.topControlBar}>
        <button className={styles.toggleBtn} onClick={toggleExpanded}>
          {isDeskOpen ? <ChevronsLeft size={16} /> : <ChevronsRight size={16} />}
        </button>
      </div>

      <nav className={styles.btnsContainer}>
        {navigationGroups.map((group, index) => (
          <section key={index} className={styles.menu}>
            {isDeskOpen && <h3 className={styles.sectionLabel}>{group.label}</h3>}
            {group.items.map((btn) => (
              <button
                key={btn.id}
                className={styles.sideBarBtn}
                data-active={btn.path === currentPath || undefined}
                data-tooltip={!isDeskOpen ? btn.name : undefined}
                onClick={() => handleNavClick(btn)}
              >
                {btn.icon}
                {isDeskOpen && (
                  <span className={styles.sidebarBtnTxt}>{btn.name}</span>
                )}
              </button>
            ))}
          </section>
        ))}
      </nav>
      <div className={styles.sidebarFooter}>
        <UserButton appearance={{ elements: { avatarBox: { width: 34, height: 34 } } }} />
        {isDeskOpen && <span onClick={() => router.push('/profile')} className={styles.footerUsername}>My Account</span>}
      </div>
    </aside>
  );
}
