import styles from "./shorts.module.css";
import { TabContainer } from "@/components/tab/Tab";
import CarouselContainer from "@/components/shortVideo/CarouselContainer";
import { Id } from "@/components/tab/tabAtoms";

async function getList() {
  const res = await fetch("http://localhost:3000/shorts/api?tab_id=FOLLOWING");
  return res.json().then((json) => json.data?.items ?? []);
}

export default async function ShortsPage() {
  const list = await getList();

  return (
    <div className={styles.shortContainer}>
      <div style={{ height: "100%" }}>
        <TabContainer>
          <CarouselContainer name={Id.FOLLOWING} focus data={list} />
          <CarouselContainer name={Id.FOR_YOU} focus={false} data={[]} />
        </TabContainer>
      </div>
    </div>
  );
}
