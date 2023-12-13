import { styled } from "styled-components";
import { Carousel } from "./carousel";
import type { FC, PropsWithChildren } from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Carousel> = {
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const Container = styled.div`
  max-width: 900px;
`;

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

export const Default: Story = {
  render: (args) => (
    <Container>
      <Carousel {...args}>
        {Array.from({ length: 15 }).map((_, i) => (
          <Item width={100} height={200} key={i}>
            {i}
          </Item>
        ))}
      </Carousel>
    </Container>
  ),
  args: {
    spacing: 1,
  },
};

export const CustomButtons: Story = {
  render: (args) => (
    <Container>
      <Carousel {...args}>
        {Array.from({ length: 15 }).map((_, i) => (
          <Item width={100} height={200} key={i}>
            {i}
          </Item>
        ))}
      </Carousel>
    </Container>
  ),
  args: {
    components: { NextButton, BackButton },
  },
};

export const NoNavigation: Story = {
  render: (args) => (
    <Container>
      <Carousel {...args}>
        {Array.from({ length: 15 }).map((_, i) => (
          <Item width={100} height={200} key={i}>
            {i}
          </Item>
        ))}
      </Carousel>
    </Container>
  ),
  args: {
    disableNavigation: true,
  },
};
