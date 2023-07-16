import React from "react";
import { useEffect, useRef, useState } from "react";
import styles from "../stats/statsStyles.module.css";
import {StatsData} from "../../constants/constants";
import { useAccount } from "wagmi";
import {
  useAnimationConfig,
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";

export const Stats = () => {
  const { address } = useAccount();
  const { data: tsbContract } = useScaffoldContract({ contractName: "TSBGame01" });
//console.log("tsbContract: ", tsbContract);

const { data: gamecount} = useScaffoldContractRead({ 
    contractName: "TSBGame01",
    functionName: "getTotalGames",
  });

  const { data: totalPlayersInGame } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getTotalPlayers",
  });

  const { data: amtToBurn} = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getamountBurn",
  });

  const { data: amtToReward } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getamountReward",
  });

  const { data: TotalRewardAmount } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getTotalAmountPaidOut",
  });

  const { data: TotalBurnAmount } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getTotalAmountBurned",
  });


  //const rewardodds = Number(1/(totalPlayersInGame));
   //rewardodds = Number(1/totalPlayersInGame).toFixed(2)*100+'%';
const rewardodds = (1/parseInt(totalPlayersInGame)*100).toFixed(1)+'%';
const intPlayers = parseInt(totalPlayersInGame);
const rewardburn = parseInt(amtToBurn)+parseInt(amtToReward)+'%';
const rewardmultiple = ((Number(amtToReward)/100)*Number(intPlayers)).toFixed(1)+'X';
const presentTotalPaid = (Number(TotalRewardAmount)/10**18);
const presentBurnAmount = (Number(TotalBurnAmount)/10**18);
  
 
 


 return (
    <div className={styles["stats-container"]}>
      {StatsData.map((item, index) => {
        return (
          <div key={index} className={styles["return-rate-container"]}>
            <p className={styles["return-rate-title"]}>{item.title}</p>
            { index == 0 
              ? <p className={styles["return-rate-value"]}>{gamecount?.toString() || "0"}</p>
              : [ index == 1
                ? <p className={styles["return-rate-value"]}>{totalPlayersInGame?.toString()}</p>
                : [ index == 2
                  ? <p className={styles["return-rate-value"]}>{presentBurnAmount.toString()+ " SHIB"}</p>
                  : [ index == 3
                    ? <p className={styles["return-rate-value"]}>{presentTotalPaid.toString()+" SHIB"}</p>
                : null ]
                ]
                ]
      }
            <p className={styles["return-rate-status"]}>{item.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
