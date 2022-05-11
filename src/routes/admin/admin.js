import { gql } from "@apollo/client";
import { Button, Heading } from "grommet";
import { useNavigate } from "react-router-dom";
import CourseTable from "./ManageCourse";

import ManageTech from "./ManageTech";

export function Admin() {
  const navigate = useNavigate();
  return (
    <>
      <Heading size="medium" level={1}>
        기술
      </Heading>
      <ManageTech />
      <Heading size="medium" level={1}>
        강좌
      </Heading>
      <Button
        size="medium"
        style={{ padding: "10px" }}
        onClick={(e) => navigate("add-course")}
        primary
      >
        <p>강의 추가</p>
      </Button>
      <CourseTable />
    </>
  );
}
