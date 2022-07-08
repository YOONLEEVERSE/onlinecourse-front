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
        placeholder="강의 이름을 적어주세요"
        onChange={(e) => updateVideoData(e)}
      ></TextInput>
      <TextInput
        value={videoData.time}
        name="time"
        placeholder="비디오 시간을 입력해주세요"
        onChange={(e) => updateVideoData(e)}
      ></TextInput>
      <TextInput
        value={videoData.link}
        name="link"
        placeholder="비디오 링크를 걸어주세요"
        onChange={(e) => updateVideoData(e)}
      ></TextInput>
    </FormField>
  );
});

function VideoData({ categoryIdx }) {
  const [categoryName, setCategoryName] = useState();
  const [videoData, setVideoData] = useState([
    { title: "", time: 0, link: "", freePreview: true, text: "" },
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
        title: "",
        time: 0,
        link: "",
        freePreview: true,
        text: "",
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
          placeholder="카테고리 이름을 작성해주세요"
        ></TextInput>

        <div style={{ paddingLeft: "2rem" }}>
          {videoData?.map((video, idx) => (
            <VideoInfo
              key={`video-${idx}`}
              videoData={video}
              updateVideoData={(e) => updateVideoData(idx, e)}
            />
          ))}
          <Button
            type={"button"}
            onClick={addVideoData}
            style={{ float: "right" }}
          >
            +ADD VIDEO
          </Button>
        </div>
      </div>
    </>
  );
}

export default memo(VideoData);
