import { Heading, Button, Box, Card } from "grommet";
import { Alarm } from "grommet-icons";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Accordion from "../../shared/Accordian";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { useRef } from "react";
const TitleSection = styled.section`
  width: 100%;
  height: 250px;
  background-image: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : "linear-gradient(#5b94ec, gray)"};
`;

const LevelSectionStyle = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 33%;
  padding: 0.5rem;
  width: 800px;
  color: white;
  border-radius: 10px;
  background-color: #262626;
  & > .logo {
    flex-grow: 1;
    height: 50px;
  }
  & > .description {
    flex-grow: 2;
  }
  & > .classLink {
    flex-grow: 1;
  }
`;

const LevelSection = ({
  level = "초급",
  techs = ["CSS", "HTML"],
  isFree = false,
  lectureLink = "#",
}) => {
  return (
    <LevelSectionStyle>
      <div className="logo">
        <Alarm />
      </div>
      <div className="description">
        {level}이상의 {techs.join(", ")}이해도가 필요합니다.
        {isFree
          ? "왕초보분들은 선수 강의로 시작하세요!"
          : "무료 강의로 시작하세요!"}
      </div>
      <div className="classlink">
        <Link to={lectureLink}>
          {isFree && "무료 "}
          {techs.join(",")}강의 보러가기
        </Link>
      </div>
    </LevelSectionStyle>
  );
};

const GET_COURSE = gql`
  query getCourse($slug: String) {
    getCourse(slug: $slug) {
      title
      slug
      subTitle
      logo
      mainColor
      level
      price
      progress
      progressVideos
      isEnrolled
      mainTechs {
        id
        name
        logo
      }
      prerequisite {
        title
      }
      videoCategories {
        title
        categoryId
        videos {
          videoId
          title
          time
          link
          freePreview
          text
          isCompleted
        }
      }
    }
  }
`;

export function Detail() {
  const { slug } = useParams();
  const { data, loading, error } = useQuery(GET_COURSE, {
    variables: { slug },
    onCompleted: (data) => console.log("DATA", data),
    onError: (error) => console.log("ERROR", error),
  });
  const payRef = useRef(null);
  const navigate = useNavigate();
  const executeScroll = () => payRef.current.scrollIntoVieew();
  if (data) {
    return (
      <>
        <TitleSection backgroundColor={data.getCourse.mainColor}>
          <Heading level="2" size="medium">
            {data.getCourse.title}
          </Heading>
          <Heading level="3" size="medium">
            {data.getCourse.subTitle}
          </Heading>
          <Heading level="4" size="medium">
            {data.getCourse.level}
          </Heading>
          <div>
            {data.getCourse.mainTechs.map((tech) => {
              return (
                <span
                  style={{
                    display: "inline-block",
                    width: "50px",
                    marginRight: "1rem",
                  }}
                  key={tech.name}
                >
                  <img alt="이미지 없음" src={tech.logo} width="50px"></img>
                </span>
              );
            })}
          </div>

          <Button primary style={{ padding: "10px" }} onClick={executeScroll}>
            Start Coding Now!
          </Button>
        </TitleSection>

        <Heading level="2" size="medium">
          Start Coding Now!
        </Heading>
        <Heading level="3" size="medium">
          풀스택 로켓에 지금 올라타세요-!
        </Heading>
        <Box>
          <Heading level="3" size="medium" color="whitegray ">
            이 정도 수준인분들 드루와요~
          </Heading>
          <LevelSection isFree={true} techs={["바닐라 JS"]}></LevelSection>
          <LevelSection></LevelSection>
        </Box>
        <Box
          direction="row"
          background={{ color: "black " }}
          color="white"
          pad="medium"
          ref={payRef}
        >
          <section style={{ width: "50%" }}>
            <Heading level="3" size="medium" color="white">
              Lifetime Access
            </Heading>
            <p style={{ wordWrap: "break-word" }}>
              본인이 원하시는 시간에, 본인에게 맞는 속도와 스피드로 페이스를
              조정하여, 언제든지 다시 반복하여 들을 수 있는 온라인 수업입니다.
            </p>

            <div>
              <p style={{ display: "inline-block", color: "#5b94ec" }}>
                WHAT'S INCLUDED
              </p>
              <span
                style={{
                  display: "inline-block",
                  width: "150px",
                  border: "1px solid gray",
                }}
              ></span>
            </div>
            <Box direction="row" flex style={{ flexWrap: "wrap" }}>
              <Card width={"40%"}>강의 평생 소장</Card>
              <Card width={"40%"}>2주 완성반 챌린지</Card>
              <Card width={"40%"}>100% 한글자막</Card>
              <Card width={"40%"}>니꼬쌤 질의응답</Card>
            </Box>
          </section>
          <section style={{ width: "30%" }}>
            <p color="whitesmoke">Pay once, own it forever</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Heading level="2" size="medium" color="white">
                월 {data.getCourse.price / 5}
              </Heading>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Heading level="4" size="medium" color="whitesmoke">
                  원
                </Heading>
                <Heading level="5" size="medium" color="whitesmoke">
                  (할부 5개월)
                </Heading>
              </div>
            </div>

            <Button
              color="brand"
              onClick={() => {
                navigate(`/pay/${slug}`);
              }}
            >
              결제하기
            </Button>
          </section>
        </Box>
        <Box>
          <Heading level="3" size="medium" color="whitegray ">
            상세 커리큘럼
          </Heading>
          <Heading level="4" size="medium" color="whitegray ">
            수업 내용을 직접 들어보고 결정하세요!
          </Heading>
          <Accordion data={data.getCourse.videoCategories} />
        </Box>
      </>
    );
  } else {
    return <p>loading...</p>;
  }
}

//만들 것
/**
 * 0. 메인테크, 레벨, 메인컬러, 로고로 course 정보 표현 o
 * 1. 선행 강의 o
 * 2. 가격 o
 * 3. 비디오 커리큘럼(비디오 정보)
 */
//prerequisite, price, videos, mainTechs,level,mainColor, logo, videos(category, list, time..)
