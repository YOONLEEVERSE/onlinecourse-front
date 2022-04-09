import { Heading, Grid, Box, Button } from "grommet";
import { AddCircle } from "grommet-icons";
import Banner from "../../shared/banner";
import styled from "styled-components";
const TechButton = () => (
  <div>
    <AddCircle />
    <Button>test</Button>
  </div>
);

const TechBox = styled.div`
  width: 100%;
  display: flex;
  flex-basis: 500px;
  flex-wrap: wrap;
`;

const Filtering = () => {
  return (
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
        <Button primary>초급</Button>
        <Button primary>중급</Button>
        <Button primary>고급</Button>
      </Box>
      <Box gridArea="price" background="light-5">
        <Heading level="5" size="small">
          Filter by Price
        </Heading>
        <Button primary>유료</Button>
        <Button primary>무료</Button>
      </Box>
      <Box gridArea="tech" background="light-2">
        <Heading level="5" size="small">
          Filter by Tech
        </Heading>
        {[1, 2, 3, 4, 5].map((data) => (
          <TechButton key={data} />
        ))}
      </Box>
    </Grid>
  );
};

export function CourseList() {
  return (
    <>
      <Heading level="3" size="medium">
        All Courses
      </Heading>
      <Heading level="4" size="medium">
        초급부터 고급까지!
      </Heading>
      <Filtering />
      <TechBox>
        <Banner />
        <Banner />
        <Banner />
        <Banner />
        <Banner />
        <Banner />
        <Banner />
        <Banner />
        <Banner />
      </TechBox>
    </>
  );
}
