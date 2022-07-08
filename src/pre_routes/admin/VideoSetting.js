import VideoCategory from "./VideoCategory";
import { useState } from "react";
import { Button } from "grommet";

export default function VideoSetting() {
  const [categoryCnt, setCategoryCnt] = useState([0]);
  function updateCategoryNumber() {
    setCategoryCnt((pre) => [...pre, categoryCnt.length]);
  }
  return (
    <div>
      {categoryCnt.map((t, idx) => (
        <VideoCategory key={t} categoryIdx={idx} />
      ))}
      <Button type={"button"} primary onClick={updateCategoryNumber}>
        +ADD CATEGORY
      </Button>
    </div>
  );
}
