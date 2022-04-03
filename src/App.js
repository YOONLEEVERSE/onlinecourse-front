import { Link, Routes, Route } from "react-router-dom";
import * as admin from "./routes/admin";
import * as student from "./routes/student";
import * as user from "./routes/user";
function App() {
  return (
    <div className="App">
      <div>헤더</div>
      <div>
        <Routes>
          <Route path="/courselist" element={<student.CourseList />}></Route>
          <Route path="/mypage" element={<user.MyPage />}></Route>
          <Route path="/lecture" element={<student.Lecture />}></Route>
          <Route path="/detail" element={<user.Detail />}></Route>
          <Route path="/pay" element={<student.Pay />}></Route>
          <Route path="/" element={<user.Main />}></Route>
          <Route path="/login" element={<user.Login />}></Route>
          <Route path="/register" element={<user.Login />}></Route>
          <Route path="/admin" element={<admin.Admin />}></Route>
        </Routes>
      </div>
      <div>
        <Link to="/courselist">courseList</Link>
        <Link to="/lecture">lecture</Link>
        <Link to="/mypage">mypage</Link>
        <Link to="/detail">detail</Link>
        <Link to="/pay">payment</Link>
        <Link to="/">main</Link>
        <Link to="/login">login</Link>
        <Link to="/register">register</Link>
        <Link to="/admin">admin</Link>
      </div>
      <div>사이드바</div>
      <div>푸타</div>
    </div>
  );
}

export default App;
