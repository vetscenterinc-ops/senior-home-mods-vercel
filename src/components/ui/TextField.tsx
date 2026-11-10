"use client";

import React, { useId } from "react";
import {
  TextField as AriaTextField,
  Label as AriaLabel,
  Input as AriaInput,
  FieldError as AriaFieldError,
  Text as AriaText,
  TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";

export interface TextFieldProps extends AriaTextFieldProps {
  label: string;
  hint?: string;
  errorMessage?: string;
  placeholder?: string;
  type?: string;
  inputClassName?: string;
}

export function TextField({
  label,
  hint,
  errorMessage,
  placeholder,
  type = "text",
  className = "",
  inputClassName = "",
  ...props
}: TextFieldProps) {
  const generatedHintId = useId();
  const hintId = hint ? generatedHintId : undefined;

  return (
    <AriaTextField className={`flex flex-col gap-2 w-full ${className}`} {...props}>
      <AriaLabel className="font-bold text-[18px] text-navy cursor-pointer">
        {label}
      </AriaLabel>

      {hint && (
        <AriaText
          id={hintId}
          slot="description"
          className="text-[16px] text-muted leading-normal -mt-0.5"
        >
          {hint}
        </AriaText>
      )}

      <AriaInput
        type={type}
        placeholder={placeholder}
        aria-describedby={hintId}
        className={`
          w-full h-[58px] min-h-[58px] px-4 text-[18px] text-navy bg-white
          border-2 border-control rounded-[14px]
          transition-all duration-150
          focus:border-navy focus:ring-4 focus:ring-gold/25 focus:outline-none
          disabled:bg-sand disabled:opacity-60 disabled:cursor-not-allowed
          placeholder:text-muted/60
          ${inputClassName}
        `}
      />

      <AriaFieldError
        aria-live="polite"
        className="text-[16px] font-bold text-focus flex items-center gap-1.5 mt-1"
      >
        {({ defaultChildren }) => (
          <>
            <span aria-hidden="true">⚠️</span>
            <span>{errorMessage || defaultChildren}</span>
          </>
        )}
      </AriaFieldError>
    </AriaTextField>
  );
}
