import { Route, Routes } from "react-router-dom";
import AddCourse from "./AddCourse";
import { Admin } from "./admin";

export const AdminRoutes = () => (
  <Routes>
    <Route index element={<Admin />}></Route>
    <Route path="add-course" element={<AddCourse />}></Route>
  </Routes>
);
