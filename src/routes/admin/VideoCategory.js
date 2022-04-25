import { cloneDeep } from "lodash";
import { useLayoutEffect, useEffect, useState, useRef } from "react";

const dummyVideo = [
  { title: "video1", time: "60", link: "http://youtube.com", categoryIdx: 0 },
  { title: "video2", time: "650", link: "http://youtube.com", categoryIdx: 0 },
  { title: "video3", time: "650", link: "http://youtube.com", categoryIdx: 1 },
  { title: "video4", time: "650", link: "http://youtube.com", categoryIdx: 1 },
  { title: "video5", time: "650", link: "http://youtube.com", categoryIdx: 2 },
];
//각 카테고리별 데이터임. 이걸 합쳐서? data를 업데이트 해주면 됨.
let realdata = [];
const VideoInfoRow = ({ title, time, link, idx }) => {
  const titleRef = useRef(null);
  const timeRef = useRef(null);
  const urlRef = useRef(null);
  return (
    <div
      onBlur={(e) => {
        realdata[idx] = {
          title: titleRef.current.value,
          time: timeRef.current.value,
          link: urlRef.current.value,
        };
      }}
    >
      <input
        type="text"
        ref={titleRef}
        placeholder="videoname"
        defaultValue={title}
      ></input>
      <input
        type="text"
        ref={timeRef}
        placeholder="video time"
        defaultValue={time}
      ></input>
      <input
        type="url"
        ref={urlRef}
        placeholder="video link"
        defaultValue={link}
      ></input>
      <br />
      <hr />
    </div>
  );
};
const VideoCategory = ({ title, categoryNumber, onChangeTitle }) => {
  const [videoData, setVideoData] = useState(null);
  useLayoutEffect(() => {
    const data = () => {
      const tmp = dummyVideo.filter(
        (video) => video.categoryIdx === categoryNumber
      );
      return tmp;
    };
    setVideoData(data);
    realdata = data();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="TITLE"
        defaultValue={title}
        onChange={(e) => {
          e.preventDefault();
          onChangeTitle(e.target.value, realdata);
        }}
      />
      {/**카테고리타이틀입니다. */}
      <br />
      {videoData?.map((video, idx) => (
        <VideoInfoRow
          title={video.title}
          time={video.time}
          link={video.link}
          idx={idx}
          key={`VideoInfo-${video.title}-${idx}`}
        />
      ))}
      <button
        onClick={(e) => {
          e.preventDefault();
          setVideoData((pre) => {
            const tmp = cloneDeep(pre);
            tmp.push({
              title: "",
              time: 0,
              link: "",
              categoryIdx: categoryNumber,
            });
            return tmp;
          });
        }}
      >
        +Add Video
      </button>
    </div>
  );
};
export default VideoCategory;
