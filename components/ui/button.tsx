"use client"; // Ensure this is a Client Component in Next.js

import { forwardRef, ButtonHTMLAttributes } from "react";
import clsx from "clsx"; // Helps with conditional class management

// Define button variants
type ButtonVariant = "primary" | "secondary" | "destructive" | "disabled";

// Extend button attributes
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", className, disabled, ...props }, ref) => {
    // Base styles
    const baseStyles = "rounded-lg font-medium transition";

    // Define styles for each variant
    const variants = {
      primary: "bg-primary text-white hover:bg-opacity-90",
      secondary:
        "bg-white text-[#414651] border border-[#D5D7DA] shadow-sm hover:bg-gray-50",
      destructive: "bg-destructive text-white hover:bg-opacity-90",
      disabled:
        "bg-[#fafafa] text-gray-400 border border-[#D5D7DA] shadow-sm cursor-not-allowed",
      link: "bg-primary text-white hover:bg-opacity-90", // add style for link button
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], className)}
        disabled={variant === "disabled" || disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
export default Button;
