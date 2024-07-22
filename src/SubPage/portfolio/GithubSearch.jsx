"use client";
import React, { useState } from "react";
import useApi from "../../api.js";

const Comprehensive = () => {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [prevPageUrl, setPrevPageUrl] = useState("");
  const [error, setError] = useState({ state: false, Message: "" });

  const extractPageUrls = (linkHeader) => {
    if (!linkHeader) return {};
    const links = linkHeader.split(",").reduce((acc, link) => {
      const match = link.match(/<(.*)>; rel="(.*)"/);
      if (match) {
        const [, url, rel] = match;
        acc[rel] = url;
      }
      return acc;
    }, {});
    return links;
  };

  const SearchApi = async (
    url = `https://api.github.com/search/repositories?q=${searchText}`
  ) => {
    setError({ state: false, Message: "" });

    if (searchText === "") {
      setError({ state: true, Message: "關鍵字不可為空白" });
      return;
    }
    try {
      const response = await useApi.get(url);
      setResult(response.data.items);
      const links = extractPageUrls(response.headers.link);
      setNextPageUrl(links.next || "");
      setPrevPageUrl(links.prev || "");

      if (response.data.items.length == 0) {
        console.log({ error: error });
        setError({ state: true, Message: "找不到搜尋結果" });
      }

      console.log({ response: response });
      console.log(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center text-center px-4">
      <div className="w-full pt-4">
        <label>
          請輸入關鍵字
          <input
            onChange={(event) => setSearchText(event.target.value)}
            value={searchText}
            type="text"
            placeholder="請輸入關鍵字..."
            className="mx-4 border"
          />
        </label>
        <button
          className=" ml-4 rounded-md bg-sky-300 dark:bg-sky-600 p-1"
          onClick={() => SearchApi()}
        >
          搜尋
        </button>
      </div>
      {
        (error.state = true && (
          <p className=" text-red-500 pt-4">{error.Message}</p>
        ))
      }
      <div>
        <ul className="flex flex-wrap pt-8">
          {result.length > 0 &&
            result.map((item, i) => {
              return (
                <li
                  className="flex border w-full items-center justify-between h-32 px-2"
                  key={i}
                  href={`${item.url}`}
                >
                  <div className="flex flex-wrap">
                    <div className=" flex items-center pb-2">
                      <img
                        src={item.owner.avatar_url}
                        alt={`${item.owner.login}'s avatar`}
                        className="rounded-full object-fill"
                        width={40}
                        height={40}
                      />
                      <p className="w-full text-lg font-bold pl-4">
                        {item.name}
                      </p>
                    </div>

                    <p className="text-gray-700 w-full text-start">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 whitespace-nowrap">
                    <span className="mr-2">★ {item.stargazers_count}</span>
                    <a
                      href={item.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline ml-4"
                    >
                      查看專案
                    </a>
                  </div>
                </li>
              );
            })}
        </ul>
        {result.length > 0 && (
          <div>
            <div className="flex  justify-center w-full gap-4 mt-4">
              <button
                onClick={() => SearchApi(prevPageUrl)}
                disabled={!prevPageUrl}
                className={`px-4 py-2 rounded-md ${
                  !prevPageUrl ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
                } text-white`}
              >
                上一頁
              </button>
              <button
                onClick={() => SearchApi(nextPageUrl)}
                disabled={!nextPageUrl}
                className={`px-4 py-2 rounded-md ${
                  !nextPageUrl ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
                } text-white`}
              >
                下一頁
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comprehensive;
