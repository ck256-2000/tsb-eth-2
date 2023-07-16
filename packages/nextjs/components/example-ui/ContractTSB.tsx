import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAccount } from "wagmi";
import {
  useAnimationConfig,
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
  useScaffoldContractWrite
} from "~~/hooks/scaffold-eth";
import { ethers } from "ethers";

const fromWei = ethers.utils.formatEther;
const toWei = ethers.utils.parseEther;

import { IntegerInput } from "../scaffold-eth";

const MARQUEE_PERIOD_IN_SEC = 15;

export const ContractTSB = () => {
  const { address } = useAccount();
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isRightDirection, setIsRightDirection] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(0);
  const [entryfeeplayer, setEntryfeeplayer] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);

  const { writeAsync, isLoading  } = useScaffoldContractWrite({
    contractName: "TSBGame01",
    functionName: "joinGame",
    args: [],
    value: ethers.utils.formatEther(entryfeeplayer),
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

 



  const { data: totalCounter } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "totalCounter",
  });

  const { data: currentGreeting, isLoading: isGreetingLoading } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "greeting",
  });

  const { data: totalGames } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getTotalGames",
  });

  
  const { data: totalPlayersInGame } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getMaxPlayersCount",
  });

  const { data: amtToReward } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getamountReward",
  });

  const { data: currentplayers } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getPlayersCount",
  });

  const { data: entryfee } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "entryfee",
  });

  const { data: gameId } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "gameId",
  });

  const lplayercount = currentplayers;
  const rewardmultiple = ((Number(amtToReward)/100)*Number(totalPlayersInGame)).toFixed(1)+'X';
  const rewardodds = (1/parseInt(totalPlayersInGame)*100).toFixed(1)+'%';


const twoFunctions = async () => {
 await setEntryfeeplayer(entryfee); 
  writeAsync()

};




  useScaffoldEventSubscriber({
    contractName: "TSBGame01",
    eventName: "PlayerJoined",
    listener: logs => {
      logs.map(log => {
        const { gameId, player} = log.args;
        console.log("📡 GreetingChange event", gameId, player[0]);
      });
    },
  });

  const {
    data: myGreetingChangeEvents,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "TSBGame01",
    eventName: "PlayerJoined",
    fromBlock: process.env.NEXT_PUBLIC_DEPLOY_BLOCK ? BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) : 0n,
    filters: { player: address},
    blockData: true,
  });

  console.log("Events:", isLoadingEvents, errorReadingEvents, myGreetingChangeEvents);

  const { data: tsbContract } = useScaffoldContract({ contractName: "TSBGame01" });
  console.log("tsbContract: ", tsbContract);

  const { showAnimation } = useAnimationConfig(totalPlayersInGame);

  const showTransition = transitionEnabled && !!currentGreeting && !isGreetingLoading;

  useEffect(() => {
    if (transitionEnabled && containerRef.current && greetingRef.current) {
      setMarqueeSpeed(
        Math.max(greetingRef.current.clientWidth, containerRef.current.clientWidth) / MARQUEE_PERIOD_IN_SEC,
      );
    }
    //setEntryfeeplayer(entryfee); 
  }, [transitionEnabled, containerRef, greetingRef]);

  return (
    <div className="flex flex-col justify-center items-center  bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div
        className={`flex flex-col max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full ${
          showAnimation ? "animate-zoom" : ""
        }`}
      >
        <div className="flex justify-between w-full">
         
        <div className="bg-secondary border border-primary rounded-xl flex">
            <div className="p-2 py-1 border-r border-primary align-middle flex items-end">Round</div>
            <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {gameId?.toString() || "0"} 
            </div>
          </div>

          <div className="bg-secondary border border-primary rounded-xl flex">
            <div className="p-2 py-1 border-r border-primary flex items-end">Burners Ready!</div>
            <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {lplayercount?.toString() || "0"} / {totalPlayersInGame?.toString() || "0"}
            </div>
          </div>
        </div>

        <div className="mt-3 border h-  bg-red bg-neutral rounded-3xl text-secondary  overflow-hidden text-[116px] whitespace-nowrap w-full uppercase tracking-tighter font-bai-jamjuree leading-tight">
          
        
            
            <div className="flex justify-center">{rewardmultiple}</div>
              <p className="flex justify-center text-[40px]">reward multiple</p>
            <div className="flex justify-center"> {Number(entryfee)/10**18?.toString() || " " }</div>
              <p className="flex justify-center text-[40px]">SHIB entry fee</p>
          
        </div>

        <div className="mt-3 flex items-end justify-between">
         
          <div className="flex flex-col">
          <p className="flex font-bai-jamjuree justify-center text-[40px]">odds:{rewardodds} </p>
          </div>


      




        
          <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                    isLoading ? "loading" : ""
                  }`}
                  onClick={() => {twoFunctions()}}
                >
                  {!isLoading && (
                    <>
                      Burn!<ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

          
        </div>
      </div>
    </div>
  );
};
