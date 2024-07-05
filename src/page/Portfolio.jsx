import { useState } from "react";
import LolSearch from "../SubPage/portfolio/LolSearch";
import LolFreeHero from "../SubPage/portfolio/LolFreeHero";
const Portfolio = () => {
  const portfolio = [
    { name: "英雄聯盟戰績查詢", ele: <LolSearch /> },
    { name: "英雄聯盟免費英雄資訊", ele: <LolFreeHero /> },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  return (
    <div className="mt-8">
      <ul>
        {portfolio.map((item, i) => {
          return (
            <li
              key={i}
              onClick={() => toggleExpand(i)}
              className="mt-8 border-2 cursor-pointer"
            >
              <p className="flex justify-between px-8 border">
                {item.name}
                <span>{expandedIndex === i ? "-" : "+"}</span>
              </p>

              {expandedIndex === i && (
                <div className="my-8" onClick={(e) => e.stopPropagation()}>
                  {item.ele}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Portfolio;
