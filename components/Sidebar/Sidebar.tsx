"use client";
import { useState } from "react";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
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

  return (
    <section className={`${styles.sideBarContainer} ${ isExpanded ? styles.wExpanded : styles.wContracted }`}>
      <ExpandBtn 
        sideBarState={isExpanded}
        handleClick={toggleExpanded}
      />
    </section>
  )
}