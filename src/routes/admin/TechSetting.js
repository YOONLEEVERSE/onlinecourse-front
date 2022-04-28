import { Heading } from "grommet";
import styled from "styled-components";
import { useCallback, useEffect, useMemo, useState, memo } from "react";
import { useUpdate } from "../../hooks/useUpdate";
const techDummyData = {
  getAllTech: [
    {
      id: 2,
      title: "JS",
      logo: "https://d1telmomo28umc.cloudfront.net/media/public/badges/JS.png",
    },
    {
      id: 2,
      title: "react",
      logo: "https://d1telmomo28umc.cloudfront.net/media/public/badges/React_Z6rkrgv.png",
    },
    {
      id: 2,
      title: "graphql",
      logo: "https://d1telmomo28umc.cloudfront.net/media/public/badges/Graph_QL.png",
    },
    {
      id: 2,
      title: "redux",
      logo: "https://d1telmomo28umc.cloudfront.net/media/public/badges/reduxBadge.png",
    },
    {
      id: 2,
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
function TechSetting() {
  const [data, setData] = useState(techDummyData);

  const [selected, setSelected] = useState({ prerequisite: [], mainTechs: [] });
  const [_, updateData] = useUpdate();

  useEffect(() => {
    updateData(selected);
  }, [selected]);

  const Techs = () => {
    return useMemo(() => {
      return (
        <>
          {data.getAllTech.map((tech) => {
            return (
              <Img
                key={`tech-${tech.id}`}
                src={
                  tech.logo ??
                  "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
                }
                alt="이미지"
                onClick={(e) => {
                  e.preventDefault();
                  setSelected((selected) => ({
                    prerequisite: [...selected.prerequisite],
                    mainTechs: [...selected.mainTechs, tech.id],
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
          {data.getAllCourse.map((course) => (
            <Img
              size={250}
              key={`course-${course.courseId}`}
              src={
                course.logo ??
                "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
              }
              onClick={(e) => {
                e.preventDefault();
                setSelected((selected) => ({
                  mainTechs: [...selected.mainTechs],
                  courses: [...selected.prerequisite, course.courseId],
                }));
              }}
              alt="이미지"
            ></Img>
          ))}
        </>
      );
    }, [data.getAllTech]);
  };

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

      {selected.prerequisite &&
        selected.prerequisite.map((course) => <p key={course}>{course}</p>)}
      <Heading size="medium" level={3}>
        선택한 테크
      </Heading>
      {selected.mainTechs &&
        selected.mainTechs.map((tech) => <p key={tech}>{tech}</p>)}
    </>
  );
}

export default memo(TechSetting);
