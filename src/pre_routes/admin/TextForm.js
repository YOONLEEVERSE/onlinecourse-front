import { useState } from "react";
import styled from "styled-components";
import { useUpdate } from "../../hooks/useUpdate";
import {
  FileInput,
  Form,
  FormField,
  RadioButtonGroup,
  RangeInput,
  TextInput,
} from "grommet";

const GradientCircle = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-image: linear-gradient(
    ${(props) => props.degree + "deg," + props.radientColor.join(",")}
  );
`;

const TextForm = () => {
  const [reduxData, updateData] = useUpdate();

  const handleChange = (nextValue) => {
    updateData(nextValue);
  };
  const handleColorChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newValue = { ...reduxData };
    if (!newValue.hasOwnProperty("color")) {
      newValue.color = [value];
    } else {
      let idx = 0;
      if (name === "secondColor") {
        idx = 1;
      } else if (name === "thirdColor") {
        idx = 2;
      }
      newValue.color[idx] = value;
    }
    updateData(newValue);
  };

  return (
    <>
      <Form value={reduxData} onChange={handleChange}>
        <FormField label="제목" name="name">
          <TextInput
            name="title"
            suggestions={["leejinhee", "yoonjunghwan"]}
            required
          />
        </FormField>
        <FormField label="부제목" name="subTitle" required>
          <TextInput name="subTitle" />
        </FormField>
        <FormField label="로고" name="logo">
          <FileInput name="logo"></FileInput>
        </FormField>
        <FormField label="레벨" name="level">
          <RadioButtonGroup name="level" options={["초급", "중급", "고급"]} />
        </FormField>
        <FormField label="컬러" name="color">
          <input
            type="color"
            name="firstColor"
            value={reduxData.color[0]}
            onChange={handleColorChange}
          />
          <input
            type="color"
            name="secondColor"
            value={reduxData.color[1]}
            onChange={handleColorChange}
          />
          <input
            type="color"
            name="thirdColor"
            value={reduxData.color[2]}
            onChange={handleColorChange}
          />
          <p>{reduxData.gradientDirection}deg</p>
          <RangeInput name="gradientDirection" min={0} max={360} step={10} />
        </FormField>
        <GradientCircle
          degree={reduxData.gradientDirection}
          radientColor={reduxData.color}
        />
        <FormField label="가격" name="price" pad>
          <p>{reduxData.price ? reduxData.price : 0}원</p>
          <RangeInput name="price" min={0} max={500000} step={1000} />
        </FormField>
      </Form>
      {/* <form autoComplete="off">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          placeholder="js초급반"
          value={data.title ?? ""}
          name="title"
          onChange={handleChange}
        ></input>
        <label htmlFor="subtitle">부제목</label>
        <input
          type="text"
          placeholder="웹개발 초급자는 다 들어와~"
          name="subTitle"
          value={data.subTitle ?? ""}
          onChange={handleChange}
        ></input>
        <label htmlFor="logo">로고</label>
        <input type="file" ref={fileRef}></input>
        <label htmlFor="maincolor">메인컬러</label>
        <input
          type="color"
          value={data.mainColor ?? ""}
          onChange={handleChange}
          name="mainColor"
        ></input>
        <label htmlFor="level">레벨</label>
        <span>초급</span>
        <input
          type="radio"
          name="level"
          value="초급"
          onChange={(e) => {
            console.log(e.target.value, e.target.name, data.level);
            handleChange(e);
          }}
        ></input>
        <span>중급</span>
        <input
          type="radio"
          name="level"
          value="중급"
          onChange={handleChange}
        ></input>
        <span>고급</span>
        <input
          type="radio"
          name="level"
          value="고급"
          onChange={handleChange}
        ></input>
        <label htmlFor="price">가격</label>
        <input
          type="range"
          name="price"
          min="0"
          max="100"
          step="10"
          value={data.price}
          onChange={(e) => {
            console.log(e.target.value);
            handleChange(e);
          }}
        ></input>
      </form> */}
    </>
  );
};

export default TextForm;
