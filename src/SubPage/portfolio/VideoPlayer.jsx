import { useEffect, useRef, useState } from "react";
import { IoPause, IoPlay } from "react-icons/io5";
import { AiFillSound } from "react-icons/ai";
import { RiRectangleLine } from "react-icons/ri";
import { MdFullscreen } from "react-icons/md";
import { FaVolumeMute } from "react-icons/fa";
import { IoPlayForwardSharp, IoPlayBackSharp } from "react-icons/io5";
import style from "../../scss/PlayBar.module.scss";
import ReactPlayer from "react-player";
import video1 from "../../assets/WANDS - 世界が終るまでは….mp4";
import video2 from "../../assets/優里 - ドライフラワー _ THE FIRST TAKE.mp4";
import video3 from "../../assets/結束バンド - ギターと孤独と蒼い惑星  THE FIRST TAKE.mp4";
import video4 from "../../assets/緑黄色社会 - Shout Baby _ THE FIRST TAKE.mp4";
export default function VideoPlayer() {
  let playlist = [
    {
      title: "WANDS - 世界が終るまでは…",
      url: video1,
    },
    {
      title: "優里 - ドライフラワー",
      url: video2,
    },
    {
      title: "結束バンド - ギターと孤独と蒼い惑星",
      url: video3,
    },
    {
      title: "緑黄色社会  Shout Baby  THE FIRST TAKE",
      url: video4,
    },
  ];
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [currentAudio, setCurrentAudio] = useState(playlist[0]);
  //   const [audioDropDown, setAudioDropDown] = useState(false);
  const playerRef = useRef(null);
  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [preVolume, setPreVolume] = useState(0.3);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [volumeDropDown, setVolumeDropDown] = useState(false);
  const [window, setWindow] = useState(false);

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
    // const newVolume = parseFloat(e.target.value);
    // const roundedVolume = Math.round(newVolume * 100) / 100; // 四舍五入到两位小数
    setVolume(e.target.value); // 确保是整数显示
    setPreVolume(e.target.value);
    setAudioState({ ...audioState, volume: e.target.value });
  };

  const mute = () => {
    if (volume > 0) {
      setPreVolume(volume);
      setVolume(0);
      setAudioState({ ...audioState, volume: 0 });
      console.log(preVolume);
    } else if (volume === 0) {
      console.log("active");
      setVolume(preVolume);
      setAudioState({ ...audioState, volume: preVolume });
    }
  };

  //   const handleSpeedChange = (speed) => {
  //     setPlaybackRate(speed);
  //     setAudioState({ ...audioState, playbackRate: speed });
  //   };

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
    if (currentAudioIndex < playlist.length - 1) {
      handleNext();
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (playerRef.current.wrapper.requestFullscreen) {
        playerRef.current.wrapper.requestFullscreen();
      } else if (playerRef.current.wrapper.mozRequestFullScreen) {
        playerRef.current.wrapper.mozRequestFullScreen();
      } else if (playerRef.current.wrapper.webkitRequestFullscreen) {
        playerRef.current.wrapper.webkitRequestFullscreen();
      } else if (playerRef.current.wrapper.msRequestFullscreen) {
        playerRef.current.wrapper.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
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
    <div className="flex">
      <div
        tabIndex={0}
        className={`${window ? "w-full" : "w-4/5"} h-3/4  relative `}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onKeyDown={(event) => {
          if (event.code === "Space") {
            // 檢查是否按下空白鍵
            event.preventDefault(); // 防止頁面滾動
            togglePlay();
          }
        }}
      >
        <div
          className="flex justify-center bg-black w-full"
          onDoubleClick={toggleFullscreen}
          onClick={togglePlay}
        >
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
            width="100%"
            className="min-h-[500px]"
          />
        </div>
        <div
          className={` pb-2 absolute bottom-0  gap-y-1 w-full transition-opacity duration-300 h-18 grid grid-cols-3 grid-rows-2 items-center ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          {/**進度控制 */}
          <div className="w-full row-start-0 col-span-full ">
            <input
              type="range"
              min="0"
              max={Math.ceil(audioState.duration)}
              value={currentTime}
              onChange={handleTimeChange}
              className="flex-grow h-3 bg-slate-200 rounded-full w-full cursor-pointer"
              aria-label="Volume"
            />
          </div>

          <ul className="flex items-center pl-4">
            {/**播放項目控制 */}
            <li className=" cursor-pointer">
              <IoPlayBackSharp
                size={30}
                onClick={handlePrevious}
                color="white"
              />
            </li>
            <li onClick={togglePlay} className=" cursor-pointer px-4">
              {isPlaying ? (
                <IoPause size={30} color="white" />
              ) : (
                <IoPlay size={30} color="white" />
              )}
            </li>
            <li className=" cursor-pointer">
              <IoPlayForwardSharp
                size={30}
                onClick={handleNext}
                color="white"
              />
            </li>
            {/**音量控制 */}
            <li
              className="flex cursor-pointer"
              onMouseEnter={() => setVolumeDropDown(true)}
              onMouseLeave={() => setVolumeDropDown(false)}
            >
              {volume == 0 ? (
                <FaVolumeMute
                  size={30}
                  className="mx-8 text-white hidden lg:block"
                  onClick={mute}
                />
              ) : (
                <AiFillSound
                  className="mx-8 text-white hidden lg:block"
                  size={30}
                  onClick={mute}
                />
              )}
              {volumeDropDown ? (
                <div className={`flex w-auto items-center ${style.rangeInput}`}>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    className="hidden lg:block"
                    value={volume}
                    style={{ color: "blue" }}
                    onChange={handleVolumeChange}
                    aria-label="Volume"
                  />
                </div>
              ) : null}
            </li>
            {/**播放時間 */}
            <li className="flex pl-4">
              <p className="text-white flex-none mr-8">
                {Math.floor(currentTime / 60)}:
                {Math.floor(currentTime % 60)
                  .toString()
                  .padStart(2, "0")}{" "}
                /
                <span className="text-white pl-4">
                  {Math.floor(audioState.duration / 60)}:
                  {Math.floor(audioState.duration % 60)
                    .toString()
                    .padStart(2, "0")}
                </span>
              </p>
            </li>
          </ul>
          {/**視窗控制 */}
          <ul className="flex items-center  justify-self-end col-end-4 gap-2 text-white ">
            <li className="cursor-pointer" onClick={() => setWindow(!window)}>
              <RiRectangleLine size={32} />
            </li>
            <li className="cursor-pointer" onClick={toggleFullscreen}>
              <MdFullscreen size={32} />
            </li>
          </ul>
        </div>
      </div>

      {window ? null : (
        <div className=" w-1/5 ">
          <p className="text-center w-full pt-4">播放清單</p>
          <ul className=" text-start list-decimal  overflow-hidden mt-4 ">
            {playlist.map((ele, i) => {
              return (
                <li
                  key={i}
                  className={`${
                    currentAudioIndex === i && "bg-slate-200 dark:bg-slate-600"
                  } hover:bg-[#9b9b9b33] cursor-pointer list-decimal truncate pt-1`}
                  onClick={() => {
                    setCurrentAudioIndex(i);
                    setCurrentAudio(ele);
                  }}
                  title={ele.title}
                >
                  {ele.title}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
