import { memo, useMemo, useRef } from "react";
import { useDebounce } from "../../hooks/useDebounce";
function VideoSetting() {
  const title = useDebounce();
  return (
    <>
      <h1>비디오 세팅화면</h1>
    </>
  );
}

export default memo(VideoSetting);
