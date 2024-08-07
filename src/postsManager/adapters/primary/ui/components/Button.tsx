import React from "react";

import * as styles from "./Button.module.css";

interface ButtonProps {
  "data-testid"?: string;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  disabled?: boolean;
}

const Button = ({ className, onClick, label, style, disabled, type, "data-testid": testId }: ButtonProps) => {
  return (
    <button
      data-testid={testId}
      disabled={disabled}
      style={style}
      type={type}
      className={`${styles.button} ${className} ${disabled && styles["button--disabled"]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
