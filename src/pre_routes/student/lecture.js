import AccordianSection from "../../shared/Accordian";
import { Box, Sidebar, Nav } from "grommet";
import styled from "styled-components";

const VideoContent = styled.div`
  min-width: 1200px;
  width: 100%;
  min-height: 70vh;
  background-color: brown;
`;
const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Comment = () => {
  return (
    <form>
      <input
        style={{
          border: "1px solid rgba(0,0,0,0.5)",
          width: "100%",
          height: "5rem",
        }}
      ></input>
      <button>등록</button>
    </form>
  );
};

export function Lecture({ classname = "TEST CLASS" }) {
  return (
    <Box flex direction="row" width={"100%"}>
      <Sidebar width="250px" header={classname} footer="WAYOUT">
        <Nav>
          <AccordianSection openAll={true}></AccordianSection>
        </Nav>
      </Sidebar>
      <ContentWrapper>
        <VideoContent />
        <Comment />
      </ContentWrapper>
    </Box>
  );
}
