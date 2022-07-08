import { Link } from "react-router-dom";
import styled from "styled-components";
import useLogin from "../hooks/useLogin";

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  background-color: black;
  padding: 10px 0;
  z-index: 100;
  & > div {
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  & :visited {
    color: white;
  }
  a {
    text-decoration: none;
  }
`;

function Header({ children }) {
  const { isLogin, userData, unauthorization } = useLogin();
  return (
    <HeaderWrapper>
      <Link to="/">main </Link>
      <Link to="/courselist">Courses </Link>
      <Link to="/login">login </Link>
      {isLogin && (
        <>
          <Link
            to="#"
            onClick={() => {
              unauthorization();
            }}
          >
            로그아웃
          </Link>
          <Link to="/mypage">마이페이지</Link>
        </>
      )}
      {isLogin && userData.name === "관리자" && <Link to="/admin">관리자</Link>}
    </HeaderWrapper>
  );
}

export default Header;
