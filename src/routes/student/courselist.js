import { Heading, Grid, Box, Button } from "grommet";
import { AddCircle } from "grommet-icons";
import Banner from "../../shared/banner";
import styled from "styled-components";
import { memo, useCallback, useEffect, useState } from "react";
const TechButton = ({ onClick, techName }) => (
  <div onClick={onClick}>
    <AddCircle />
    <Button>{techName}</Button>
  </div>
);

const TechBox = styled.div`
  width: 100%;
  display: flex;
  flex-basis: 500px;
  flex-wrap: wrap;
`;

const Filtering = ({ onChangeFilter }) => {
  const [filter, setFilter] = useState({ level: "", price: "", tech: "" });

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
          {["A", "B", "C", "D", "E"].map((data) => (
            <TechButton
              key={data}
              techName={data}
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

//필터설정된 것에 따라

export function CourseList() {
  const [techs] = useState([
    { mainTechs: ["A", "B"], level: "초급", price: 3000 },
    { mainTechs: ["A"], level: "중급", price: 1000 },
    { mainTechs: ["C", "D"], level: "고급", price: 5000 },
    { mainTechs: ["B", "D"], level: "고급", price: 3000 },
    { mainTechs: ["D"], level: "초급", price: 3000 },
    { mainTechs: ["A", "B", "C", "D"], level: "중급", price: 4000 },
    { mainTechs: ["B", "C"], level: "고급", price: 6000 },
    { mainTechs: ["A", "D"], level: "초급", price: 2000 },
    { mainTechs: ["A", "C"], level: "중급", price: 3000 },
  ]);
  const [filteterdTechs, setFilteredTechs] = useState(techs);

  function filteringTech(filter) {
    const filteredByLevel = filter.level
      ? techs.filter((d) => d.level === filter.level)
      : techs;

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

    if (filteterdTechs !== filteredByTech) {
      setFilteredTechs(filteredByTech);
    }
  }

  return (
    <>
      <Heading level="3" size="medium">
        All Courses
      </Heading>
      <Heading level="4" size="medium">
        초급부터 고급까지!
      </Heading>
      <Filtering onChangeFilter={filteringTech} />
      <TechBox>
        {filteterdTechs.map((tech, idx) => (
          <Banner techs={tech.mainTechs} level={tech.level} key={idx}></Banner>
        ))}
      </TechBox>
    </>
  );
}
