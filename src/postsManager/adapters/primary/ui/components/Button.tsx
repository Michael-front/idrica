import React from "react";

import * as styles from "./Button.module.css";

interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  disabled?: boolean;
}

const Button = ({ className, onClick, label, style, disabled }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      style={style}
      // type='submit'
      className={`${styles.button} ${className} ${disabled && styles["button--disabled"]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
