import { CarouselProvider, useCarousel } from "../context";
import {
  DefaultBackButton,
  DefaultNextButton,
} from "./navigation/default-navigation.button";
import { CarouselNavigation } from "./navigation/carousel.navigation";
import { CarouselBase } from "./base/carousel.base";
import type { CarouselNavigationMode } from "./types";
import type { CarouselBaseProps } from "./base/carousel.base";
import type { ClickableProps } from "./navigation/default-navigation.button";
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
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const Carousel: FC<PropsWithChildren<CarouselProps>> = ({
  children,
  components = { NextButton: DefaultNextButton, BackButton: DefaultBackButton },
  componentProps = {},
  spacing = 1,
  navigationMode,
  autoPlay,
  autoPlayInterval,
}) => {
  const carouselApi = useCarousel({ autoPlay, autoPlayInterval });

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
