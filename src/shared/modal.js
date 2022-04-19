import styled from "styled-components";

const ModalLayout = styled.div`
  display: ${({ isOn }) => (isOn ? "block" : "none")}; /* Hidden by default */
  position: fixed;
  top: 25%;
  left: 25%;
  padding: 20px;
  background-color: #fefefe;
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
  & > div {
    width: 100%;
    max-height: 50vh;
    padding: 10px 0;
    overflow: scroll;
  }
  & > nav {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }
  & .exitBtn:hover,
  & .exitBtn:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const ExitPanel = styled.div`
  display: ${({ isOn }) => (isOn ? "block" : "none")};
  position: fixed; /* Stay in place */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const Modal = ({ isOn, handleIsOn, header = "this is header", contents }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ExitPanel isOn={isOn} onClick={handleIsOn}></ExitPanel>
      <ModalLayout isOn={isOn}>
        <nav>
          <span>{header}</span>
          <span
            onClick={(e) => {
              handleIsOn(e);
            }}
            className="exitBtn"
          >
            &times;
          </span>
        </nav>
        <div>{contents}</div>
      </ModalLayout>
    </div>
  );
};

export default Modal;
