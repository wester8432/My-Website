import { useState } from "react";
import champion from "../../assets/zh_TW/championFull.json";
import item from "../../assets/zh_TW/item.json";
import spell from "../../assets/zh_TW/summoner.json";
import useApi from "../../api";
import IsLoading from "../../components/IsLoading";
const LolSearch = () => {
  let api_key = import.meta.env.VITE_RIOT_API_KEY;
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [matchs, setMatchs] = useState();
  const [puuid, setPuuid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [init, setInit] = useState(true);
  const [error, setError] = useState(null);
  //   const championData = Object.keys(champion.data).map(
  //     (key) => champion.data[key]
  //   );

  const gameTime = (timestamp) => {
    const minutes = Math.floor(timestamp / 60);
    const seconds = timestamp % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const championData = Object.values(champion.data);
  const championDataByName = championData.reduce((acc, champion) => {
    acc[champion.id.toLowerCase()] = champion;
    return acc;
  }, {});
  const itemData = Object.values(item.data);
  const itemDataByName = itemData.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  const summonerSpellDataById = Object.keys(spell.data).reduce((acc, key) => {
    acc[spell.data[key].key] = spell.data[key];
    return acc;
  }, {});

  const RiotSearch = async () => {
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
      const response = await useApi.get(
        `${proxyUrl}https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${api_key}`,
        config
      );
      const puuid = response.data.puuid;
      setPuuid(puuid);
      console.log({ response: response });

      const response2 = await useApi.get(
        `${proxyUrl}https://sea.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?=start=0&count=10&api_key=${api_key}`,
        config
      );
      const matchIds = response2.data;

      const responsePromise = matchIds.map((matchId) =>
        useApi.get(
          `${proxyUrl}https://sea.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${api_key}`,
          config
        )
      );
      const matchDetailsResponses = await Promise.all(responsePromise);
      const matchDetailsData = matchDetailsResponses.map(
        (response) => response.data
      );
      console.log({ matchDetailsData: matchDetailsData[2] });
      setMatchs(matchDetailsData);
      setIsLoading(false);
    } catch (error) {
      let errorMessage = "An error occurred";
      setIsLoading(false);
      console.log({ error: error });
      console.log({ errorMes: error.message });
      setError(error.message);

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "請求失敗";
            break;
          case 400:
            errorMessage = "api_key不存在";
            break;
          case 403:
            errorMessage = "api_key已過期";
            break;
          case 404:
            errorMessage = "找不到使用者";
            break;
          case 415:
            errorMessage = "不支援此資源";
            break;
          case 429:
            errorMessage = "請求過快 請稍後在試";
            break;
          case 500:
            errorMessage = "內部伺服器問題";
            break;
          case 500:
            errorMessage = "取得失敗";
            break;
          case 503:
            errorMessage = "伺服器暫停服務";
            break;
          case 504:
            errorMessage = "請求時間過長";
            break;
          default:
            errorMessage = `Request failed with status code ${error.response.status}`;
        }
      }
      setError(errorMessage);
    }
  };
  return (
    <div className="pt-4">
      <div>
        <p className="pb-4 font-bold">
          英雄聯盟 對戰紀錄查詢
          <br />
          <br />
          如果沒玩英雄聯盟 可以搜尋 N1ro 2486
          <br />
          <span className=" text-red-500">
            ●近期新模式加入 若有遊玩新模式 在查詢上可能會有錯誤
          </span>
        </p>
        <label>
          名稱
          <input
            type="text"
            className=" border-2 ml-4"
            name="gameName"
            onChange={(event) => setGameName(event.target.value)}
            value={gameName}
          />
        </label>
        <label className=" pl-4">
          TagLine
          <input
            type="text"
            className="border-2 ml-4"
            name="tagLine"
            value={tagLine}
            onChange={(event) => setTagLine(event.target.value)}
          />
        </label>
        <button
          className="ml-4 rounded-md bg-sky-300 dark:bg-sky-600 p-1"
          onClick={RiotSearch}
        >
          搜尋
        </button>
      </div>

      <div>
        <ul>
          {!init && isLoading ? (
            <li>
              <IsLoading text="Is Loading..." />
            </li>
          ) : error ? (
            <li className="mt-4 text-red-500">Error:{error}</li>
          ) : (
            matchs &&
            matchs.map((match, i) => {
              //使用者的當場數據
              const userParticipant = match.info.participants.find(
                (participant) => participant.puuid === puuid
              );

              //使用者當場使用英雄
              const championData =
                championDataByName[userParticipant.championName.toLowerCase()];

              //使用者的裝備
              const itemData = championDataByName[userParticipant.itemData];
              const winState = userParticipant.win;
              const items = [
                userParticipant.item0,
                userParticipant.item1,
                userParticipant.item2,
                userParticipant.item3,
                userParticipant.item4,
                userParticipant.item5,
                userParticipant.item6,
              ];

              //召喚師技能
              const summoner1 =
                summonerSpellDataById[String(userParticipant.summoner1Id)];
              const summoner2 =
                summonerSpellDataById[String(userParticipant.summoner2Id)];

              //裝備圖片
              const itemImages = items.map((itemId) => {
                const itemData = item.data[itemId];
                return itemData
                  ? {
                      src: `https://ddragon.leagueoflegends.com/cdn/14.15.1/img/item/${itemData.image.full}`,
                      title: itemData.name,
                    }
                  : null;
              });

              const isRemake = match.info.gameDuration <= 300;

              const team1 = match.info.participants.filter(
                (participant) => participant.teamId === 100
              );
              const team2 = match.info.participants.filter(
                (participant) => participant.teamId === 200
              );

              //   console.log({ userParticipant: userParticipant });
              //   console.log({ win: winState });
              //   console.log({ champion: championData });
              return (
                <li
                  key={i}
                  className={`${
                    isRemake
                      ? " bg-gray-400"
                      : winState
                      ? "bg-sky-300 dark:bg-sky-600"
                      : "bg-red-500"
                  } mt-4 flex items-center flex-wrap py-2`}
                >
                  <div className="flex  w-1/2 xl:w-1/5">
                    <div className="pl-4 flex flex-wrap justify-center">
                      <p className="w-full">{match.info.gameMode}</p>
                      <p>遊戲時間:{gameTime(match.info.gameDuration)}</p>
                    </div>

                    <div className="flex flex-wrap pt-2">
                      <div className="px-2">
                        {/* {championData.name} */}
                        <img
                          title={championData.name}
                          className="w-20 h-20 object-contain"
                          src={`https://ddragon.leagueoflegends.com/cdn/14.15.1/img/champion/${championData.image.full}`}
                        />
                        <p>
                          {userParticipant.kills}/{userParticipant.deaths}/
                          {userParticipant.assists}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex  w-1/2 justify-center xl:w-2/5">
                    <div>
                      <img
                        className="w-12 h-12 object-contain"
                        src={`https://ddragon.leagueoflegends.com/cdn/14.15.1/img/spell/${summoner1.image.full}`}
                        alt={summoner1.name}
                        title={summoner1.name}
                      />
                      <img
                        className="w-12 h-12 object-contain mt-4"
                        src={`https://ddragon.leagueoflegends.com/cdn/14.15.1/img/spell/${summoner2.image.full}`}
                        alt={summoner2.name}
                        title={summoner2.name}
                      />
                    </div>

                    <div className="pl-4 flex items-center">
                      <ul className="flex gap-1">
                        {itemImages.map((itemImg, index) =>
                          itemImg ? (
                            <li key={index} className=" border-1">
                              <img
                                title={itemImg.title}
                                key={index}
                                src={itemImg.src}
                                alt={`item-${index}`}
                                className="w-12 h-12 object-contain"
                              />
                            </li>
                          ) : (
                            <li
                              key={index}
                              className="w-12 h-12 border bg-slate-200"
                            ></li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="flex min-w-[500px] w-full items-center justify-center mt-8 xl:mt-0xl:justify-end  xl:w-2/5">
                    <div className="team1 px-4 w-[250px] overflow-hidden whitespace-nowrap">
                      {team1.map((participant, index) => {
                        const champion =
                          championDataByName[
                            participant.championName.toLowerCase()
                          ];
                        const isCurrentUser = participant.puuid === puuid;
                        console.log({
                          cham: championDataByName[participant.championName],
                          champion: participant.championName,
                        });
                        return (
                          <div key={index} className="flex items-center pt-2">
                            {champion && (
                              <>
                                <img
                                  className="w-12 h-12 object-contain"
                                  src={`https://ddragon.leagueoflegends.com/cdn/14.15.1/img/champion/${champion.image.full}`}
                                  alt={champion.name}
                                  title={champion.name}
                                />
                                <div
                                  className={`truncate pl-4 ${
                                    isCurrentUser ? "font-bold text-white" : ""
                                  }`}
                                  title={participant.riotIdGameName}
                                >
                                  {participant.riotIdGameName}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="team2 px-4 w-[250px] overflow-hidden whitespace-nowrap">
                      {team2.map((participant, index) => {
                        const champion =
                          championDataByName[
                            participant.championName.toLowerCase()
                          ];
                        const isCurrentUser = participant.puuid === puuid;
                        return (
                          <div key={index} className="flex pt-2 ">
                            {champion && (
                              <>
                                <img
                                  className="w-12 h-12 object-contain"
                                  src={`https://ddragon.leagueoflegends.com/cdn/14.15.1/img/champion/${champion.image.full}`}
                                  alt={champion.name}
                                  title={champion.name}
                                />
                                <div
                                  className={`truncate pl-4 ${
                                    isCurrentUser ? "font-bold text-white" : ""
                                  }`}
                                  title={participant.riotIdGameName}
                                >
                                  {participant.riotIdGameName}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default LolSearch;
