
import React, {useCallback} from "react";
import type { NextPage } from "next";

import { Connect } from "~~/components/connect/Connect";
import { Stats } from "~~/components/stats/Stats";
import { MetaHeader } from "~~/components/MetaHeader";
import { UntilBurn } from "~~/components/stats/UntilBurn";
import { StatCube } from "~~/components/stats/StatCube";
import { ContractTSB } from "~~/components/example-ui/ContractTSB";
import { ContractTSBSHIB } from "~~/components/example-ui/ContractTSBSHIB";
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";
import { useAccount } from "wagmi";
import {
  useScaffoldContract,
  useScaffoldContractRead,
} from "~~/hooks/scaffold-eth";



const TrillionShib: NextPage = () => {

 

  const { address } = useAccount();
 // const { data: tsbContract } = useScaffoldContract({ contractName: "TSBGame01" });

  const { data: gamecount} = useScaffoldContractRead({ 
    contractName: "TSBGame01",
    functionName: "getTotalGames",
  });

  const { data: totalPlayersInGame } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getMaxPlayersCount",
  });

  const { data: currentplayers } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getPlayersCount",
  });

  const { data: amtToBurn} = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getamountBurn",
  });

  const { data: amtToReward } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getamountReward",
  });

  const { data: amtToAdmin} = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getamountAdmin",
  });

  const { data: entryfee } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "entryfee",
  });

  const { data: gameId } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "gameId",
  });

  const { data: tourneyId } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "tourneyID",
  });

  const { data: gamesInTourney } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getGamesInTourney",
  });

  const { data: totalAmtBurned } = useScaffoldContractRead({
    contractName: "TSBGame01",
    functionName: "getTotalAmountBurned",
  });

const GamesUntilBurn = parseInt(gamesInTourney)-parseInt(gameId)+1;
const thisGameBurnAmount = (Number(amtToBurn)/100)*Number(entryfee)*Number(gamesInTourney)/10**18;
const playersNeeded = parseInt(totalPlayersInGame)-parseInt(currentplayers);
const rewardodds = (1/parseInt(totalPlayersInGame)*100).toFixed(1)+'%';
const intPlayers = parseInt(totalPlayersInGame);
const rewardburn = parseInt(amtToBurn)+parseInt(amtToReward)+'%';
const rewardmultiple = ((Number(amtToReward)/100)*Number(intPlayers)).toFixed(1)+'X';

 



  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    return;
  }, []);

  return (
    <>
      <MetaHeader
        title="Trillion SHIB Burn"
        description="Let's burn 20 Trillion SHIB!"
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>

      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },

          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            size: {
              value: 6,
              random: true,
              anim: {
                speed: 4,
                size_min: 0.3,
              },
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#ffffff",
              },
              polygon: {
                nb_sides: 5,
              },
            },
            color: {
              value: ["#FF0000", "#ff6600", "#ff9900", "#ffcc00", "#fFFF00"],
            },
            opacity: {
              value: 0.6,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 2,
              direction: "top",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
              },
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: false,
              },
            },
          },
          detectRetina: true,
        }}
      />

<div className="flex-grow lg:grid-cols-1">
<Connect />
</div>
      <div className="grid lg:grid-cols-3 flex-grow" >
        <div className="flex flex-col  py-10 items-center align-top "><UntilBurn />
        - 
          <StatCube HeaderText="Tourneys" footerText="Played" numberToReport={tourneyId?.toString()} />
          -
          <StatCube HeaderText="This Burn" footerText="Amount" numberToReport={thisGameBurnAmount.toString()} /> </div>
        <div className="flex flex-col  items-center align-top "><ContractTSBSHIB />
        </div>
        <div className="flex flex-col  py-10 items-center align-top ">
          <StatCube HeaderText="Burners" footerText="Needed" numberToReport={playersNeeded.toString()} />
           - 
          <StatCube HeaderText="Games Till " footerText="Most Charred Inu" numberToReport={GamesUntilBurn.toString()} />
          -
          <StatCube HeaderText="Smart Contract" footerText="Lifetime Burn" numberToReport={(Number(totalAmtBurned)/10**18)?.toString()} /> </div>
        
      </div>
      <div className="flex-grow lg:grid-cols-1">
        <Stats />
      </div>
  
    </>
  );
};

export default TrillionShib;
