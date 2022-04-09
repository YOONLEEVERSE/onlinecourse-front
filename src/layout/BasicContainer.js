import { Outlet } from "react-router-dom";
import styled from "styled-components";
const ContainerStyle = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  @media only screen and (max-width) {
    width: 100%;
  }
`;
const BasicContainer = () => {
  return (
    <ContainerStyle>
      <Outlet />
    </ContainerStyle>
  );
};

export default BasicContainer;
