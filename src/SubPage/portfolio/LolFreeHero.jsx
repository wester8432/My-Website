import champion from "../../assets/zh_TW/championFull.json";
import useApi from "../../api";
import { useState } from "react";
const LolFreeHero = () => {
  let api_key = import.meta.env.VITE_RIOT_API_KEY;

  const [freeChampion, setFreeChampion] = useState();
  const [freeChampionIdsForNew, setFreeChampionIdsForNew] = useState();

  const championData = Object.values(champion.data);
  const championDataById = championData.reduce((acc, champion) => {
    acc[champion.key] = champion;
    return acc;
  }, {});

  const fetchData = async () => {
    const proxyUrl = "https://cors.eu.org/";

    const config = {
      headers: {
        origin: "https://wester8432.github.io/My-WebSite/",
        "x-requested-with": "XMLHttpRequest",
      },
    };
    const res = await useApi(
      `${proxyUrl}https://tw2.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${api_key}`,
      config
    );
    setFreeChampion(res.data.freeChampionIds);
    setFreeChampionIdsForNew(res.data.freeChampionIdsForNewPlayers);
    console.log(res.data);
  };
  return (
    <div>
      <button
        onClick={fetchData}
        className=" bg-sky-300 dark:bg-sky-600 rounded-md p-1"
      >
        取得本周免費英雄 0633
      </button>
      {freeChampion && (
        <div className="mt-8">
          <p className=" font-bold">免費英雄列表</p>
          <ul className="flex flex-wrap justify-center gap-2 ">
            {freeChampion.map((champion, i) => {
              const championData = championDataById[champion.toString()];
              return (
                <li key={champion} className="mt-4">
                  <img
                    className=" object-contain"
                    src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${championData.image.full}`}
                    alt={championData.name}
                  />
                  <p>{championData.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {freeChampionIdsForNew && (
        <div className="mt-7">
          <p className="font-bold">新手免費英雄列表</p>
          <ul className="flex flex-wrap justify-center gap-2 ">
            {freeChampionIdsForNew.map((champion, i) => {
              const championData = championDataById[champion.toString()];
              return (
                <li key={champion} className="mt-4">
                  <img
                    className=" object-contain"
                    src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${championData.image.full}`}
                    alt={championData.name}
                  />
                  <p>{championData.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LolFreeHero;
