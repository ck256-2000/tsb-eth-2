import React from "react";
import { useEffect, useRef, useState } from "react";
import styles from "../stats/statCube.module.css";
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

export const StatCube = ({HeaderText, numberToReport, footerText}) => {

  const { address } = useAccount();
 
  return (
    <div className={styles["player-container"]}>
     
    
      
     <div className="bg-secondary border border-primary rounded-xl flex">
            <div  className=" p-2 py-1 text-2xl border-primary">{HeaderText}</div>
      </div>
            
    
      
        
       <div className="text-8xl" >{numberToReport} </div>
      
      <div className={styles["player-description-container"]}>
        
        <div className={styles["player-description-details"]}>
          
          <div className="p-2 py-1 text-2xl border-primary flex items-end">{footerText}</div>
          <div className={styles["player-address"]}>
            <p className={styles["player-address-text"]}></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCube;
