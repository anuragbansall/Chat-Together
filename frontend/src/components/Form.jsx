// components/Form.js
import React from "react";
import { Link } from "react-router-dom";

export function FormRoot({ children, ...props }) {
  return (
    <form {...props} className="flex flex-col gap-y-4 w-sm mt-4 max-w-full">
      {children}
    </form>
  );
}

export function FormWrapper({ children }) {
  return (
    <div className="bg-white p-8 shadow-md rounded-lg flex flex-col items-center justify-center gap-y-2 max-w-full w-full md:w-fit h-screen md:h-fit">
      {children}
    </div>
  );
}

export function FormHeader({ icon, title, description }) {
  return (
    <>
      <span className="bg-[#EDE9FE] p-4 rounded-full">{icon}</span>
      <h1 className="text-2xl font-bold text-[#A855F7]">{title}</h1>
      <p className="text-zinc-500 text-center">{description}</p>
    </>
  );
}

export function FormGroup({ label, id, ...props }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  );
}

export function FormLink({ to, text }) {
  return (
    <Link to={to} className="text-[#A855F7] hover:underline">
      {text}
    </Link>
  );
}

export function FormButton({ icon, text, isLoading }) {
  return (
    <button className="primary-button">
      {icon}
      {isLoading ? `${text}...` : text}
    </button>
  );
}

export const Form = {
  Wrapper: FormWrapper,
  Header: FormHeader,
  Root: FormRoot,
  Group: FormGroup,
  Link: FormLink,
  Button: FormButton,
};
