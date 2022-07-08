import styled from "styled-components";
import { Heading } from "grommet";
import Banner from "../../../shared/banner";
import { useNavigate } from "react-router-dom";
const CourseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  height: 250px;
  & > div:first-child {
    flex-grow: 1;
  }
  & > div:last-child {
    flex-grow: 4;
  }
`;

const Description = styled.div`
  & p:before {
    content: "\02295";
  }
  

`;

export default function CourseCapsule({ data }) {
  const { title, mainTechs, subTitle, level, logo, slug } = data;
  const navigate = useNavigate();

  return (
    <CourseWrapper
      onClick={(e) => {
        navigate(`/pay/${slug}`);
      }}
      style={{ cursor: "pointer" }}
    >
      <Banner level={level} title={title} subTitle={subTitle} logo={logo} />
      <Description>
        <Heading level="3" size="medium">
          {title}
        </Heading>
        <div>
          {mainTechs.map((tech) => (
            <img
              src={tech.logo}
              alt={tech.name}
              key={tech.name}
              width="50px"
            ></img>
          ))}
          <p>{subTitle}</p>
        </div>
      </Description>
    </CourseWrapper>
  );
}
