import styled from "styled-components";

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: black;
  padding: 10px 0;
  z-index: 100;
  & > div {
    max-width: 1200px;
    margin: 0 auto;
  }
  & :visited {
    color: white;
  }
  a {
    text-decoration: none;
  }
`;

function Header({ children }) {
  return (
    <HeaderWrapper>
      <div>{children}</div>
    </HeaderWrapper>
  );
}

export default Header;
