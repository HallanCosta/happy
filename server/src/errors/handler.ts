import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

type ValidationErrors = {
  [key: string]: string[];
}

export const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({ message: 'Validation fails', errors });
  }

  console.error(error);

  return response.status(500).json({ message: "Internal server error" });
}