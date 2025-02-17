import styled from "styled-components";

export interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  size?: "x-small" | "small" | "medium" | "large";
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  key?: number | string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
}

export const Button = ({
  primary = false,
  secondary = false,
  size = "medium",
  type = "button",
  disabled,
  key,
  children,
  style,
  label,
  className,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? "btn-primary "
    : secondary
    ? "btn-secondary"
    : "btn-default";
  return (
    <StyledButton
      primary={primary}
      secondary={secondary}
      size={size}
      type={type}
      className={["button", `button--${size}`, mode, `${className}`]
        .filter(Boolean)
        .join(" ")}
      style={style}
      disabled={disabled}
      key={key}
      {...props}
    >
      {label}
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  transition: filter 0.3s ease;
  width: ${(props) =>
    props.size === "x-small"
      ? "fit-content"
      : props.size === "small"
      ? "fit-content"
      : props.size === "large"
      ? "100%"
      : "fit-content"};
  font-size: ${(props) =>
    props.size === "x-small"
      ? "var(--text-xs)"
      : props.size === "small"
      ? "var(--text-sm)"
      : props.size === "large"
      ? "var(--text-lg)"
      : "var(--text-base)"};
  background-color: ${(props) =>
    props.primary
      ? "var(--color-primary)"
      : props.secondary
      ? "var(--color-secondary)"
      : ""};
  margin: var(--space-xs);
  cursor: pointer;
  color: var(--color-text);
  &:hover {
    filter: brightness(1.15);
  }
`;
