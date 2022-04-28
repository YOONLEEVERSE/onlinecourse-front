import { cloneDeep } from "lodash";
import { useLayoutEffect, useState, useRef, useEffect } from "react";

const dummyVideo = [{ title: "", time: "", link: "", categoryIdx: 0 }];
//각 카테고리별 데이터임. 이걸 합쳐서? data를 업데이트 해주면 됨.

const VideoInfoRow = ({ title, time, link, updateVideo }) => {
  const titleRef = useRef(null);
  const timeRef = useRef(null);
  const urlRef = useRef(null);
  return (
    <div>
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
const VideoCategory = ({
  title,
  categoryNumber,
  onChangeTitle,
  onFocusingTitle,
}) => {
  const [videoData, setVideoData] = useState(null);
  const titleRef = useRef(null);

  const updateVideo = (idx, title, time, link) => {
    setVideoData((pre) => {
      const tmp = cloneDeep(pre);
      tmp.push({ title, time, link, categoryIdx: idx });
      return tmp;
    });
  };
  useLayoutEffect(() => {
    const data = () => {
      const tmp = dummyVideo.filter(
        (video) => video.categoryIdx === categoryNumber
      );
      return tmp;
    };
    setVideoData(data);
  }, []);

  useEffect(() => {
    console.log("이번엔 어떻게 됐지?");
  });

  return (
    <div
      onBlur={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        placeholder="TITLE"
        defaultValue={title}
        ref={titleRef}
        onBlur={(e) => {
          e.preventDefault();
          onChangeTitle(e.target.value);
        }}
        // onFocus={(e) => {
        //   e.preventDefault();
        //   console.log("realdata", realdata);
        //   onFocusingTitle(e.target.value, realdata);
        // }}
      />
      {/**카테고리타이틀입니다. */}
      <br />
      {videoData?.map((video, idx) => (
        <VideoInfoRow
          title={video.title}
          time={video.time}
          link={video.link}
          updateVideo={(title, time, link) => {
            updateVideo(categoryNumber, title, time, link);
          }}
          key={`VideoInfo-${video.title}-${idx}`}
        />
      ))}
      <button
        onClick={(e) => {
          e.preventDefault();
          setVideoData((pre) => {
            console.log("DPD??", pre);
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
