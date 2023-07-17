import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";

import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAccount } from "wagmi";
import { 
  useScaffoldContract, 
  useScaffoldContractRead, 
  useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { etherUnits } from "viem";

export const ContractPlay = () => {
  const { address } = useAccount();
  const [visible, setVisible] = useState(true);
  const [newGreeting, setNewGreeting] = useState("");
  const [entryfeeplayer, setEntryfeeplayer] = useState(0);

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "TSBGame01",
    functionName: "joinGame",
    args: [],
    value: ethers.utils.formatEther(entryfeeplayer),
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { data: entryfee, isLoading: isGreetingLoading } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "entryfee",
  });

  return (
    <div className="flex relative pb-10">
      
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
       

        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black">Enter this Burn!!</span>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type="text"
              placeholder="Write your greeting here"
              className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
              onChange={e => setEntryfeeplayer((Number(e.target.value)))}
            />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                    isLoading ? "loading" : ""
                  }`}
                  onClick={() => writeAsync()}
                >
                  {!isLoading && (
                    <>
                      Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Price:</span>
            <div className="badge badge-warning">{entryfee?.toString() || "0.00"} ETH + Gas</div>
          </div>
        </div>
      </div>
    </div>
  );
};
