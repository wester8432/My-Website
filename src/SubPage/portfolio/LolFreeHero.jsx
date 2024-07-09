import champion from "../../assets/zh_TW/championFull.json";
import useApi from "../../api";
import { useState } from "react";
import IsLoading from "../../components/IsLoading";
const LolFreeHero = () => {
  let api_key = import.meta.env.VITE_RIOT_API_KEY;

  const [init, setInit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [freeChampion, setFreeChampion] = useState();
  const [freeChampionIdsForNew, setFreeChampionIdsForNew] = useState();

  const championData = Object.values(champion.data);
  const championDataById = championData.reduce((acc, champion) => {
    acc[champion.key] = champion;
    return acc;
  }, {});

  const fetchData = async () => {
    setInit(false);
    setIsLoading(true);
    const proxyUrl = "https://cors.eu.org/";

    const config = {
      headers: {
        origin: "https://wester8432.github.io/My-WebSite/",
        "x-requested-with": "XMLHttpRequest",
      },
    };
    try {
      const res = await useApi(
        `${proxyUrl}https://tw2.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${api_key}`,
        config
      );
      setFreeChampion(res.data.freeChampionIds);
      setFreeChampionIdsForNew(res.data.freeChampionIdsForNewPlayers);
      setIsLoading(false);
      console.log(res.data);
    } catch (error) {
      let errorMessage = "An error occurred";
      setIsLoading(false);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "請求失敗";
            break;
          case 401:
            errorMessage = "無效的api_key";
            break;
          case 403:
            errorMessage = "api_key已過期";
            break;
          case 404:
            errorMessage = "找不到資料";
            break;
          case 405:
            errorMessage = "方法不允許";
            break;
          case 415:
            errorMessage = "不支援此資源";
            break;
          case 429:
            errorMessage = "請求過多";
            break;
          case 500:
            errorMessage = "內部伺服器錯誤";
            break;
          case 502:
            errorMessage = "取得失敗";
            break;
          case 503:
            errorMessage = "伺服器暫停服務";
            break;
          case 504:
            errorMessage = "請求時間過長";
            break;
          default:
            errorMessage = "An error occurred";
        }
      }
      console.log(error);
    }
  };
  return (
    <div>
      <button
        onClick={fetchData}
        className=" bg-sky-300 dark:bg-sky-600 rounded-md p-1"
      >
        取得本周免費英雄 0633
      </button>
      {!init && isLoading ? (
        <div className="w-full">
          <IsLoading text="Is Loading..." />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        freeChampion && (
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
        )
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
