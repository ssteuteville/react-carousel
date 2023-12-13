import { createContext, useContext, useRef } from "react";
import { useCarouselNavigation } from "./hooks/use-carousel-navigation";
import type { FC, PropsWithChildren, RefObject } from "react";

export interface CarouselApi {
  containerRef: RefObject<HTMLDivElement>;
  navigation: {
    isAtStart: boolean;
    isAtEnd: boolean;
    scrollRight: () => void;
    scrollLeft: () => void;
    jumpToElement: (index: number) => void;
  };
}

const carouselContext = createContext<CarouselApi>({
  containerRef: null as unknown as RefObject<HTMLDivElement>,
  navigation: {
    isAtStart: false,
    isAtEnd: false,
    scrollLeft: () => {},
    scrollRight: () => {},
    jumpToElement: () => {},
  },
});

export const useCarousel = (): CarouselApi => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigation = useCarouselNavigation(containerRef);

  return {
    containerRef,
    navigation,
  };
};

export const useCarouselContext = () => useContext(carouselContext);

export const CarouselProvider: FC<PropsWithChildren<CarouselApi>> = ({
  children,
  ...api
}) => (
  <carouselContext.Provider value={api}>{children}</carouselContext.Provider>
);
