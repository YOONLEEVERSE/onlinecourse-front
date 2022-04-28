import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { ADD_COURSE } from "../../graphql/mutation";
import { useEffect } from "react";
function LastPage() {
  const data1 = useSelector((state) => state.newCourse);
  const data2 = useSelector((state) => state.addCourseInput);
  /**  $title: String
    $subTitle: String
    $logo: String
    $mainColor: String
    $level: String
    $price: Int
    $mainTechs: [Long]
    $prerequisite: [String]
    $videoCategories: [CategoryInput] */
  const [addCourse] = useMutation(ADD_COURSE);
  useEffect(() => {
    console.log("보낼 데이터", { ...data1, videoCategories: data2 });
    addCourse({
      variables: {
        ...data1,
        price: +data1.price,
        videoCategories: data2,
      },
      onCompleted: (data) => console.log("COMPLETE", data),
      onError: (error) => console.error(error),
    });
  }, []);
  return <div>라스트</div>;
}

export default LastPage;
