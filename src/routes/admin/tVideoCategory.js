import { Button, FormField, TextInput } from "grommet";
import { cloneDeep } from "lodash";
import { memo, useState } from "react";
import { updateNewcourse } from "../../store/actionCreator";
import { useDispatch } from "react-redux";

const VideoInfo = memo(({ videoData, updateVideoData }) => {
  return (
    <FormField label="비디오 정보">
      <TextInput
        value={videoData.title}
        name="title"
        onChange={(e) => updateVideoData(e)}
      ></TextInput>
      <TextInput
        value={videoData.time}
        name="time"
        onChange={(e) => updateVideoData(e)}
      ></TextInput>
      <TextInput
        value={videoData.link}
        name="link"
        onChange={(e) => updateVideoData(e)}
      ></TextInput>
    </FormField>
  );
});

function VideoData({ categoryIdx }) {
  const [categoryName, setCategoryName] = useState(`카테고리${categoryIdx}`);
  const [videoData, setVideoData] = useState([
    { title: `비디오${categoryIdx}-1`, time: 60, link: "youtube.com" },
  ]);
  const dispatch = useDispatch();

  const updateCategoryName = (e) => {
    e.preventDefault();
    setCategoryName(e.target.value);
  };

  const updateVideoData = (idx, e) => {
    e.preventDefault();
    setVideoData((pre) => {
      const tmp = cloneDeep(pre);
      tmp[idx][e.target.name] = e.target.value;
      return tmp;
    });
  };

  const addVideoData = () => {
    setVideoData((pre) => {
      const tmp = cloneDeep(pre);
      tmp.push({
        title: `비디오${categoryIdx}-${tmp.length}`,
        time: 60,
        link: "youtube.com",
      });
      return tmp;
    });
  };

  const handleOnBlur = () => {
    dispatch(updateNewcourse(categoryIdx, categoryName, videoData));
  };

  return (
    <>
      <div onBlur={handleOnBlur}>
        <TextInput
          value={categoryName}
          onChange={updateCategoryName}
        ></TextInput>
        {videoData?.map((video, idx) => (
          <VideoInfo
            key={`video-${idx}`}
            videoData={video}
            updateVideoData={(e) => updateVideoData(idx, e)}
          />
        ))}
      </div>

      <Button type={"button"} onClick={addVideoData}>
        +ADD VIDEO
      </Button>
    </>
  );
}

export default memo(VideoData);
