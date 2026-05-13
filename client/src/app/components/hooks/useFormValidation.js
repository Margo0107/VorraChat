"use client";

import { useState } from "react";

export const useFormValidation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [errors, setErrors] = useState({});

  const nameRegex = /^[A-Za-z0-9_]{7,12}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/;

  const validateForm = () => {
    const errorMessages = {};

    if (!nameRegex.test(name)) {
      errorMessages.nameError =
        "Name must be 7-12 characters long and can only contain letters, numbers, and underscores.";
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
