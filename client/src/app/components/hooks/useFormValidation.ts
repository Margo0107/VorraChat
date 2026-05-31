"use client";

import { useState } from "react";

type FormError = {
  emailError?: string;
  nameError?: string;
  passError?: string;
};

export const useFormValidation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [errors, setErrors] = useState<FormError>({});

  const nameRegex =
    /^(?=.{3,12}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&._-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/;

  const validateForm = (): boolean => {
    const errorMessages: FormError = {};

    if (!nameRegex.test(name)) {
      errorMessages.nameError =
        "Name must be 3-12 characters long, contain upper and lower letters, a number, and a symbol.";
    }
    if (!emailRegex.test(email)) {
      errorMessages.emailError = "Please enter a valid email address.";
    }
    if (!passwordRegex.test(password)) {
      errorMessages.passError =
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    errors,
    setErrors,
    validateForm,
  };
};
