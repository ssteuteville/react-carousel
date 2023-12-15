# React Carousel
This project aims to provide a React based interface for creating carousels. A primary goal of the project is to have
as little opinion on how the carousel should look as possible. The project has two types of ways it can be used. The
first way and simplest way, is to use the Carousel component for a caruosel with some pre-built functionality and
customization options. The second way to use the library is to use building blocks provided by the library to build your
own custom carousel.

## Carousel Component
### Basic Usage
This example will render a carousel that fills its containers width, and uses default navigation buttons.
```tsx
import { Carousel } from "@steute.dev/react-carousel";
import { useExampleData } from "./some-file-of-your-own";
import { ExampleItem } from "./some-file-of-your-own";

const MyComponent: FC = () => {
  const exampleData = useExampleData(); // some sort of arrays
  
  return (
    <div style={{ maxWidth: "500px" }}>
      <Carousel>
        {exampleData.map((datum) => (<ExampleItem {...datum} key={datum.key} />))}
      </Carousel>
    </div>
  )
}
```

### Navigation Modes
The `Carousel` component has a prop called `navigationMode`. It can be set to a value in the enum `CarouselNavigaitonMode`.
```ts
export enum CarouselNavigationMode {
  never = "never", // never show navigation buttons
  always = "always", // always show navigation buttons
  hover = "hover", // always show navigation buttons on hover
  dynamicHover = "dynamic-hover", // only show navigation buttons on hover if the button will reveal more elements (defualt)
  dynamicAlways = "dynamic-always", // always show navigation buttons (without hover) if the button will reveal more elements
}
```

### Customization
You can use the `components` and `componentProps` properties to customize the `Carousel` component.
```tsx
import { Carousel } from "@steute.dev/react-carousel";
import { useExampleData } from "./some-file-of-your-own";
import { ExampleItem } from "./some-file-of-your-own";

// the only requirement of the button component is that it has an onClick prop that doesn't require parameters
import { YourButton } from './your-custom-button';

const components = {
  NextButton: YourButton,
  BackButton: YourButton,
}

// these props assume that the `YourButton` component has a `direction` and `color` prop
const componentProps = {
  nextButton: { direction: "right", color: "blue" },
  backButton: { direction: "left", color: "blue" }
}

const MyComponent: FC = () => {
  const exampleData = useExampleData(); // some sort of arrays
  
  return (
    <div style={{ maxWidth: "500px" }}>
      <Carousel components={components} componentProps={componentProps}>
        {exampleData.map((datum) => (<ExampleItem {...datum} key={datum.key} />))}
      </Carousel>
    </div>
  )
}
```

## Building your own compound component
### Building blocks
- CarouselBase - used to render items for the carousel
- CarouselNavigation - used to add navigation options
- DefaultNavigationButton - the default button used by Carousel
- LeftButtonContainer / RightButtonContainer - used to position buttons on top of the carousel
- CarouselProvider - used to provide context for carousel components
- useCarousel - creates a context object for CarouselProvider
- useCarouselContext - gets a carousel object from the CarouselProvider

### Usage
More documentation is on the way, for now read the source code for the `Carousel` component in this project.

## Storybook
https://ssteuteville.github.io/react-carousel

## Future Plans
- auto scrolling
- better docs
- unit tests
- feel free to submit requests with issues