import { CarouselProvider, useCarousel } from "../context";
import {
  DefaultBackButton,
  DefaultNextButton,
} from "./default-navigation.button";
import { CarouselNavigation } from "./carousel.navigation";
import { CarouselBase } from "./carousel.base";
import { CarouselNavigationMode } from "./types";
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
  navigationMode?: CarouselNavigationMode;
}

export const Carousel: FC<PropsWithChildren<CarouselProps>> = ({
  children,
  components = { NextButton: DefaultNextButton, BackButton: DefaultBackButton },
  componentProps = {},
  spacing = 1,
  navigationMode = CarouselNavigationMode.hover,
}) => {
  const carouselApi = useCarousel();

  const { NextButton, BackButton } = components;
  return (
    <CarouselProvider {...carouselApi}>
      <CarouselBase items={children} spacing={spacing}>
        <CarouselNavigation
          NextButton={NextButton}
          BackButton={BackButton}
          nextButtonProps={componentProps.nextButton}
          backButtonProps={componentProps.backButton}
          mode={navigationMode}
        />
      </CarouselBase>
    </CarouselProvider>
  );
};
