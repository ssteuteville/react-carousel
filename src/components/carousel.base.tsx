import { useCarouselContext } from "../context";
import { CarouselContainer } from "./carousel.container";
import { CarouselItemsContainer } from "./carousel-items.container";
import type { FC, PropsWithChildren, ReactNode } from "react";

export interface CarouselBaseProps {
  spacing?: number;
  items: ReactNode;
}

export const CarouselBase: FC<PropsWithChildren<CarouselBaseProps>> = ({
  items,
  spacing,
  children,
}) => {
  const { containerRef } = useCarouselContext();

  return (
    <CarouselContainer>
      <CarouselItemsContainer spacing={spacing} ref={containerRef} tabIndex={0}>
        {items}
      </CarouselItemsContainer>
      {children}
    </CarouselContainer>
  );
};
