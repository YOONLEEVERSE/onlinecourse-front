import { ScrollableTabs } from "../../../shared/tab";
import { Heading, Carousel } from "grommet";
import CourseCapsule from "./CourseCapsule";
import { gql, useSubscription } from "@apollo/client";

export const SUBSCRIPTION_TEST = gql`
  subscription TimeWatch {
    time {
      currentTime
    }
  }
`;

export function Main({ playtime = 3000 }) {
  const { data, loading, error } = useSubscription(SUBSCRIPTION_TEST, {
    onSubscriptionComplete: (data) => {
      console.log(":::onSubscriptionCOMPLETEResult : ", data);
    },
    onSubscriptionData: (data) => {
      console.log("onSubscriptionData : ", data);
    },
  });
  return (
    <>
      {data && data.time && <p>현재시간 {Date(data.time.currentTime)}</p>}
      <Heading level="3" size="medium">
        Featured Courses
      </Heading>
      <Heading level="4" size="medium">
        최근 업데이트된 신상 강의
      </Heading>
      <Carousel controls={true} play={playtime} height="250px">
        <CourseCapsule courseName="정환이 바보"></CourseCapsule>
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
