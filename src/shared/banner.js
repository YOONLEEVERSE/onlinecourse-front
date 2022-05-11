import { Heading } from "grommet";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  & > img {
    width: 350px;
  }
  & > div:nth-child(2) {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 100;
  }
  & > div:nth-child(3) {
    position: relative;
    top: -3rem;
    left: 25px;
  }
`;

const LevelTag = styled.div`
  background-color: ${(props) =>
    ["green", "orange", "red"][["초급", "중급", "고급"].indexOf(props.level)]};
  color: white;
  text-align: center;
  line-height: 30px;
  width: 50px;
  height: 30px;
  border-radius: 50px;
`;

const Description = styled.div`
  width: 250px;
  height: 3rem;
  background-color: #262626;
  color: whitesmoke;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  margin: 0;
`;

function Banner({
  logo = `${process.env.PUBLIC_URL}/img/MOKOKO_04.png`,
  level = "초급",
  title = "title",
  subTitle = "subTitle",
}) {
  return (
    <Wrapper>
      <img src={logo} alt="Something went Wrong"></img>
      <LevelTag level={level}>{level}</LevelTag>
      <Description>
        <Heading size="small" level="3">
          {title}
        </Heading>
        <Heading size="small" level="5">
          {subTitle}
        </Heading>
      </Description>
    </Wrapper>
  );
}

export default Banner;
