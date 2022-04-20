import { useQuery } from "@apollo/client";
import { GET_ALL_TECH } from "../../graphql/query";
import AddCourse from "./AddCourse";

const dummyTech = [
  {
    name: "react",
    logo: "https://d1telmomo28umc.cloudfront.net/media/public/badges/React_Z6rkrgv.png",
  },
  {
    name: "redux",
    logo: "https://d1telmomo28umc.cloudfront.net/media/public/badges/reduxBadge.png",
  },
]; //tech목록은 한 번만 불러와서 재활용하면 ㅁ될텐데?

function CreateLecture() {
  //const { data, error, loading } = useQuery(GET_ALL_TECH); => 실제 데이터 불러올때!
  //강좌 목록 보여주는 곳도 있어야겠구나,ㅇ,,
  /**
   * query getAllCourse {
    getAllCourse {
      courseId
      title
      logo
      level
      price
      mainTechs {
        id
        name
        logo
      }
    }이정도만 불러와서 표로 보여주고,, 하면 될 것 같은데?
  }
   */
  return (
    <div>
      <AddCourse></AddCourse>
    </div>
  );
}

export default CreateLecture;
