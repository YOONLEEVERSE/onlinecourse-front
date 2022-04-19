import { useEffect, useRef } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../styleTheme";

const Multisteps = styled.ul`
  display: table;
  table-layout: fixed;
  width: 100%;
  counter-reset: step;

  & li {
    counter-increment: step;
    text-align: center;
    display: table-cell;
    position: relative;
    color: ${(props) => props.theme.color["brand-primary"]};
    &:before {
      content: "✔";
      display: block;
      margin: 0 auto 4px;
      background-color: ${(props) => props.theme.color.white};
      width: 36px;
      height: 36px;
      line-height: 32px;
      text-align: center;
      font-weight: bold;
      border: 2px solid ${(props) => props.theme.color["brand-primary"]};
      border-radius: 50%;
    }
    &:after {
      content: "";
      height: 2px;
      width: 100%;
      background-color: ${(props) => props.theme.color["brand-primary"]};
      position: absolute;
      top: 16px;
      left: 50%;
      z-index: -1;
    }
    &:last-child {
      &:after {
        display: none;
      }
    }
    &.is-active {
      &:before {
        content: "✔";
        font-family: inherit;
        font-weight: 700;
        background-color: ${(props) => props.theme.color.backgroundLight};
        border-color: ${(props) => props.theme.color["brand-primary"]};
      }
      &:after {
        background-color: ${(props) => props.theme.color.backgroundLight};
      }
      ~ li {
        color: #a09dbd;
        &:before {
          content: counter(step);
          font-family: inherit;
          font-weight: 700;
          background-color: ${(props) => props.theme.color.backgroundLight};
          border-color: ${(props) => props.theme.color.backgroundLight};
        }
        &:after {
          background-color: ${(props) => props.theme.color.backgroundLight};
        }
      }
    }
  }
`;

const MultiStepBar = ({ phase }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (phase > 1) {
      const beforeNode = ref.current.childNodes[phase - 2];
      beforeNode.classList.remove("is-active");
    }
    const childNode = ref.current.childNodes[phase - 1];
    childNode.classList.add("is-active");
  }, [phase]);

  return (
    <div className="container-fluid">
      <br />
      <br />
      <ThemeProvider theme={defaultTheme}>
        <Multisteps ref={ref}>
          <li>Start</li>
          <li>First Step</li>
          <li>Middle Stage</li>
          <li>Finish</li>
        </Multisteps>
      </ThemeProvider>
    </div>
  );
};

export default MultiStepBar;
