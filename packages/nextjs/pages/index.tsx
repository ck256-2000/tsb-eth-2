
import { Connect } from "~~/components/connect/Connect";
import { Stats } from "~~/components/stats/Stats";
import { Players } from "~~/components/players/Players";
import type { NextPage } from "next";
import { FireIcon, UserGroupIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
     
      <div className="flex items-center flex-col flex-grow pt-0">
        
      <Connect />
        <div className="flex-grow  w-full mt-1 px-8 py-1">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <FireIcon className="h-12 w-12 fill-secondary" />
              <p>
                BURN SHIB {" "} <br/>
                Chance to get 10X back!
           
                
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <UserGroupIcon className="h-12 w-12 fill-secondary" />
              <p>
                Pick your Burn{" "} <br/>
                Join a Furnace!
                
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <RocketLaunchIcon className="h-12 w-12 fill-secondary" />
              <p>
                Reward Per Burn!{" "}<br/>
                Drive SHIB Price UP!

                
              </p>
            </div>
          </div>
        </div>
      </div>
      <Players />
      <Stats />
    </>
  );
};

export default Home;
