import { Routes, Route } from "react-router-dom";
import { Footer } from "grommet";
import BasicContainer from "./layout/BasicContainer";
import * as admin from "./routes/admin";
import * as student from "./routes/student";
import * as user from "./routes/user";
import Header from "./layout/header";
import AuthGuard from "./utils/AuthGuard";
import AdminGuard from "./utils/AdminGuard";

function App() {
  //const isLogin = useSelector((store) => store.isLogin);
  //isLogin, userData, authorization, unauthorization;
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<BasicContainer />}>
          <Route index element={<user.Main playtime={5000} />}></Route>
          <Route
            path="mypage"
            element={
              <AuthGuard>
                <user.MyPage />
              </AuthGuard>
            }
          ></Route>
          <Route
            path="pay/:slug"
            element={
              <AuthGuard>
                <student.Pay />
              </AuthGuard>
            }
          ></Route>
          <Route
            path="admin/*"
            element={
              <AdminGuard>
                <admin.AdminRoutes />
              </AdminGuard>
            }
          />

          <Route path="courselist" element={<student.CourseList />}></Route>
          <Route path="detail/:slug" element={<user.Detail />}></Route>
          <Route path="login" element={<user.Login />}></Route>
          <Route path="logout" element={<user.Login />}></Route>
          <Route path="register" element={<user.Register />}></Route>
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
