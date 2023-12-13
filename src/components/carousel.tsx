import { useRef } from "react";
import { useCarouselNavigation } from "../hooks/use-carousel-navigation";
import { CarouselContainer } from "./carousel.container";
import { CarouselItemsContainer } from "./carousel-items.container";
import {
  DefaultBackButton,
  DefaultNextButton,
} from "./default-navigation.button";
import { CarouselNavigation } from "./carousel.navigation";
import type { ClickableProps } from "./default-navigation.button";
import type { FC, JSXElementConstructor, PropsWithChildren } from "react";

export interface CarouselProps {
  components?: {
    NextButton: JSXElementConstructor<ClickableProps>;
    BackButton: JSXElementConstructor<ClickableProps>;
  };
  componentProps?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nextButton: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    backButton: any;
  };
  disableNavigation?: boolean;
  spacing?: number;
}

export const Carousel: FC<PropsWithChildren<CarouselProps>> = ({
  children,
  components = { NextButton: DefaultNextButton, BackButton: DefaultBackButton },
  componentProps = {},
  disableNavigation = false,
  spacing = 1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isAtEnd, isAtStart, scrollRight, scrollLeft } =
    useCarouselNavigation(ref);

  const { NextButton, BackButton } = components;
  return (
    <CarouselContainer>
      <CarouselItemsContainer spacing={spacing} ref={ref}>
        {children}
      </CarouselItemsContainer>
      {!disableNavigation && (
        <CarouselNavigation
          NextButton={NextButton}
          BackButton={BackButton}
          onBack={!isAtStart ? scrollLeft : undefined}
          onNext={!isAtEnd ? scrollRight : undefined}
          nextButtonProps={componentProps.nextButton}
          backButtonProps={componentProps.backButton}
        />
      )}
    </CarouselContainer>
  );
};
