import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import LolSearch from "../SubPage/portfolio/LolSearch";
import LolFreeHero from "../SubPage/portfolio/LolFreeHero";
import VideoPlayer from "../SubPage/portfolio/VideoPlayer";
import style from "../scss/Animation.module.scss";
import ShoppingWeb from "../SubPage/portfolio/ShoppingWeb";
import Comprehensive from "../SubPage/portfolio/GithubSearch";
const Portfolio = () => {
  const portfolio = [
    {
      name: "英雄聯盟戰績查詢",
      ele: <LolSearch />,
      description: "第三方API串接",
    },
    {
      name: "英雄聯盟免費英雄資訊",
      ele: <LolFreeHero />,
      description: "第三方API串接",
    },
    { name: "播放器", ele: <VideoPlayer />, description: "自製播放器" },
    { name: "電商作品", ele: <ShoppingWeb />, description: "電商作品" },
    {
      name: "GithubSearch",
      ele: <Comprehensive />,
      description: "Github搜尋API",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState([]);

  const toggleExpand = (index) => {
    setExpandedIndex((prevExpandedIndices) => {
      if (prevExpandedIndices && prevExpandedIndices.includes(index)) {
        return prevExpandedIndices.filter((i) => i !== index);
      } else {
        return [...(prevExpandedIndices || []), index];
      }
    });
  };
  return (
    <div className={`flex flex-wrap justify-center ${style.portfolioList}`}>
      <ul className="flex justify-center flex-wrap gap-4 w-full">
        {portfolio.map((item, i) => {
          const isExpanded = expandedIndex.includes(i);
          return (
            <li
              key={i}
              className={`${
                style.animationLi
              } mt-8 border-2  flex-row min-w-[350px] transition duration-300 
                ${isExpanded ? "w-full" : "w-1/4"}`}
            >
              <div
                onClick={() => toggleExpand(i)}
                className=" cursor-pointer h-10 bg-sky-300 dark:bg-sky-600 sticky"
              >
                <p className="flex items-center justify-between px-8 border h-full">
                  {item.name}
                  <span className=" font-bold">
                    {isExpanded ? <FaMinus /> : <FaPlus />}
                  </span>
                </p>
              </div>
              {expandedIndex && !expandedIndex.includes(i) && (
                <div className="items-center text-center">
                  {item.description}
                </div>
              )}

              {expandedIndex && expandedIndex.includes(i) && (
                <div className="my-2">{item.ele}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Portfolio;
