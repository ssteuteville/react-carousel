import { styled } from "styled-components";
import type { FC } from "react";

export interface ClickableProps {
  onClick: () => void;
  [key: string]: any;
}

const DefaultNavigationButton = styled("button")`
  cursor: pointer;
  background: white;
  border-radius: 15px;
  border: none;
  padding: 0.5rem;
`;
export const ArrowLeft: FC<{ size?: number; color?: string }> = ({
  size = 30,
  color = "#000000",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H6M12 5l-7 7 7 7" />
  </svg>
);
// ArrowRight
export const ArrowRight: FC<{ size?: number; color?: string }> = ({
  size = 30,
  color = "#000000",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h13M12 5l7 7-7 7" />
  </svg>
);
export const DefaultBackButton: FC<ClickableProps> = ({ onClick }) => {
  return (
    <DefaultNavigationButton onClick={onClick}>
      <ArrowLeft />
    </DefaultNavigationButton>
  );
};
export const DefaultNextButton: FC<ClickableProps> = ({ onClick }) => {
  return (
    <DefaultNavigationButton onClick={onClick}>
      <ArrowRight />
    </DefaultNavigationButton>
  );
};
