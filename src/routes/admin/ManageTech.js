import { Button, FormField, TextInput } from "grommet";
import { useMutation, useQuery } from "@apollo/client";
import { Add } from "grommet-icons";
import { GET_ALL_TECH } from "../../graphql/query";
import { ADD_TECH_TEST } from "../../graphql/mutation";
import { useState, useRef, useEffect } from "react";
import CreateBadge from "./CreateBadge";
import Modal from "../../shared/modal";

function ManageTech() {
  const [isOn, setIsOn] = useState(false);
  const ResultImgRef = useRef(null);
  const titleRef = useRef(null);
  const { data, loading, refetch } = useQuery(GET_ALL_TECH);
  const [addTechMutation] = useMutation(ADD_TECH_TEST, {
    onCompleted: () => refetch(),
  });

  const AddTechBtn = ({ onClick }) => {
    return (
      <Button onClick={onClick} primary>
        <Add color="white" />
        기술 추가하기
      </Button>
    );
  };

  const Techs = ({ techlist }) => {
    return (
      <>
        {techlist.map((tech) => {
          return (
            <span
              style={{
                display: "inline-block",
                width: "70px",
              }}
              key={tech.name}
            >
              <img alt="이미지 없음" src={tech.logo} width="64px"></img>
              <p style={{ textAlign: "center" }}>{tech.name}</p>
            </span>
          );
        })}
      </>
    );
  };

  const AddTech = () => {
    return (
      <div>
        <FormField label="추가할 테크 이름">
          <TextInput name="title" ref={titleRef}></TextInput>
        </FormField>
        <CreateBadge ref={ResultImgRef}></CreateBadge>
        <Button onClick={() => setIsOn(false)}>취소하기</Button>
        <Button
          primary
          onClick={async () => {
            const imgSrc = ResultImgRef.current?.src; //파일 그대로 업로드~
            const imgBlob = await (await fetch(imgSrc)).blob(); //base64 to blob
            const title = titleRef.current?.value;
            const imgFile = new File(
              [imgBlob],
              `${title}_${new Date().getTime()}.png`,
              { lastModified: new Date().getTime(), type: imgBlob.type }
            ); //blob to file
            if (imgFile && title) {
              addTechMutation({
                variables: {
                  name: title,
                  logo: imgFile,
                },
              });
            }
            setIsOn(false);
          }}
        >
          추가하기
        </Button>
      </div>
    );
  };

  return (
    <>
      {loading && <p>로딩중...</p>}
      {data && <Techs techlist={data.getAllTech} />}
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
