import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";

export type FormikTextFieldProps = {
  name: string;
} & Omit<TextFieldProps, "name" | "error" | "helperText">;

export function FormikTextField({ name, ...rest }: FormikTextFieldProps) {
  const [field, meta] = useField<string>(name);
  const showError = Boolean(meta.touched && meta.error);

  return (
    <TextField
      fullWidth
      {...field}
      {...rest}
      error={showError}
      helperText={showError ? meta.error : rest.helperText}
    />
  );
}
