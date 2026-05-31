"use client";

import { useFormValidation } from "../components/hooks/useFormValidation";
import AuthorForm from "../components/UI/AuthorForm";
import Link from "next/link";
import { useRouter } from "next/navigation";

import useAuthApi from "../components/hooks/useAuthApi";
import React from "react";

export default function Register() {
  const router = useRouter();

  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    errors,
    validateForm,
  } = useFormValidation();

  const { register } = useAuthApi();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const result = await register({
        userName: name,
        userEmail: email,
        userPassword: password,
      });
      if (result) {
        router.push("/chat");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };
  return (
    <>
      <AuthorForm
        titleH1="Register"
        onSubmit={handleSubmit}
        emailValue={email}
        onEmailChange={(e) => setEmail(e.target.value)}
        passValue={password}
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
