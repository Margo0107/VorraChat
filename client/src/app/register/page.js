"use client";

import { useFormValidation } from "../components/hooks/useFormValidation";
import AuthorForm from "../components/UI/AuthorForm";
import Link from "next/link";

export default function Register() {
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
        titleH1="Register"
        onSubmit={handleSubmit}
        emailValue={email}
        onEmailChange={(e) => setEmail(e.target.value)}
        passwordValue={password}
        onPassChange={(e) => setPassword(e.target.value)}
        nameValue={name}
        onNameChange={(e) => setName(e.target.value)}
        errors={errors}
        titleSubmit="continue"
      >
        {" "}
        <p className="text-center">
          Already have an account?{" "}
          <Link href={"/login"} className="text-lg text-sky-600">
            Login
          </Link>
        </p>
      </AuthorForm>
    </>
  );
}
