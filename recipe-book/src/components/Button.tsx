
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
    <button 
      type={type}
      className={['button', `button--${size}`, mode].join(' ')}
      style={style}
      disabled={disabled}
      key={key}
      {...props}
    >
      {label}
    </button>
  );
};
