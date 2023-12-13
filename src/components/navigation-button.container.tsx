import { styled } from "styled-components";
import { CarouselContainer } from "./carousel.container";

export const NavigationButtonContainer = styled("div")`
  position: absolute;
  top: 50%;
  z-index: 1;
  transition: transform 0.1s ease-in-out;
`;
export const RightButtonContainer = styled(NavigationButtonContainer)`
  right: 0;
  transform: translate(100%, -50%);

  ${CarouselContainer}:hover & {
    transform: translate(0%, -50%);
  }
`;
export const LeftButtonContainer = styled(NavigationButtonContainer)`
  left: 0;
  transform: translate(-100%, -50%);

  ${CarouselContainer}:hover & {
    transform: translate(0%, -50%);
  }
`;
