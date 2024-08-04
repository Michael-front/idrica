import React from "react";

import * as styles from "./Button.module.css";

interface ButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
}

const Button = ({ className, onClick, label }: ButtonProps) => {
  return (
    <button type='submit' className={`${styles.button} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
