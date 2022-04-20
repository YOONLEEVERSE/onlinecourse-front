import { Button } from "grommet";
import { useMemo } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import MultiStepBar from "../../shared/MultiStepBar";

export default function AddCourse() {
  const params = useParams();
  const phase = useMemo(() => params["*"], [params]);
  const navigate = useNavigate();
  return (
    <>
      <h1>강의 정보를 입력해주세요</h1>
      <MultiStepBar phase={phase} />
      <Outlet />
      {phase > 1 && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(`../create-lecture/${+phase - 1}`);
          }}
          primary
        >
          이전
        </Button>
      )}
      {phase < 4 && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(`../create-lecture/${+phase + 1}`);
          }}
          primary
        >
          다음
        </Button>
      )}
    </>
  );
}
