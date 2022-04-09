import styled from "styled-components";
import { Heading } from "grommet";
import Banner from "../../../shared/banner";
const CourseWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Description = styled.div`
  & p:before {
    content: "\02295";
  }
`;

export default function CourseCapsule({
  courseName = "testName",
  maintech = ["react", "framer"],
  subtech = ["react", "framer", "ctech"],
  summary = [
    "106개",
    "완강을 위한 2주 챌린지 프로그램",
    "최신 버전으로 업데이트",
  ],
  link = "#",
}) {
  return (
    <CourseWrapper>
      <Banner techs={maintech + subtech} />
      <Description>
        <Heading level="3" size="medium">
          {courseName}
        </Heading>
        <div>
          <img
            src="https://nomadcoders.co/logos/react-query.svg"
            alt="없대용 에메ㅔ베ㅔ베"
            width="50px"
          ></img>
          <img
            src="https://nomadcoders.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Freact-native.ce2e8aeb.png&w=1920&q=75"
            alt="없대용 에메ㅔ베ㅔ베"
            width="50px"
          ></img>
          <p>{summary[0]}</p>
          <p>{summary[1]}</p>
          <p>{summary[2]}</p>
        </div>
      </Description>
    </CourseWrapper>
  );
}
