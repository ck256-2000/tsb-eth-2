import React from "react";
import styles from "../stats/statsStyles.module.css";
import {StatsData} from "../../constants/constants";

export const Stats = ({ gamecount, players, amtburn, amtreward, statsMultiple}) => {



  const rewardodds = Number(1/players).toFixed(2)*100+'%';
  const rewardburn = amtburn+amtreward+'%';
  const rewardmultiple = Number(amtreward/100*players).toFixed(1)+'X';
  
 
 


  return (
    <div className={styles["stats-container"]}>
      {StatsData.map((item, index) => {
        return (
          <div key={index} className={styles["return-rate-container"]}>
            <p className={styles["return-rate-title"]}>{item.title}</p>
            <p className={styles["return-rate-value"]}>{item.value}</p>
            <p className={styles["return-rate-status"]}>{item.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
