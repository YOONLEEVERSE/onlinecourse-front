import { Heading } from "grommet";
import styled from "styled-components";
import { useEffect, useMemo, useState, memo } from "react";
import { useUpdate } from "../../hooks/useUpdate";
import { gql, useQuery } from "@apollo/client";

/**
 *   
      courseId: ID, => 현재 코스ID 없음.
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

const GETTECHANDCOURSE = gql`
  query {
    getAllTech {
      id
      name
      logo
    }

    getAllCourse {
      title
      logo
      level
      mainTechs {
        name
      }
    }
  }
`;
function TechSetting() {
  //const [data, setData] = useState(techDummyData);
  const { data } = useQuery(GETTECHANDCOURSE, {
    onCompleted: (data) => console.log("COMPLETE", data),
  });
  const [selected, setSelected] = useState({ prerequisite: [], mainTechs: [] });
  const [_, updateData] = useUpdate();

  useEffect(() => {
    updateData(selected);
  }, [selected]);

  const Techs = () => {
    return useMemo(() => {
      return (
        <>
          {data?.getAllTech &&
            data.getAllTech.map((tech) => {
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
    }, [data?.getAllTech]);
  };
  const Courses = () => {
    return useMemo(() => {
      return (
        <>
          {data?.getAllCourse &&
            data.getAllCourse.map((course) => (
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
    }, [data?.getAllTech]);
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

      {selected?.prerequisite &&
        selected.prerequisite.map((course) => <p key={course}>{course}</p>)}
      <Heading size="medium" level={3}>
        선택한 테크
      </Heading>
      {selected?.mainTechs &&
        selected.mainTechs.map((tech) => <p key={tech}>{tech}</p>)}
    </>
  );
}

export default memo(TechSetting);
