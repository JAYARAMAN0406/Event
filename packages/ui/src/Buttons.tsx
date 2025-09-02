import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

interface CustomButtonProps extends ButtonProps {
  label: string;
}

export const Buttons: React.FC<CustomButtonProps> = ({
  label,
  variant = "contained",
  color = "primary",
  size = "medium",
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      {...rest} 
    >
      {label}
    </Button>
  );
};

