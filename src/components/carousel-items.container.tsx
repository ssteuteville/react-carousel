import { styled } from "styled-components";

const SPACING_UNIT = 8;

export const CarouselItemsContainer = styled.div<{ spacing?: number }>`
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin-left: ${({ spacing = 1 }) => `${spacing * SPACING_UNIT * -1}`}px;

  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    scroll-snap-align: center;
    flex: 0 0 auto;
    margin-left: ${({ spacing = 1 }) => `${spacing * SPACING_UNIT}`}px;
  }
`;
