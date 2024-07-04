import { useState } from "react";
import champion from "../../assets/zh_TW/championFull.json";
import item from "../../assets/zh_TW/item.json";
import spell from "../../assets/zh_TW/summoner.json";
import useApi from "../../api";
const RiotApi = () => {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [matchs, setMatchs] = useState();
  const [puuid, setPuuid] = useState("");
  let api_key = import.meta.env.VITE_RIOT_API_KEY;

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
    acc[champion.id] = champion;
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
    try {
      const response = await useApi.get(
        `/riot/asia/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`
      );
      const puuid = response.data.puuid;
      setPuuid(puuid);
      console.log({ response: response });

      // const response2 = await useApi.get(
      //   `/riot/sea/lol/match/v5/matches/by-puuid/${puuid}/ids?=start=0&count=20&api_key=${api_key}`
      // );
      // const matchIds = response2.data;

      // const responsePromise = matchIds.map((matchId) =>
      //   useApi.get(
      //     `/riot/sea/lol/match/v5/matches/${matchId}?api_key=${api_key}`
      //   )
      // );
      // const matchDetailsResponses = await Promise.all(responsePromise);
      // const matchDetailsData = matchDetailsResponses.map(
      //   (response) => response.data
      // );
      // setMatchs(matchDetailsData);
      // console.log({ matchDetailsData: matchDetailsData });
    } catch (error) {
      console.log({ error: error });
    }
  };
  return (
    <div className="pt-4">
      <div>
        <p className="pb-4">英雄聯盟 對戰紀錄查詢1020</p>
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
        <button className="ml-4 rounded-md bg-sky-300 p-1" onClick={RiotSearch}>
          搜尋
        </button>
      </div>
      <div>
        <ul>
          {matchs &&
            matchs.map((match, i) => {
              //使用者的當場數據
              const userParticipant = match.info.participants.find(
                (participant) => participant.puuid === puuid
              );
              //使用者當場使用英雄
              const championData =
                championDataByName[userParticipant.championName];

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
                      src: `https://ddragon.leagueoflegends.com/cdn/14.13.1/img/item/${itemData.image.full}`,
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
                  <div className="flex w-1/5">
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
                          src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${championData.image.full}`}
                        />
                        <p>
                          {userParticipant.kills}/{userParticipant.deaths}/
                          {userParticipant.assists}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-2/5 justify-center">
                    <div>
                      <img
                        className="w-12 h-12 object-contain"
                        src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/spell/${summoner1.image.full}`}
                        alt={summoner1.name}
                        title={summoner1.name}
                      />
                      <img
                        className="w-12 h-12 object-contain mt-4"
                        src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/spell/${summoner2.image.full}`}
                        alt={summoner2.name}
                        title={summoner2.name}
                      />
                    </div>

                    <div className="pl-4 flex items-center">
                      <ul className="flex gap-1">
                        {itemImages.map((itemImg, index) =>
                          itemImg ? (
                            <li className=" bg-slate-100">
                              <img
                                title={itemImg.title}
                                key={index}
                                src={itemImg.src}
                                alt={`item-${index}`}
                                className="w-12 h-12 object-contain"
                              />
                            </li>
                          ) : (
                            <div className="w-12 h-12 border bg-slate-200"></div>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="flex min-w-[500px] items-center justify-end w-2/5">
                    <div className="team1 px-4 w-[250px] overflow-hidden whitespace-nowrap">
                      {team1.map((participant, index) => {
                        const champion =
                          championDataByName[participant.championName];
                        const isCurrentUser = participant.puuid === puuid;
                        return (
                          <div key={index} className="flex items-center pt-2">
                            <img
                              className="w-12 h-12 object-contain"
                              src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${champion.image.full}`}
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
                          </div>
                        );
                      })}
                    </div>

                    <div className="team2 px-4 w-[250px] overflow-hidden whitespace-nowrap">
                      {team2.map((participant, index) => {
                        const champion =
                          championDataByName[participant.championName];
                        const isCurrentUser = participant.puuid === puuid;
                        return (
                          <div key={index} className="flex pt-2 ">
                            <img
                              className="w-12 h-12 object-contain"
                              src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${champion.image.full}`}
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
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      {/* <ul className="flex flex-wrap gap-4 justify-center">
        {championData.map((champion) => {
          return (
            <li className=" ">
              <div className=" bg-slate-200">
                <p>{champion.name}</p>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${champion.image.full}`}
                />
              </div>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};

export default RiotApi;
