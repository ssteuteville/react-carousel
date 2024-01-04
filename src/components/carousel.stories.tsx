import { styled } from "styled-components";
import { Carousel } from "./carousel";
import { CarouselNavigationMode } from "./types";
import type { FC, PropsWithChildren } from "react";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";

const Container = styled.div`
  max-width: 900px;
`;

const wrapWithContainer = (StoryComponent: StoryFn) => (
  <Container>
    <StoryComponent />
  </Container>
);

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  decorators: [wrapWithContainer],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const Item = styled.div<{ width: number; height: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: green;
  font-size: 15px;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  border: 1px solid green;
`;

const NextButton: FC<PropsWithChildren<{ onClick: () => void }>> = ({
  onClick,
}) => {
  return <button onClick={onClick}>next</button>;
};

const BackButton: FC<PropsWithChildren<{ onClick: () => void }>> = ({
  onClick,
}) => {
  return <button onClick={onClick}>back</button>;
};

export const Playground: Story = {
  args: {
    children: Array.from({ length: 15 }).map((_, i) => (
      <Item width={100} height={200} key={i}>
        {i}
      </Item>
    )),
  },
};

export const Default: Story = {
  render: (args) => (
    <Carousel {...args}>
      {Array.from({ length: 15 }).map((_, i) => (
        <Item width={100} height={200} key={i}>
          {i}
        </Item>
      ))}
    </Carousel>
  ),
  args: {
    spacing: 1,
  },
};

export const CustomButtons: Story = {
  render: (args) => (
    <Carousel {...args}>
      {Array.from({ length: 15 }).map((_, i) => (
        <Item width={100} height={200} key={i}>
          {i}
        </Item>
      ))}
    </Carousel>
  ),
  args: {
    components: { NextButton, BackButton },
  },
};

export const NavigationMode: Story = {
  render: (args) => (
    <Carousel {...args}>
      {Array.from({ length: 15 }).map((_, i) => (
        <Item width={100} height={200} key={i}>
          {i}
        </Item>
      ))}
    </Carousel>
  ),
  args: {
    navigationMode: CarouselNavigationMode.always,
  },
};

export const AutoPlay: Story = {
  render: (args) => (
    <Carousel {...args}>
      {Array.from({ length: 15 }).map((_, i) => (
        <Item width={100} height={200} key={i}>
          {i}
        </Item>
      ))}
    </Carousel>
  ),
  args: {
    autoPlay: true,
    autoPlayInterval: 1500,
  },
};
