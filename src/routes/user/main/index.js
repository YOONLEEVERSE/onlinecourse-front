import { ScrollableTabs } from "../../../shared/tab";
import { Heading, Carousel } from "grommet";
import CourseCapsule from "./CourseCapsule";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import { GET_ALL_COURSE } from "../../../graphql/query";
import { useEffect } from "react";
import { AlertList } from "../../../shared/Alert";

export function Main({ playtime = 3000 }) {
  const { data } = useQuery(GET_ALL_COURSE);
  const client = useApolloClient();
  useEffect(() => {
    const test = client.readQuery({ query: GET_ALL_COURSE });
  }, [data]);

  if (data && data.length > 0) {
    return (
      <>
        <Heading level="3" size="medium">
          Featured Courses
        </Heading>
        <Heading level="4" size="medium">
          최근 업데이트된 신상 강의
        </Heading>
        <Carousel controls={true} play={playtime} height="300px">
          <CourseCapsule data={data.getAllCourse[0]}></CourseCapsule>
        </Carousel>

        <Heading level="3" size="medium">
          Popular Courses
        </Heading>
        <Heading level="4" size="medium">
          강력 추천하는 베스트 강의
        </Heading>
        <ScrollableTabs></ScrollableTabs>

        <Heading level="3" size="medium">
          Student’s Portfolios
        </Heading>
        <Heading level="4" size="medium">
          수강생 졸업작품
        </Heading>
      </>
    );
  } else {
    return (
      <div>
        <AlertList msg="새로 생길 메시지" duration={5000} />
        <button
          onClick={(e) => {
            e.preventDefault();
            //수강완료 처리
            //다음 수업으로 넘어가기(수강완료 안된걸로 이동해야 함!)
          }}
        >
          강의 수강 완료
        </button>
        <p>데이터가 없음</p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/g4rMWtPNOr8"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  //공유 주소 넣었을 때 => 중간에 embed삽입.
}
