import { Button, FormField, TextInput } from "grommet";
import { useMutation, useQuery } from "@apollo/client";
import { Add } from "grommet-icons";
import { GET_ALL_TECH } from "../../graphql/query";
import { ADD_TECH_TEST, REMOVE_TECH } from "../../graphql/mutation";
import { useState, useRef } from "react";
import CreateBadge from "./CreateBadge";
import Modal from "../../shared/modal";
import styled from "styled-components";

const Tech = styled.span`
  &:hover {
    position: relative;
    cursor: pointer;
    &:after {
      content: "삭제";
      position: absolute;
      color: white;
      width: 64px;
      height: 64px;
      line-height: 64px;
      text-align: center;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.7);
      top: 0;
      left: 0;
      opacity: 1;
    }
  }
`;

function ManageTech() {
  const [isOn, setIsOn] = useState(false);
  const ResultImgRef = useRef(null);
  const titleRef = useRef(null);
  const { data, loading, refetch } = useQuery(GET_ALL_TECH);
  const [addTechMutation] = useMutation(ADD_TECH_TEST, {
    onCompleted: () => refetch(),
  });
  const [removeTech] = useMutation(REMOVE_TECH, {
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
            <Tech
              style={{
                display: "inline-block",
                width: "70px",
              }}
              key={tech.name}
              onClick={() => {
                removeTech({ variables: { id: +tech.id } });
              }}
            >
              <img alt="이미지 없음" src={tech.logo} width="64px"></img>
              <p style={{ textAlign: "center" }}>{tech.name}</p>
            </Tech>
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
            const imgSrc = ResultImgRef.current?.src; //파일 그대로 업로드
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
