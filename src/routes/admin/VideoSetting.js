import { memo, useRef, useState, useEffect } from "react";
import { useUpdate } from "../../hooks/useUpdate";
import VideoCategory from "./VideoCategory";

const dummyCategoryName = ["bidei", "bedio2"];
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
  const [_, updateData] = useUpdate();
  function onChangeTitle(changedTitle, idx) {
    console.log("changedTitle", changedTitle);
    // const tmp = [...categoryName];
    // tmp.splice(idx, 1, changedTitle);
    //sumData[idx] = { title: changedTitle, video: updateData };
    //console.log(sumData);
    setCategoryName((pre) => {
      const tmp = [...pre];
      tmp.splice(idx, 1, changedTitle);
      return tmp;
    });
  }

  function onFocusingTitle(currentTitle, idx, updated) {
    sumData[idx] = { title: currentTitle, video: updated };
    updateData(sumData);
  }

  return (
    <>
      <h1>비디오 세팅화면</h1>

      <form>
        <hr></hr>
        {categoryName?.map((category, idx) => {
          return (
            <VideoCategory
              title={category}
              onChangeTitle={(changedTitle) => {
                onChangeTitle(changedTitle, idx);
              }}
              onFocusingTitle={(currentTitle, updateData) => {
                onFocusingTitle(currentTitle, idx, updateData);
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
