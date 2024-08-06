import React from "react";

import * as styles from "./Button.module.css";

interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
}

const Button = ({ className, onClick, label, style }: ButtonProps) => {
  return (
    <button style={style} type='submit' className={`${styles.button} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
