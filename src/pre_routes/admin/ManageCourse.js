import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Image,
  Button,
} from "grommet";

const GET_ALL_COURSE = gql`
  query {
    getAllCourse {
      title
      slug
      logo
      level
      mainTechs {
        name
      }
    }
  }
`;

const REMOVE_COURSE = gql`
  mutation ($slug: String) {
    removeCourse(slug: $slug) {
      success
      error
    }
  }
`;

function CourseTable() {
  const { data, error, loading } = useQuery(GET_ALL_COURSE, {
    onCompleted: (data) => console.log("코스데이터", data),
  });
  const [removeCourse] = useMutation(REMOVE_COURSE);
  const handleRemoveBtn = (slug) => {
    console.log("slug", slug);
    removeCourse({
      variables: { slug: slug },
      onCompleted: (data) => console.log("isSUCCESS?"),
    });
  };
  if (data) {
    return (
      <>
        <Table width={"100%"}>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom"></TableCell>
              <TableCell scope="col" border="bottom">
                강좌이름
              </TableCell>
              <TableCell scope="col" border="bottom">
                slug
              </TableCell>
              <TableCell scope="col" border="bottom">
                수정
              </TableCell>
              <TableCell scope="col" border="bottom">
                삭제
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.getAllCourse.map((course) => (
              <TableRow key={`table-row-${course.slug}`}>
                <TableCell>
                  <Image width={"150px"} src={course.logo} />
                </TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.slug}</TableCell>
                <TableCell>
                  <Button secondary>수정</Button>
                </TableCell>
                <TableCell>
                  <Button
                    secondary
                    onClick={() => {
                      handleRemoveBtn(course.slug);
                    }}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  } else if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <p>This site doesnt working</p>
        {error && console.log(error)}
      </>
    );
  }
}

export default CourseTable;
