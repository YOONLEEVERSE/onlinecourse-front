import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { ADD_COURSE } from "../../graphql/mutation";
import { useEffect, useState } from "react";

function LastPage() {
  const data1 = useSelector((state) => state.newCourse);
  const data2 = useSelector((state) => state.addCourseInput);
  const [addCourse, { loading }] = useMutation(ADD_COURSE);
  const [comment, setComment] = useState("강의를 등록하고 있습니다.");
  useEffect(() => {
    const newData = { ...data1 };
    const colorCss = `linear-gradient(${
      data1.gradientDirection
    }deg,${data1.color.join(",")});`;
    newData.mainColor = colorCss;
    newData.price = +newData.price;
    delete newData.color;
    delete newData.gradientDirection;
    console.log("보낼 데이터", { newData, videoCategories: data2 });
    addCourse({
      variables: {
        ...newData,
        logo: newData.logo[0],
        videoCategories: data2,
      },
      onCompleted: (data) => {
        console.log("COMPLETE", data);
        setComment("강의 등록을 성공했습니다.");
      },
      onError: (error) => console.error(error),
    });
  }, []);

  return <div>{comment}</div>;
}

export default LastPage;
