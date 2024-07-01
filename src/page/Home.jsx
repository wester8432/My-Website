import { useState } from "react";
import selfPhoto from "../assets/1537538731442.jpg";
import SelfInfo from "./info/SelfInfo";
import Experience from "./info/Experience";
import ProjectInfo from "./info/ProjectInfo";

const Home = () => {
  const [switchInfo, setSwitchInfo] = useState("自傳");
  return (
    <>
      <div className="flex flex-wrap w-full items-start bg-slate-900 pt-4">
        <div className=" w-1/3 min-w-[330px]  max-[1024px]:w-full">
          <img src={selfPhoto} />
          <div className="flex justify-center text-white">
            <ul>
              <li className=" w-full">姓名:陳虹諭</li>
              <li className="w-full">技能:React、Redux</li>
              <li className="w-full">興趣:遊戲、動畫、財經研究</li>
            </ul>
          </div>
        </div>
        <div className=" w-2/3 bg-slate-900 max-lg:w-full max-lg:pt-8">
          <div className=" text-white">
            <ul className="flex gap-4 justify-center">
              <li
                className={`${
                  switchInfo == "自傳" ? " text-yellow-500 underline" : ""
                } cursor-pointer`}
                onClick={() => {
                  setSwitchInfo("自傳");
                }}
              >
                自傳
              </li>
              <li
                className={`${
                  switchInfo == "經歷" ? " text-yellow-500 underline" : ""
                } cursor-pointer`}
                onClick={() => {
                  setSwitchInfo("經歷");
                }}
              >
                經歷
              </li>
              <li
                className={`${
                  switchInfo == "專案技能說明"
                    ? " text-yellow-500 underline"
                    : ""
                } cursor-pointer`}
                onClick={() => {
                  setSwitchInfo("專案技能說明");
                }}
              >
                專案技能說明
              </li>
            </ul>
          </div>
          <div className="  text-white  p-4">
            {switchInfo == "自傳" && <SelfInfo />}
            {switchInfo == "經歷" && <Experience />}
            {switchInfo == "專案技能說明" && <ProjectInfo />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
