import { ScrollableTabs } from "../../../shared/tab";
import { Heading, Carousel } from "grommet";
import CourseCapsule from "./CourseCapsule";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import { GET_ALL_COURSE } from "../../../graphql/query";
import { useEffect } from "react";

export function Main({ playtime = 3000 }) {
  const { data } = useQuery(GET_ALL_COURSE, {
    onCompleted: (data) => {
      console.log("why ENROLLEMENT ERROR?", data);
    },
  });
  const client = useApolloClient();
  useEffect(() => {
    const test = client.readQuery({ query: GET_ALL_COURSE });
    console.log("캐싱 데이터", test);
  }, [data]);

  if (data) {
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
  }
}
