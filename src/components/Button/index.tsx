import React from "react";
import { ButtonProps } from "../../types/button";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const variants: any = {
      primary: "gradient text-white",
      secondary: "",
      link: "bg-white",
    };

    return (
      <button
        className={`inline-flex items-center justify-center rounded-md text-base font-medium h-12 px-8 py-2 ${variants[variant]} ${className}`}
        ref={ref}
        {...props}
      ></button>
    );
  }
);
Button.displayName = "Button";

export default Button;
