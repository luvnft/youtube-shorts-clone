import { comment, moreInfo, share, thumbDown, thumbUp } from "./Icon";
import IconButton from "./IconButton";
import styles from "./shortVideoInformation.module.css";

const ShortVideoInformation = () => {
  return (
    <>
      <div className={[styles.front, styles.info].join(" ")}>
        <div>測試超長文字</div>
        <div className={styles.profile}>
          <div className={styles.profileIcon}>
            <img src="https://placehold.co/24x24" alt="" />
          </div>
          <div>@user-xx-asdqwf</div>
          <button type="button">訂閱</button>
        </div>
      </div>
      <div className={[styles.front, styles.profileActions].join(" ")}>
        <IconButton icon={thumbUp}>880</IconButton>
        <IconButton icon={thumbDown}>不喜歡</IconButton>
        <IconButton icon={comment}>10</IconButton>
        <IconButton icon={share}>分享</IconButton>
        <IconButton icon={moreInfo} />
        <button type="button" className={styles.pivotButton}>
          <img src="https://placehold.co/36x36/000/F00" alt="pivot-image" />
        </button>
      </div>
    </>
  );
};

export default ShortVideoInformation;
