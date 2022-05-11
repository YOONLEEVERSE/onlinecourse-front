import { Button } from "grommet";
import styled from "styled-components";
import { useState } from "react";
import MultiStepBar from "../../shared/MultiStepBar";
import TextForm from "./TextForm";
import TechSetting from "./TechSetting";
import VideoSetting from "./VideoSetting";
import LastPage from "./LastPage";
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

function AddCourse() {
  const [phase, setPhase] = useState(1);
  return (
    <Container>
      <h1>강의 정보를 입력해주세요</h1>
      <MultiStepBar phase={phase} />
      {phase === 1 && <TextForm />}
      {phase === 2 && <TechSetting />}
      {phase === 3 && <VideoSetting />}
      {phase === 4 && <LastPage />}
      {phase > 1 && (
        <Button
          onClick={(e) => {
            setPhase(phase - 1);
          }}
          primary
        >
          이전
        </Button>
      )}
      {phase < 4 && (
        <Button
          onClick={(e) => {
            setPhase(phase + 1);
          }}
          primary
          style={{
            float: "right",
          }}
        >
          다음
        </Button>
      )}
    </Container>
  );
}

export default AddCourse;
