const TextForm = () => {
  return (
    <form autoComplete="off">
      <label htmlFor="title">제목</label>
      <input type="text" placeholder="js초급반"></input>
      <label htmlFor="subtitle">부제목</label>
      <input type="text" placeholder="웹개발 초급자는 다 들어와~"></input>
      <label htmlFor="logo">로고</label>
      <input type="file"></input>
      <label htmlFor="maincolor">메인컬러</label>
      <input type="color"></input>
      <label htmlFor="level">레벨</label>
      <span>초급</span>
      <input type="radio" name="level" value={"초급"}></input>
      <span>중급</span>

      <input type="radio" name="level" value="중급"></input>
      <span>고급</span>

      <input type="radio" name="level" value="고급"></input>
      <label htmlFor="price">가격</label>
      <input type="range" name="price" min="0" max="100" step="10"></input>
    </form>
  );
};

export default TextForm;
