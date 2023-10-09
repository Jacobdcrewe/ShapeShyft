import React from "react";

export interface LoginButtonProps {
  prompt: string;
  onClick?: () => void;
  id?: string;
}

export const LoginPageButton = (props: LoginButtonProps) => {
  return (
    <button
      className="shadow-[0px_0px_10px_rgba(0,0,0,0.4)] hover:shadow-[0px_0px_10px_rgba(0,0,0,0.6)] rounded-full text-white w-4/5 bg-violet-800 brightness-[0.95] hover:brightness-100 px-6 py-2 scale-100 hover:scale-[1.01] transition-transform ease-in-out duration-150"
      onClick={props.onClick}
    >
      {props.prompt}
    </button>
  );
};
