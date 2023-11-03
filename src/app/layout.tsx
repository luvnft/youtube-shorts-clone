import Header from "@/components/header/Header";
import type { Metadata } from "next";
import "./index.css";
import styles from "./index.module.css";
import Sidebar from "@/components/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Next.js + React + TS",
  description: "youtube clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header className={styles.header} />
        <main className={styles.main}>
          <Sidebar className={styles.aside} />
          {children}
        </main>
      </body>
    </html>
  );
}
