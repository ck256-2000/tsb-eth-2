import React from "react";
import styles from "../player/playerStyles.module.css";
import Image from "next/image";

export const Player = ({title, backgroundImage, position, description}) => {
  return (
    <div className={styles["player-container"]}>
      <div className={styles["player-container-title"]}>
        <p className={styles["player-title-text"]}>{title}</p>
      </div>
      <div className={styles["player-icon"]}>
        <Image width={150} height={150} src={backgroundImage} alt="background" />
      </div>
      <div className={styles["player-description-container"]}>
        <div className={styles["player-description-icon"]}>
          <Image width={40} height={40} src="/images/fire.gif" alt="background"/>
        </div>
        <div className={styles["player-description-details"]}>
          <div className={styles["player-position"]}>
            <p className={styles["player-position-text"]}>
              Spots Available: {position}
            </p>
          </div>
          <div className={styles["player-address"]}>
            <p className={styles["player-address-text"]}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
