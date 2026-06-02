"use client";
import { SignIn, SignUp } from "@clerk/nextjs";
import styles from "./AuthForm.module.scss";

type Props = {
  mode: "login" | "signup";
};

export default function AuthForm({ mode }: Props) {

  return (
    <main className={styles.mainContainer}>
      {mode === "login" ? <SignIn /> : <SignUp />}
    </main>
  );
}
