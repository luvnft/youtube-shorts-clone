import dynamic from "next/dynamic";
import styles from "./shorts.module.css";

async function getList() {
  try {
    const res = await fetch(
      `${process.env.STREAM_API_BASE_PATH}/following_list`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json().then((json) => {
      return json?.items ?? [];
    });
  } catch (e) {
    console.error(e);
    return [];
  }
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
