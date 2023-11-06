import dynamic from "next/dynamic";
import styles from "./shorts.module.css";

async function getList() {
  const res = await fetch("http://localhost:3000/shorts/api?tab_id=FOLLOWING");
  return res.json().then((json) => json.data?.items ?? []);
}

const Carousel = dynamic(() => import("@/components/shortVideo/Carousel"), {
  ssr: false,
});

export default async function ShortsPage() {
  const list = await getList();

  return (
    <div className={styles.shortContainer}>
      <div style={{ height: "100%" }}>
        <Carousel data={list} />
      </div>
    </div>
  );
}
