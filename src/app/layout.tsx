import Header from "@/components/header/Header";
import type { Metadata } from "next";
import "./index.css";
import styles from "./index.module.css";

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
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
