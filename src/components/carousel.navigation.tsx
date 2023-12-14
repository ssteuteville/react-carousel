import { useCarouselContext } from "../context";
import {
  LeftButtonContainer,
  RightButtonContainer,
} from "./navigation-button.container";
import { CarouselNavigationMode } from "./types";
import type { ClickableProps } from "./default-navigation.button";
import type { FC, JSXElementConstructor } from "react";

interface CarouselNavigationProps {
  NextButton: JSXElementConstructor<ClickableProps>;
  BackButton: JSXElementConstructor<ClickableProps>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextButtonProps?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  backButtonProps?: any;
  mode?: CarouselNavigationMode;
}

export const CarouselNavigation: FC<CarouselNavigationProps> = ({
  NextButton,
  BackButton,
  nextButtonProps,
  backButtonProps,
  mode = "dynamic-hover" as CarouselNavigationMode,
}) => {
  const carouselApi = useCarouselContext();

  if (mode === CarouselNavigationMode.never) {
    return null;
  }

  const { isAtStart, isAtEnd, scrollLeft, scrollRight } =
    carouselApi.navigation;

  const isDynamic =
    mode === CarouselNavigationMode.dynamicAlways ||
    mode == CarouselNavigationMode.dynamicHover;
  const isHover =
    mode === CarouselNavigationMode.hover ||
    mode === CarouselNavigationMode.dynamicHover;

  return (
    <>
      {(!isAtStart || !isDynamic) && (
        <LeftButtonContainer $isHoverOnly={isHover}>
          <BackButton {...(backButtonProps ?? {})} onClick={scrollLeft} />
        </LeftButtonContainer>
      )}
      {(!isAtEnd || !isDynamic) && (
        <RightButtonContainer $isHoverOnly={isHover}>
          <NextButton {...(nextButtonProps ?? {})} onClick={scrollRight} />
        </RightButtonContainer>
      )}
    </>
  );
};
