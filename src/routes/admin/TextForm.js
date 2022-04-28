import { useInput } from "../../hooks/useInput";
import { useEffect, useRef } from "react";
import { useUpdate } from "../../hooks/useUpdate";
const TextForm = () => {
  const { state: data, handleChange } = useInput(
    {
      title: "제목",
      subTitle: "부제목",
      mainColor: "#7575",
      level: "초급",
      price: "50",
    },
    true
  );
  const fileRef = useRef(null);
  const [reduxData, updateData] = useUpdate();

  useEffect(() => {
    let file = fileRef.current?.files[0];
    updateData({ ...data, price: +data.price, logo: file ?? "" });
    // if (file) {
    //   // const toBase64 = new Promise((resolve, reject) => {
    //   //   const fileReader = new FileReader();
    //   //   fileReader.readAsDataURL(file);
    //   //   fileReader.onloadend = () => resolve(fileReader.result);
    //   //   fileReader.onerror = (e) => reject(new Error(e));
    //   // });
    //   // (async () => {
    //   //   const file = await toBase64;
    //   //   updateData({ ...data, price: +data.price, logo: file });
    //   // })();
    //   updateData({ ...data, price: +data.price, logo: file });
    // } else {
    //   updateData({ ...data, price: +data.price, logo: "" });
    // }
  }, [data]);

  return (
    <form autoComplete="off">
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
    </form>
  );
};

export default TextForm;
