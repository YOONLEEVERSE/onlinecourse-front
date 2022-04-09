import styled from "styled-components";

const Wrapper = styled.div`
  & > img {
    width: 350px;
  }
  & > div:first-child {
    position: relative;
    top: 50px;
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
  background-color: ${(props) => ["green", "orange", "red"][props.level]};
  color: white;
  text-align: center;
  line-height: 30px;
  width: 50px;
  height: 30px;
  border-radius: 50px;
`;

const Tech = styled.div`
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
  imgSrc = `${process.env.PUBLIC_URL}/img/MOKOKO_04.png`,
  techs = ["A", "B", "C", "D"],
  level = 1,
}) {
  return (
    <Wrapper>
      <LevelTag level={level}>{["초급", "중급", "고급"][level]}</LevelTag>
      <img src={imgSrc} alt="Something went Wrong"></img>
      <Tech>{techs}</Tech>
    </Wrapper>
  );
}

export default Banner;
