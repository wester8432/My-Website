import { useEffect, useRef, useState } from "react";
import { AiFillSound } from "react-icons/ai";
import { IoPause } from "react-icons/io5";
import { IoPlay } from "react-icons/io5";
import { IoPlayForwardSharp } from "react-icons/io5";
import { IoPlayBackSharp } from "react-icons/io5";
import ReactPlayer from "react-player";
import style from "./PlayBar.module.scss";
import music1 from "../assets/音乃瀬奏-ビビデバ.mp3";
import music2 from "../assets/トゲナシトゲアリ-爆ぜて咲く.mp3";
import music3 from "../assets/tuki-晩餐歌.mp3";
import music4 from "../assets/Islet feat.Sando Aoi-君とコーヒー.mp3";
export default function PlayBar() {
  let playlist = [
    { title: "音乃瀬奏-ビビデバ", url: music1 },
    { title: "トゲナシトゲアリ-爆ぜて咲く", url: music2 },
    { title: "tuki-晩餐歌", url: music3 },
    { title: "Islet feat.Sando Aoi-君とコーヒー", url: music4 },
  ];
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [currentAudio, setCurrentAudio] = useState(playlist[0]);
  const [audioDropDown, setAudioDropDown] = useState(false);
  const playerRef = useRef(null);
  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(30);
  // const [volumeDropDown, setVolumeDropDown] = useState(false);
  const [speedDropDown, setSpeedDropDown] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  // const { playList, setPlayList } = usePlayList(); // 如果你有一个 usePlayList 钩子，需要导入它并定义

  const titleRef = useRef(null);

  const [audioState, setAudioState] = useState({
    url: playlist[0].url, // 使用本地音频文件 URL
    playing: false,
    volume: 0.3,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
  });

  const handleTimeChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    playerRef.current.seekTo(newTime, "seconds");
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value) / 100;
    const roundedVolume = Math.round(newVolume * 100) / 100; // 四舍五入到两位小数
    setVolume((roundedVolume * 100).toFixed(0)); // 确保是整数显示
    setAudioState({ ...audioState, volume: roundedVolume });
  };

  const handleSpeedChange = (speed) => {
    setPlaybackRate(speed);
    setAudioState({ ...audioState, playbackRate: speed });
  };

  const handlePrevious = () => {
    const prevIndex =
      (currentAudioIndex - 1 + playlist.length) % playlist.length;
    setCurrentAudioIndex(prevIndex);
    setCurrentAudio(playlist[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentAudioIndex + 1) % playlist.length;
    setCurrentAudioIndex(nextIndex);
    setCurrentAudio(playlist[nextIndex]);
  };

  const togglePlay = () => {
    setPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setPlaying(false);
  };

  useEffect(() => {
    if (currentAudio && currentAudio.url) {
      setAudioState((prevState) => ({
        ...prevState,
        url: currentAudio.url,
      }));
    }
  }, [currentAudio]);

  return (
    <>
      <div
        style={{ boxSizing: "border-box" }}
        className={` bg-[#1495d6] sticky top-0 w-full  h-18 flex justify-start items-center z-10 `}
      >
        <div className="ml-10 w-[7%] flex gap-2 max-[1024px]:w-[13%]">
          <div className=" cursor-pointer ">
            <IoPlayBackSharp size={25} onClick={handlePrevious} color="white" />
          </div>
          <div onClick={togglePlay} className=" cursor-pointer ">
            {isPlaying ? (
              <IoPause size={25} color="white" />
            ) : (
              <IoPlay size={25} color="white" />
            )}
          </div>
          <div className=" cursor-pointer">
            <IoPlayForwardSharp size={25} onClick={handleNext} color="white" />
          </div>
        </div>

        <div className=" relative ml-12 w-[65%] flex flex-wrap items-center max-[1024px]:71%">
          <div className="flex w-full">
            <div className="text-white text-center mr-8">現在播放</div>
            {currentAudio?.title && (
              <div
                className="text-white flex-grow hover:bg-[#9b9b9b4f] cursor-pointer"
                onClick={() => setAudioDropDown(!audioDropDown)}
                ref={titleRef}
              >
                {currentAudio.title}
              </div>
            )}
            {audioDropDown && (
              <div
                className=" absolute top-8 left-24 bg-slate-200"
                style={{
                  width: titleRef.current
                    ? titleRef.current.offsetWidth
                    : "auto",
                }}
              >
                <ul>
                  {playlist.map((item, i) => (
                    <li
                      key={i}
                      className=" hover:bg-[#9b9b9b33] cursor-pointer "
                      onClick={() => {
                        setCurrentAudioIndex(i);
                        setCurrentAudio(item);
                        setAudioDropDown(false);
                      }}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className={`flex w-full items-center ${style.rangeInput}`}>
            <div className="text-white flex-none mr-8">
              {Math.floor(currentTime / 60)}:
              {Math.floor(currentTime % 60)
                .toString()
                .padStart(2, "0")}
            </div>
            <input
              type="range"
              min="0"
              max={Math.ceil(audioState.duration)}
              value={currentTime}
              onChange={handleTimeChange}
              className="flex-grow h-3 bg-slate-200 rounded-full"
              aria-label="Volume"
            />
            <div className="text-white pl-4">
              {Math.floor(audioState.duration / 60)}:
              {Math.floor(audioState.duration % 60)
                .toString()
                .padStart(2, "0")}
            </div>
          </div>
        </div>

        <div
          className={`flex w-[18%] ml-4 items-center ${style.rangeInput} relative max-[1024px]:hidden`}
        >
          {/* <AiFillSound
            className="mx-8 text-white block lg:hidden "
            size={30}
            onClick={() => setVolumeDropDown(!volumeDropDown)}
          /> */}
          <AiFillSound className="mx-8 text-white hidden lg:block" size={30} />
          {/* {volumeDropDown && (
            <div
              className="absolute top-16 -left-8 mt-8 bg-white rounded-lg shadow-md p-2 flex flex-col items-center"
              style={{ transform: "rotate(-90deg)", width: "150px" }}
            >
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                className="volume-control"
                onChange={handleVolumeChange}
                aria-label="Volume"
              />
            </div>
          )} */}
          <input
            type="range"
            min="0"
            max="100"
            className="hidden lg:block"
            value={volume}
            style={{ color: "blue" }}
            onChange={handleVolumeChange}
            aria-label="Volume"
          />
          <p className="text-white mx-4">{volume}</p>
        </div>

        <div className="w-[10%] max-[1024px]:w-[16%]">
          <div className=" flex justify-center relative ">
            <div
              className="bg-[#1478c5] rounded-full w-16 text-center text-white  relative cursor-pointer"
              onClick={() => setSpeedDropDown(!speedDropDown)}
            >
              {playbackRate}X
            </div>
            {speedDropDown && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-8 bg-white rounded-lg shadow-md dark:text-black">
                {[0.25, 0.5, 0.75, 1, 1.5, 1.75, 2].map((speed) => (
                  <div
                    key={speed}
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => handleSpeedChange(speed)}
                  >
                    {speed}X
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* <div className="w-[3%] lg:block hidden">
          <div className="w-12 hover:bg-slate-100">
            <IoIosClose size={30} color="blue" />
          </div>
        </div> */}

        <ReactPlayer
          ref={playerRef}
          url={audioState.url}
          playing={isPlaying}
          volume={audioState.volume}
          playbackRate={audioState.playbackRate}
          onProgress={(state) => {
            setCurrentTime(state.playedSeconds);
            setAudioState({ ...audioState, played: state.played });
          }}
          onDuration={(duration) => {
            setAudioState({ ...audioState, duration: duration });
          }}
          onEnded={handleEnded}
          width="0"
          height="0"
        />
      </div>
    </>
  );
}
