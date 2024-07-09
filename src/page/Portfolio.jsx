import { useState } from "react";
import LolSearch from "../SubPage/portfolio/LolSearch";
import LolFreeHero from "../SubPage/portfolio/LolFreeHero";
import { FaPlus, FaMinus } from "react-icons/fa6";
const Portfolio = () => {
  const portfolio = [
    { name: "英雄聯盟戰績查詢", ele: <LolSearch /> },
    { name: "英雄聯盟免費英雄資訊", ele: <LolFreeHero /> },
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
    <div className="mt-8">
      <ul>
        {portfolio.map((item, i) => {
          return (
            <li key={i} className="mt-8 border-2 ">
              <div
                onClick={() => toggleExpand(i)}
                className=" cursor-pointer h-10 bg-sky-300 dark:bg-sky-600"
              >
                <p className="flex items-center justify-between px-8 border h-full">
                  {item.name}
                  <span className=" font-bold">
                    {expandedIndex && expandedIndex.includes(i) ? (
                      <FaMinus />
                    ) : (
                      <FaPlus />
                    )}
                  </span>
                </p>
              </div>

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
