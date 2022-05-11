import { Box, Heading, Stack, Text } from "grommet";
import styled from "styled-components";
import { useEffect, useMemo, useState, memo } from "react";
import { useUpdate } from "../../hooks/useUpdate";
import { gql, useQuery, useApolloClient } from "@apollo/client";

const Img = styled.img`
  width: ${(props) => props.size ?? 60}px;
`;
const SelectedImg = styled(Img)`
  opacity: 30%;
`;
const TechContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-basis: 250px;
  flex-wrap: wrap;
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
      slug
      level
      mainTechs {
        name
      }
    }
  }
`;

function TechSetting() {
  //const [data, setData] = useState(techDummyData);
  const client = useApolloClient();
  const data = client.readQuery({ query: GETTECHANDCOURSE });
  const [selected, setSelected] = useState({ prerequisite: [], mainTechs: [] });
  const [_, updateData] = useUpdate();
  const NULLIMG = useMemo(
    () =>
      "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png",
    []
  );

  useEffect(() => {
    updateData(selected);
  }, [selected]);

  const Techs = () => {
    return useMemo(() => {
      return (
        <TechContainer>
          {data?.getAllTech &&
            data.getAllTech.map((tech) => {
              if (selected.mainTechs.includes(+tech.id)) {
                //선택된 테크일 때.
                return (
                  <Stack
                    anchor="top-right"
                    style={{
                      width: "60px",
                      display: "inline-block",
                      cursor: "pointer",
                    }}
                  >
                    <SelectedImg
                      key={`tech-${tech.id}`}
                      src={tech.logo ?? NULLIMG}
                      alt="이미지"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelected((selected) => {
                          let deletedValue = [...selected.mainTechs];
                          deletedValue = deletedValue.filter(
                            (value) => value !== +tech.id
                          );
                          return {
                            prerequisite: [...selected.prerequisite],
                            mainTechs: deletedValue,
                          };
                        });
                      }}
                    />
                    <Box
                      background="black"
                      pad={{ horizontal: "xsmall" }}
                      round
                    >
                      <Text>X</Text>
                    </Box>
                  </Stack>
                );
              }
              //선택되지 않은 테크일 때
              return (
                <Img
                  key={`tech-${tech.id}`}
                  src={tech.logo ?? NULLIMG}
                  alt="이미지"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected((selected) => ({
                      prerequisite: [...selected.prerequisite],
                      mainTechs: [...selected.mainTechs, +tech.id],
                    }));
                  }}
                ></Img>
              );
            })}
        </TechContainer>
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
                size={100}
                key={`course-${course.courseId}-${course.slug}`}
                src={
                  course.logo ??
                  "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
                }
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  setSelected((selected) => ({
                    mainTechs: [...selected.mainTechs],
                    courses: [...selected.prerequisite, course.courseId],
                  }));
                }}
                alt="이미지"
              />
            ))}
        </>
      );
    }, [data?.getAllTech]);
  };

  return (
    <div>
      <Heading size="medium" level={2}>
        MainTechs
      </Heading>
      <Techs />
      <Courses />
    </div>
  );
}

export default memo(TechSetting);
