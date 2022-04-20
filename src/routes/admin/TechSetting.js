import { useMutation, gql } from "@apollo/client";
import { Heading } from "grommet";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
const techDummyData = {
  getAllTech: [
    {
      id: 1,
      title: "JS",
      logo: "https://d1telmomo28umc.cloudfront.net/media/public/badges/JS.png",
    },
    {
      id: 3,
      title: "react",
      logo: "https://d1telmomo28umc.cloudfront.net/media/public/badges/React_Z6rkrgv.png",
    },
    {
      id: 5,
      title: "graphql",
      logo: "https://d1telmomo28umc.cloudfront.net/media/public/badges/Graph_QL.png",
    },
    {
      id: 6,
      title: "redux",
      logo: "https://d1telmomo28umc.cloudfront.net/media/public/badges/reduxBadge.png",
    },
    {
      id: 8,
      title: "typescript",
      logo: "https://nomadcoders.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftypescript.791deeef.png&w=3840&q=75",
    },
  ],
  getAllCourse: [
    {
      courseId: 3,
      title: "JS 쌩초급반",
      logo: "https://nomadcoders.co/_next/image?url=https%3A%2F%2Fd1telmomo28umc.cloudfront.net%2Fmedia%2Fpublic%2Fthumbnails%2FjsThumb.jpg&w=640&q=75",
      level: "초급",
      mainTechs: ["JS", "REACt", "GRAPHQL"],
    },
    {
      courseId: 5,
      title: "CI/CD",
      logo: "https://nomadcoders.co/_next/image?url=https%3A%2F%2Fd1telmomo28umc.cloudfront.net%2Fmedia%2Fpublic%2Fthumbnails%2FairbnbThumbnail.jpg&w=640&q=75",
      level: "고급",
      mainTechs: ["JS", "NODEJS"],
    },
    {
      courseId: 7,
      title: "JS 중급반",
      logo: "https://nomadcoders.co/_next/image?url=https%3A%2F%2Fd1telmomo28umc.cloudfront.net%2Fmedia%2Fpublic%2Fthumbnails%2FFinal_ReactJS_Masterclass.jpeg&w=1200&q=75",
      level: "중급",
      mainTechs: ["JS", "NODEJS"],
    },
  ],
};

/**
 *  {
      courseId: ID,
      title: String,
      logo: String,
      level: String,
      mainTechs: [name ],
    },
    이렇게만 받아오면 될 듯 함!
 */

const Img = styled.img`
  width: ${(props) => props.size ?? 60}px;
`;
export default function TechSetting() {
  const [data, setData] = useState(techDummyData);
  const [selected, setSelected] = useState({ courses: [], techs: [] });
  const Techs = () => {
    return useMemo(() => {
      return (
        <>
          {data.getAllTech.map((tech) => {
            return (
              <Img
                key={`tech-${tech.title}`}
                src={
                  tech.logo ??
                  "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
                }
                alt="이미지"
                onClick={(e) => {
                  e.preventDefault();
                  setSelected((selected) => ({
                    courses: [...selected.courses],
                    techs: [...selected.techs, tech.title],
                  }));
                }}
              ></Img>
            );
          })}
        </>
      );
    }, [data.getAllTech]);
  };
  const Courses = () => {
    return useMemo(() => {
      return (
        <>
          {data.getAllCourse.map((course) => {
            return (
              <Img
                size={250}
                key={`course-${course.title}`}
                src={
                  course.logo ??
                  "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setSelected((selected) => ({
                    techs: [...selected.techs],
                    courses: [...selected.courses, course.title],
                  }));
                }}
                alt="이미지"
              ></Img>
            );
          })}
        </>
      );
    }, [data.getAllTech]);
  };
  useEffect(() => {
    console.log("하하퍼니", selected);
  }, [selected]);

  return (
    <>
      <Heading size="medium" level={2}>
        MainTechs
      </Heading>
      <Techs />
      <Courses />
      <Heading size="medium" level={3}>
        선택한 코스
      </Heading>

      {selected.courses &&
        selected.courses.map((course) => <p key={course}>{course}</p>)}
      <Heading size="medium" level={3}>
        선택한 테크
      </Heading>
      {selected.techs && selected.techs.map((tech) => <p key={tech}>{tech}</p>)}
    </>
  );
}
