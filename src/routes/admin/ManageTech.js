import { Button, FileInput, Form, FormField, TextInput } from "grommet";
import { useMutation, useQuery } from "@apollo/client";
import { Add } from "grommet-icons";
import { GET_ALL_TECH } from "../../graphql/query";
import { ADD_TECH_TEST } from "../../graphql/mutation";
import { useState, useRef } from "react";
import CreateBadge from "./CreateBadge";
import Modal from "../../shared/modal";
const dummyTech = [
  {
    name: "react",
    logo: "https://d1telmomo28umc.cloudfront.net/media/public/badges/React_Z6rkrgv.png",
  },
  {
    name: "redux",
    logo: "https://d1telmomo28umc.cloudfront.net/media/public/badges/reduxBadge.png",
  },
];

function ManageTech({ tech = dummyTech }) {
  const [isOn, setIsOn] = useState(false);
  const ResultImgRef = useRef(null);
  const titleRef = useRef(null);
  const { data, loading, error } = useQuery(GET_ALL_TECH, {
    onCompleted: (data) => console.log("가져오기 성공", data),
  });
  const [addTechMutation] = useMutation(ADD_TECH_TEST, {
    onCompleted: (data) => console.log("등록 완", data),
    onError: (error) => console.log("등록 실패", error),
  });

  const Techs = ({ techlist = dummyTech }) => {
    return (
      <>
        {techlist.map((tech) => {
          return (
            <span
              style={{
                display: "inline-block",
                width: "70px",
              }}
            >
              <img alt="이미지 없음" src={tech.logo} width="64px"></img>
              <p style={{ textAlign: "center" }}>{tech.name}</p>
            </span>
          );
        })}
      </>
    );
  };
  //gql에 추가할 때 input:{name:"name",logo:"base64"} 형태로 넣어줘야 함.
  const AddTechBtn = ({ onClick }) => {
    return (
      <Button onClick={onClick} primary>
        <Add color="white" />
      </Button>
    );
  };

  const AddTech = () => {
    return (
      <div>
        <FormField label="추가할 테크 이름">
          <TextInput name="title" ref={titleRef}></TextInput>
          <input type="file" ref={ResultImgRef}></input>
        </FormField>
        {/* <CreateBadge ref={ResultImgRef} />
         */}

        <Button onClick={() => setIsOn(false)}>취소하기</Button>
        <Button
          primary
          onClick={() => {
            //const imgSrc = ResultImgRef.current?.currentSrc;
            const imgSrc = ResultImgRef.current?.files[0];
            const title = titleRef.current?.value;
            console.log("하이", imgSrc, title);
            if (imgSrc && title) {
              addTechMutation({
                variables: {
                  name: title,
                  logo: imgSrc,
                },
              });
            }
          }}
        >
          추가하기
        </Button>
        {/**클릭했을 때 테크 추가해야함. name, logo 알아야 함.*/}
      </div>
    );
  };

  return (
    <>
      {loading && <p>로딩중...</p>}
      {data && <Techs techlist={data.getAllTech}></Techs>}
      {/* <Techs techlist={tech}></Techs> */}
      <AddTechBtn
        onClick={(e) => {
          e.preventDefault();
          setIsOn(true);
        }}
      ></AddTechBtn>
      <Modal
        isOn={isOn}
        handleIsOn={() => setIsOn(false)}
        contents={<AddTech />}
        header="테크 추가"
      />
    </>
  );
}

export default ManageTech;
