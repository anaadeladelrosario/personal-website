import styled from 'styled-components';

export interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  key?: number | string;
  style?: React.CSSProperties;
}

export const Button = ({
  primary = false,
  size = 'medium',
  label,
  type,
  disabled,
  key,
  style,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'button--primary' : 'button--secondary';
  return (
    <StyledButton label={"label"} 
      type={type}
      className={['button', `button--${size}`, mode].join(' ')}
      style={style}
      disabled={disabled}
      key={key}
      {...props}
    >
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  width: ${(props) => (props.size === 'small' ? 'fit-content' : props.size === 'large' ? '100%' : 'fit-content')};
  font-size: ${(props) => (props.size === 'small' ? '12px' : props.size === 'large' ? '16px' : '14px')};
  background-color: ${(props) => (props.primary ? 'var(--color-accent)' : 'var(--color-primary)')};
`;
