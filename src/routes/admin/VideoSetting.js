import { memo, useRef, useState, useEffect } from "react";
import VideoCategory from "./VideoCategory";

const dummyCategoryName = ["A", "B", "C"];
const sumData = [];
/**
 *  addCourse(
      input: {
        title: $title
        subTitle: $subTitle
        logo: $logo
        mainColor: $mainColor
        level: $level
        price: $price
        mainTechs: $mainTechs
        prerequisite: $prerequisite
        videoCategories: {[title:"~",videoInfo:[{"title":"ghihi"}]]}
      }
    ) 
 */
function VideoSetting() {
  const [categoryName, setCategoryName] = useState(dummyCategoryName);
  const courseTitleRef = useRef(null);
  function onChangeTitle(changedTitle, idx, updateData) {
    const tmp = [...categoryName];
    tmp.splice(idx, 1, changedTitle);
    sumData[idx] = { title: changedTitle, video: updateData };
    setCategoryName(tmp);
  }

  return (
    <>
      <h1>비디오 세팅화면</h1>

      <form>
        <input
          type="text"
          placeholder="TITLE"
          ref={courseTitleRef}
          defaultValue={"JS 초급반"}
        />
        <hr></hr>
        {categoryName?.map((category, idx) => {
          return (
            <VideoCategory
              title={category}
              onChangeTitle={(changedTitle, updateData) => {
                onChangeTitle(changedTitle, idx, updateData);
              }}
              categoryNumber={idx}
              key={`VideoCategory-${category}`}
            />
          );
        })}
        <button
          onClick={(e) => {
            e.preventDefault();
            setCategoryName((pre) => [...pre, ""]);
            //aCategory추가
          }}
        >
          +
        </button>
      </form>
    </>
  );
}
//time, title, link + 버튼누르면 추가 렌더링 되도록..!

export default memo(VideoSetting);
