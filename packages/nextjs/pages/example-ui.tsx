
import React, {useCallback} from "react";
import type { NextPage } from "next";
import { Connect } from "~~/components/connect/Connect";
import { Stats } from "~~/components/stats/Stats";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractDataCurrentBurn} from "~~/components/example-ui/ContractDataCurrentBurn";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";
import { ContractPlay } from "~~/components/example-ui/ContractPlay";
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";

const ExampleUI: NextPage = () => {


  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    return;
  }, []);

  return (
    <>
      <MetaHeader
        title="TSB UI - Scaffold - ETH 2  "
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
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
              value: ["#ff0000", "#ff6600", "#ff9900", "#ffcc00", "#ffff00"],
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
        <div><ContractPlay /></div>
        <div><ContractDataCurrentBurn />
        </div>
        <div><ContractInteraction /> </div>
        
        
        
        
        
      </div>
      <div className="flex-grow lg:grid-cols-1">
        <Stats />
      </div>
  
    </>
  );
};

export default ExampleUI;
