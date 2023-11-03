import dynamic from "next/dynamic";
import styles from "./shorts.module.css";

const ShortsContainer = dynamic(
  () => import("@/components/shortVideo/ShortsContainer"),
  { ssr: false }
);

export default function ShortsPage() {
  return <ShortsContainer className={styles.shortContainer} />;
}
