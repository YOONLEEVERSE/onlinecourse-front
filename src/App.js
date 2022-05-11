import { Link, Routes, Route } from "react-router-dom";
import { Footer } from "grommet";
import BasicContainer from "./layout/BasicContainer";
import * as admin from "./routes/admin";
import * as student from "./routes/student";
import * as user from "./routes/user";
import Header from "./layout/header";
import { useSelector } from "react-redux";

function App() {
  const userData = useSelector((store) => store.userData);
  const isLogin = useSelector((store) => store.isLogin);
  return (
    <div className="App">
      <Header>
        <Link to="/lecture">lecture </Link>
        <Link to="/detail">detail </Link>
        <Link to="/pay">payment </Link>
        <Link to="/">main </Link>
        <Link to="/courselist">Courses </Link>
        <Link to="/login">login </Link>
        <Link to="/register">register </Link>
        <Link to="/mypage">mypage </Link>
        <Link to="/admin">admin</Link>
        {/* {isLogin && (
          <>
            <Link to="/mypage">mypage </Link>
            <Link to="/admin">admin</Link>
          </>
        )} */}
      </Header>
      <Routes>
        <Route path="/" element={<BasicContainer />}>
          <Route index element={<user.Main playtime={5000} />}></Route>
          <Route path="courselist" element={<student.CourseList />}></Route>
          <Route path="mypage" element={<user.MyPage />}></Route>
          <Route path="detail" element={<user.Detail />}></Route>
          <Route path="pay/:slug" element={<student.Pay />}></Route>
          <Route path="login" element={<user.Login />}></Route>
          <Route path="register" element={<user.Register />}></Route>
          <Route path="admin/*" element={<admin.AdminRoutes />}></Route>
        </Route>
        <Route path="/lecture" element={<student.Lecture />}></Route>
      </Routes>
      <Footer>
        <p>copyright@jinii</p>
      </Footer>
    </div>
  );
}

export default App;
