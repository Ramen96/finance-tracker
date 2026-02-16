"use client"
import Loading from "@/components/Loading/loading";
import { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import Audit from "@/components/Audit/audit";
import Liabilities from "@/components/Liabilities/liabilities";


// TODO:
// 1. Simulate API call, fetching genaric total data for each section 
// 2. Map over object to create simple overview 

// PLACEHOLDER DATA

const placeholderData = [
  {
    id: 1,
    name: "Income",
    amount: 1293109
  },
  {
    id: 2,
    name: "Expenses",
    amount: 1231
  },
  {
    id: 3,
    name: "Assets",
    amount: 400023
  },
  {
    id: 4,
    name: "Liabilities",
    amount: 30203
  }
];


export default function Dashboard() {

  interface pDataType {
    id: number;
    name: string;
    amount: number;
  }

  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState<pDataType[]>([]);

  // Simulate API call
  useEffect(() => {
    setTimeout(() => {
      setData(placeholderData);
      setIsloading(false);
    }, 500)
  })

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <div id="content" className={styles.contentContainer}>
      {data.map((element) =>
        <div key={element.id}>
          <h1>{element.name}</h1>
          <h4>{element.amount}</h4>
        </div>
      )}
      <Audit />
    </div>
  );
}
