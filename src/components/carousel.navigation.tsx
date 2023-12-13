import {
  LeftButtonContainer,
  RightButtonContainer,
} from "./navigation-button.container";
import type { ClickableProps } from "./default-navigation.button";
import type { FC, JSXElementConstructor } from "react";

interface CarouselNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  NextButton: JSXElementConstructor<ClickableProps>;
  BackButton: JSXElementConstructor<ClickableProps>;
  nextButtonProps?: any;
  backButtonProps?: any;
}

export const CarouselNavigation: FC<CarouselNavigationProps> = ({
  onBack,
  onNext,
  NextButton,
  BackButton,
  nextButtonProps,
  backButtonProps,
}) => {
  return (
    <>
      {onBack && (
        <LeftButtonContainer>
          <BackButton {...(backButtonProps ?? {})} onClick={() => onBack()} />
        </LeftButtonContainer>
      )}
      {onNext && (
        <RightButtonContainer>
          <NextButton {...(nextButtonProps ?? {})} onClick={() => onNext()} />
        </RightButtonContainer>
      )}
    </>
  );
};
