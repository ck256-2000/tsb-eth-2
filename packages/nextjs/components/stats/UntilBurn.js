import React from "react";
import { useEffect, useRef, useState } from "react";
import styles from "../stats/UntilBurnStyles.module.css";
import {StatsData} from "../../constants/constants";
import Image from "next/image";
import { useAccount } from "wagmi";
import {
  useAnimationConfig,
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";

export const UntilBurn = ({HeaderText, numberToReport, footText}) => {

  const { address } = useAccount();
  const { data: tsbContract } = useScaffoldContract({ contractName: "TSBGame01" });

  const { data: amtToBurn} = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getamountBurn",
  });

  const { data: entryfee } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "entryfee",
  });

  const { data: gameId } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "gameId",
  });

  const { data: gamesInTourney } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getGamesInTourney",
  });

const GamesUntilBurn = parseInt(gamesInTourney)-parseInt(gameId)+1;
const BurnAmount = (Number(amtToBurn)/100)*Number(entryfee)*Number(gamesInTourney);

  return (
    <div className={styles["player-container"]}>
     

      <div className="bg-secondary border border-primary rounded-xl flex">
            <div className="p-2 py-1 text-2xl border-r border-primary flex items-end">Games Till Burn</div>
           
          </div>
      <div className={styles["player-icon"]} >
        
       <div className="text-8xl" >{GamesUntilBurn} </div>
      </div>
      <div className={styles["player-description-container"]}>
        <div className={styles["player-description-icon"]}>
          <Image width={40} height={40} src="/images/player-icon.png" alt="background"/>
        </div>
        <div className={styles["player-description-details"]}>
          <div className={styles["player-position"]}>
            <p className={styles["player-position-text"]}>
              Burn Amount : {BurnAmount/10**18}
            </p>
          </div>
          <div className={styles["player-address"]}>
            <p className={styles["player-address-text"]}></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UntilBurn;
