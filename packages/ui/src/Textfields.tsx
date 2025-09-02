'use client'

import { useState, useMemo } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type ValidatorFn = (value: string) => string | null;

type Rules = {
  required?: boolean | string;         
  minLength?: { value: number; message?: string };
  maxLength?: { value: number; message?: string };
  pattern?: { value: RegExp; message?: string };
  validate?: ValidatorFn;                
};

type Props = Omit<TextFieldProps, "variant" | "error" | "helperText" | "onChange" | "value"> & {
  name: string;
  value: string;
  onChange: (value: string) => void;
  rules?: Rules;
  validateOn?: "blur" | "change" | "submit"; 
  helperText?: string;
};

export function TextFields({
  name,
  value,
  onChange,
  rules,
  validateOn = "blur",
  helperText,
  ...rest
}: Props) {
  const [touched, setTouched] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validators: ValidatorFn[] = useMemo(() => {
    const v: ValidatorFn[] = [];

    if (rules?.required) {
      v.push((val) =>
        val?.trim().length ? null : typeof rules.required === "string" ? rules.required : "This field is required"
      );
    }

    if (rules?.minLength) {
      const { value: min, message } = rules.minLength;
      v.push((val) => (val.length >= min ? null : message || `Minimum ${min} characters`));
    }

    if (rules?.maxLength) {
      const { value: max, message } = rules.maxLength;
      v.push((val) => (val.length <= max ? null : message || `Maximum ${max} characters`));
    }

    if (rules?.pattern) {
      const { value: regex, message } = rules.pattern;
      v.push((val) => (regex.test(val) ? null : message || `Invalid format`));
    }

    if (rules?.validate) {
      v.push(rules.validate);
    }

    return v;
  }, [rules]);

  const runValidation = (val: string): string | null => {
    for (const fn of validators) {
      const res = fn(val);
      if (res) return res;
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    onChange(next);
    if (validateOn === "change") {
      setErrorMsg(runValidation(next));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validateOn === "blur" || validateOn === "change") {
      setErrorMsg(runValidation(value));
    }
  };

  const showError = (touched || validateOn === "change") && !!errorMsg;

  return (
    <TextField
      {...rest}
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      variant="standard"
      error={showError}
      helperText={showError ? errorMsg : helperText}
      fullWidth={rest.fullWidth ?? true}
    />
  );
}
