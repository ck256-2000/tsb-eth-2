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
  useScaffoldContractWrite,
  useScaffoldSigner,

} from "~~/hooks/scaffold-eth";
import { ethers } from "ethers";

const fromWei = ethers.utils.formatEther;
const toWei = ethers.utils.parseEther;

import { Bytes32Input, IntegerInput } from "../scaffold-eth";

const MARQUEE_PERIOD_IN_SEC = 15;




export const ContractTSBSHIB = () => {
  const { address } = useAccount();
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isRightDirection, setIsRightDirection] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(0);
  const [entryfeeplayer, setEntryfeeplayer] = useState(0);
  const [tsbcontractlocal, setTsbcontractlocal] = useState(0);


const { data: ShibContract } = useScaffoldContract({ contractName: "Shib" });
const { data: tsbContract } = useScaffoldContract({ contractName: "TSBGame01" });
console.log("tsbContract: ", tsbContract);

//setTsbcontractlocal(tsbContract.address);


  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);



  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "TSBGame01",
    functionName: "joinGameSHIB",
    args: [toWei(entryfeeplayer.toString()), "0x5368696200000000000000000000000000000000000000000000000000000000"],
    
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: PayShibApprove, isLoading: ApproveLoading} = useScaffoldContractWrite({
    contractName: "Shib",
    functionName: "approve",
    args: [tsbcontractlocal, toWei(entryfeeplayer.toString())],
    value: 0,
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
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
 //await setEntryfeeplayer(fromWei(entryfee)); 
  //PayShibApprove()
  writeAsync()

};

const approveShibSpend = async () => {
  await setTsbcontractlocal(tsbContract.address);
  await setEntryfeeplayer((fromWei(entryfee))); 
  //ShibContract.connect(address).approve(tsbContract?.address, toWei(entryfeeplayer.toString()));
  console.log("📡 Approve Shib Contract", ShibContract?.address);
  console.log('Current Player Address: ', address);
  console.log("TSB Contract Address: ", tsbcontractlocal);

  console.log("📡 Approve Shib Spend", entryfeeplayer);
  PayShibApprove();
 
 };





  const { showAnimation } = useAnimationConfig(totalPlayersInGame);

  const showTransition = transitionEnabled 

  useEffect(() => {
    if (tsbContract && tsbContract.address) {
      setTsbcontractlocal(tsbContract.address);
    }
  }, [tsbContract]);

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


          <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                    isLoading ? "loading" : ""
                  }`}
                  onClick={() => {approveShibSpend()}}
                >
                  {!isLoading && (
                    <>
                      SHIB!<ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
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
