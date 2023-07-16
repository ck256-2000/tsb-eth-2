import React from "react";
import Player from "../player/Player";
import styles from "../players/playersStyles.module.css";
import {PlayersData} from "../../constants/constants";

export const Players = () => {
  return (
    <div className={styles["players-container"]}>
      {PlayersData.map((player, index) => {
        return (
          <Player
          key={index}
            title={player.title}
            backgroundImage={player.backgroundImage}
            position={player.position}
            description={player.description}
          />
        );
      })}
    </div>
  );
};

export default Players;
