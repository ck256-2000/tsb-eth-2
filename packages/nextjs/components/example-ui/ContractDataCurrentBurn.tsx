import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { useAccount } from "wagmi";
import {
  useAnimationConfig,
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";


const MARQUEE_PERIOD_IN_SEC = 15;

export const ContractDataCurrentBurn = () => {
  const { address } = useAccount();
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isRightDirection, setIsRightDirection] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);

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

  const lplayercount = currentplayers;
  const rewardmultiple = ((Number(amtToReward)/100)*Number(totalPlayersInGame)).toFixed(1)+'X';
 

/*
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

  */

  const {
    data: myGreetingChangeEvents,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "TSBGame01",
    eventName: "PlayerJoined",
    fromBlock: process.env.NEXT_PUBLIC_DEPLOY_BLOCK ? BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) : 0n,
  
    blockData: true,
  });

  console.log("Events:", isLoadingEvents, errorReadingEvents, myGreetingChangeEvents);

  const { data: tsbContract } = useScaffoldContract({ contractName: "TSBGame01" });
  console.log("yourContract: ", tsbContract);

  const { showAnimation } = useAnimationConfig(totalPlayersInGame);

  const showTransition = transitionEnabled && !!currentGreeting && !isGreetingLoading;

  useEffect(() => {
    if (transitionEnabled && containerRef.current && greetingRef.current) {
      setMarqueeSpeed(
        Math.max(greetingRef.current.clientWidth, containerRef.current.clientWidth) / MARQUEE_PERIOD_IN_SEC,
      );
    }
  }, [transitionEnabled, containerRef, greetingRef]);

  return (
    <div className="flex flex-col justify-center items-center  bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div
        className={`flex flex-col max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full ${
          showAnimation ? "animate-zoom" : ""
        }`}
      >
        <div className="flex justify-between w-full">
          <button
            className="btn btn-circle btn-ghost relative bg-center bg-[url('/assets/switch-button-on.png')] bg-no-repeat"
            onClick={() => {
              setTransitionEnabled(!transitionEnabled);
            }}
          >
            <div
              className={`absolute inset-0 bg-center bg-no-repeat bg-[url('/assets/switch-button-off.png')] transition-opacity ${
                transitionEnabled ? "opacity-0" : "opacity-100"
              }`}
            />
          </button>
          <div className="bg-secondary border border-primary rounded-xl flex">
            <div className="p-2 py-1 border-r border-primary flex items-end">Burners Ready!</div>
            <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {lplayercount?.toString() || "0"} / {totalPlayersInGame?.toString() || "0"}
            </div>
          </div>
        </div>

        <div className="mt-3 border border-primary bg-neutral rounded-3xl text-secondary  overflow-hidden text-[116px] whitespace-nowrap w-full uppercase tracking-tighter font-bai-jamjuree leading-tight">
          <div className="relative overflow-x-hidden" ref={containerRef}>
            {/* for speed calculating purposes */}
            <div className="absolute -left-[9999rem]" ref={greetingRef}>
              <div className="px-4">Burning: {entryfee?.toString() || " "}</div>
            </div>
            {new Array(3).fill("").map((_, i) => {
              const isLineRightDirection = i % 2 ? isRightDirection : !isRightDirection;
              return (
                <Marquee
                  key={i}
                  direction={isLineRightDirection ? "right" : "left"}
                  gradient={false}
                  play={showTransition}
                  speed={marqueeSpeed}
                  className={i % 2 ? "-my-10" : ""}
                >
                  <div className="px-4">Burn:{entryfee?.toString() || " "} Reward:{rewardmultiple.toString() }</div>
                </Marquee>
              );
            })}
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <button
            className={`btn btn-circle btn-ghost border border-primary hover:border-primary w-12 h-12 p-1 bg-neutral flex items-center ${
              isRightDirection ? "justify-start" : "justify-end"
            }`}
            onClick={() => {
              if (transitionEnabled) {
                setIsRightDirection(!isRightDirection);
              }
            }}
          >
            <div className="border border-primary rounded-full bg-secondary w-2 h-2" />
          </button>
          <div className="w-44 p-0.5 flex items-center bg-neutral border border-primary rounded-full">
            <div
              className="h-1.5 border border-primary rounded-full bg-secondary animate-grow"
              style={{ animationPlayState: showTransition ? "running" : "paused" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
