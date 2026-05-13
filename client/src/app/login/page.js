"use client";

import { useFormValidation } from "../components/hooks/useFormValidation";
import AuthorForm from "../components/UI/AuthorForm";
import Link from "next/link";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    errors,
    setErrors,
    validateForm,
  } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  };
  return (
    <>
      <AuthorForm
        titleH1="Login"
        onSubmit={handleSubmit}
        emailValue={email}
        onEmailChange={(e) => setEmail(e.target.value)}
        passwordValue={password}
        onPassChange={(e) => setPassword(e.target.value)}
        nameValue={name}
        onNameChange={(e) => setName(e.target.value)}
        errors={errors}
        titleSubmit="Sign In"
      >
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link href={"/register"} className="text-lg text-sky-600">
            Register
          </Link>
        </p>{" "}
      </AuthorForm>
    </>
  );
}
