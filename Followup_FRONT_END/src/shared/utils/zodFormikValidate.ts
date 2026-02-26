import { ZodSchema } from "zod";

export function zodFormikValidate<T>(schema: ZodSchema<T>) {
  return (values: T) => {
    const result = schema.safeParse(values);
    if (result.success) return {};
    
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".") || "form";
      if (!errors[path]) errors[path] = issue.message;
    }
    return errors;
  };
}
