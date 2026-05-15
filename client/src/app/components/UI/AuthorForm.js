"use client";

import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

export default function AuthorForm(props) {
  const [pass, setPass] = useState("password");
  const {
    titleH1,
    titleSubmit,
    onSubmit,
    onEmailChange,
    onPassChange,
    onNameChange,
    passValue,
    emailValue,
    nameValue,
    errors,
    children,
  } = props;

  const iconPass = () => {
    if (pass === "password") {
      setPass("text");
    } else {
      setPass("password");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl bg-slate-800 p-8 shadow-2xl"
      >
        {children}
        <h1 className="text-2xl font-bold">{titleH1}</h1>
        
        <input
          type="text"
          value={nameValue}
          onChange={onNameChange}
          placeholder="Name"
          className={`w-full rounded-lg border-b-2 bg-slate-700 px-4 py-3 text-lg placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none ${errors?.nameError ? "border-red-500" : "border-slate-600"}`}
        />
        {errors?.nameError && (
          <p className="text-sm text-red-500">{errors?.nameError}</p>
        )}
        <input
          type="email"
          value={emailValue}
          onChange={onEmailChange}
          placeholder="Email"
          className={`w-full rounded-lg border-b-2 bg-slate-700 px-4 py-3 text-lg placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none ${errors?.emailError ? "border-red-500" : "border-slate-600"}`}
        />
        {errors.emailError && (
          <p className="m-4 text-sm text-red-500">{errors.emailError}</p>
        )}

        <div className="relative w-full">
          <input
            type={pass}
            value={passValue}
            onChange={onPassChange}
            placeholder="Password"
            className={`w-full rounded-lg border-2 bg-slate-700 px-4 py-3 pr-12 text-lg placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none ${errors?.passError ? "border-red-500" : "border-slate-600"}`}
          />
          <button
            type="button"
            onClick={iconPass}
            className="absolute inset-y-0 right-3 text-sky-400"
          >
            {pass === "password" ? (
              <AiOutlineEyeInvisible size={25} />
            ) : (
              <AiOutlineEye size={25} />
            )}
          </button>
        </div>
        {errors.passError && (
          <p className="mt-2 text-sm text-red-500">{errors.passError}</p>
        )}

        <button
          type="submit"
          className="font-semiboldshadow-lg w-full cursor-pointer rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 px-6 py-3 text-lg hover:from-sky-700 hover:to-blue-700 focus:outline-none"
        >
          {titleSubmit}
        </button>
      </form>
    </section>
  );
}
