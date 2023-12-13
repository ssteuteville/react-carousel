import { CarouselProvider, useCarousel } from "../context";
import {
  DefaultBackButton,
  DefaultNextButton,
} from "./default-navigation.button";
import { CarouselNavigation } from "./carousel.navigation";
import { CarouselBase } from "./carousel.base";
import type { CarouselBaseProps } from "./carousel.base";
import type { ClickableProps } from "./default-navigation.button";
import type { FC, JSXElementConstructor, PropsWithChildren } from "react";

export interface CarouselProps extends Omit<CarouselBaseProps, "items"> {
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
}

export const Carousel: FC<PropsWithChildren<CarouselProps>> = ({
  children,
  components = { NextButton: DefaultNextButton, BackButton: DefaultBackButton },
  componentProps = {},
  disableNavigation = false,
  spacing = 1,
}) => {
  const carouselApi = useCarousel();
  const { isAtStart, isAtEnd, scrollLeft, scrollRight } =
    carouselApi.navigation;

  const { NextButton, BackButton } = components;
  return (
    <CarouselProvider {...carouselApi}>
      <CarouselBase items={children} spacing={spacing}>
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
      </CarouselBase>
    </CarouselProvider>
  );
};
