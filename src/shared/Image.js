import { forwardRef } from "react";
import styled from "styled-components";

const Image = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const LogoImg = (width, height) => {
  const imgWidth = width ?? 250;
  const imgHeight = height ?? 150;
  return <Image width={imgWidth} height={imgHeight} />;
};

export const BadgeImg = forwardRef((props, ref) => {
  /** 정사이즈 원형으로 출력 */
  const badgeSize = props.size ?? 64;
  return (
    <Image src={props.src} width={badgeSize} height={badgeSize} ref={ref} />
  );
});
