import { Routes, Route, Link } from "react-router-dom";
import CreateLecture from "./CreateLecture";
import LastPage from "./LastPage";
import ManageTech from "./ManageTech";
import TechSetting from "./TechSetting";
import TextForm from "./TextForm";
import VideoSetting from "./tVideoSetting";
export function Admin() {
  return (
    <>
      <ul>
        <li>
          <Link to="create-lecture/1">강의 만들기</Link>
          <Link to="manage-tech">테크 추가하기</Link>
        </li>
      </ul>
      <div>
        <Routes>
          <Route path="create-lecture/*" element={<CreateLecture />}>
            <Route path="1" element={<TextForm />}></Route>
            <Route path="2" element={<TechSetting />}></Route>
            <Route path="3" element={<VideoSetting />}></Route>
            <Route path="4" element={<LastPage />}></Route>
          </Route>
          <Route path="manage-tech" element={<ManageTech />}></Route>
        </Routes>
      </div>
    </>
  );
}

/**
 *
 * 강의 정보
로고1.
메인 색상 (css 코드대로) 2.
제목3.
부제목 (테크 스택 설명)4.
난이도5.
메인 테크 (이름[유동적], 카테고리 선택식)6.
서브 테크 (이름[유동적], 카테고리 선택식)7.
무엇을 하는지8.
테크 리스트 9.
선행 강의 리스트 10.
요약 (제목, 서브 내용) 11.
가격 12. 
자주하는 질문 (Minor) 13.
강의 영상 정보 14.
시간 15.
영상 링크 (유튜브)
 //임시 저장 기능도 넣어놓는게 좋을 덧?


 파일올릴거- 로고
 텍스트 - 제목, 부제목, 메인 색상, 무엇을 하는지, 테크리스트, 선행 강의 리스트, 요약, 가격
 option - 난이도
 배열 - 메인 태크, 서브 테크(카테고리 선택식) , 강의 영상 정보, 시간, 영상 링크
 */
