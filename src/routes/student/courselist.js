import { Heading, Grid, Box, Button } from "grommet";
import { AddCircle } from "grommet-icons";
import Banner from "../../shared/banner";
import styled from "styled-components";
import { useEffect, useState, memo } from "react";
import { useQuery, gql } from "@apollo/client";

const TechButton = memo(({ onClick, techName }) => (
  <div onClick={onClick}>
    <AddCircle />
    <Button>{techName}</Button>
  </div>
));

const TechBox = styled.div`
  width: 100%;
  display: flex;
  flex-basis: 500px;
  flex-wrap: wrap;
`;

const Filtering = ({ onChangeFilter, techs }) => {
  const [filter, setFilter] = useState({ level: "", price: "", tech: "" });
  console.log(techs);
  function addFilteringCondition(kindOfFilter, filter) {
    setFilter((pre) => ({ ...pre, [kindOfFilter]: filter }));
  }

  useEffect(() => {
    onChangeFilter(filter);
  }, [filter]);
  return (
    <>
      <Grid
        rows={["100px", "100px"]}
        columns={["20%", "50%"]}
        gap="small"
        areas={[
          { name: "level", start: [0, 0], end: [0, 1] },
          { name: "price", start: [0, 1], end: [0, 1] },
          { name: "tech", start: [1, 0], end: [1, 1] },
        ]}
      >
        <Box gridArea="level" background="brand">
          <Heading level="5" size="small">
            Filter by Level
          </Heading>
          <Button
            onClick={() => {
              addFilteringCondition("level", "초급");
            }}
          >
            초급
          </Button>
          <Button
            onClick={() => {
              addFilteringCondition("level", "중급");
            }}
          >
            중급
          </Button>
          <Button
            onClick={() => {
              addFilteringCondition("level", "고급");
            }}
          >
            고급
          </Button>
        </Box>
        <Box gridArea="price" background="light-5">
          <Heading level="5" size="small">
            Filter by Price
          </Heading>
          <Button
            primary
            onClick={() => {
              addFilteringCondition("price", "유료");
            }}
          >
            유료
          </Button>
          <Button
            primary
            onClick={() => {
              addFilteringCondition("price", "무료");
            }}
          >
            무료
          </Button>
        </Box>
        <Box gridArea="tech" background="light-2">
          <Heading level="5" size="small">
            Filter by Tech
          </Heading>
          {techs.map((data) => (
            <TechButton
              key={`tech${data.id}`}
              techName={data.name}
              onClick={() => addFilteringCondition("tech", data)}
            />
          ))}
        </Box>
      </Grid>
      <p>{filter.level}</p>
      <p>{filter.price}</p>
      <p>{filter.tech}</p>
    </>
  );
};

const GET_ALL_COURSE_AND_TECH = gql`
  query getAllCourseAndTech {
    getAllCourse {
      title
      subTitle
      slug
      mainTechs {
        name
        id
      }
      level
      price
      logo
      techNames @client
    }
  }
`;

export function CourseList() {
  const [filteredTechs, setFilteredTechs] = useState(null);
  const {
    data: techs,
    error,
    loading,
  } = useQuery(GET_ALL_COURSE_AND_TECH, {
    onCompleted: (data) => {
      console.log("GETALLCOURSE TEST LOCAL", data);
      setFilteredTechs(data.getAllCourse);
    },
    onError: (error) => {
      console.error("HH?", error);
    },
  });

  function filteringTech(filter) {
    const filteredByLevel = filter.level
      ? techs.getAllCourse.filter((d) => d.level === filter.level)
      : techs.getAllCourse;

    const filteredByPrice = filter.price
      ? filteredByLevel.filter((d) => {
          if (filter.price === "무료") {
            return d.price === 0;
          }
          if (filter.price === "유료") {
            return d.price > 0;
          }
          return false;
        })
      : filteredByLevel;

    const filteredByTech = filter.tech
      ? filteredByPrice.filter((d) => d.mainTechs.includes(filter.tech))
      : filteredByPrice;

    if (filteredTechs !== filteredByTech) {
      setFilteredTechs(filteredByTech);
    }
  }

  if (techs) {
    return (
      <>
        <Heading level="3" size="medium">
          All Courses
        </Heading>
        <Heading level="4" size="medium">
          초급부터 고급까지!
        </Heading>
        {/* <Filtering
          onChangeFilter={filteringTech}
          techs={techs?.getAllTech ?? null}
        /> */}
        <TechBox>
          {filteredTechs &&
            filteredTechs.map((tech, idx) => (
              <Banner
                title={tech.title}
                subTitle={tech.subTitle}
                level={tech.level}
                imgSrc={tech.logo}
                key={idx}
              ></Banner>
            ))}
        </TechBox>
      </>
    );
  } else if (loading) {
    return <>로딩중</>;
  } else if (error) {
    return <>에러발생</>;
  }
}
