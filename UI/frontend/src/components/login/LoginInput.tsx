import React from "react";
import TextInput from "../common/TextInput";

export interface LoginInputProps {
  setUsername: React.SetStateAction<any>;
  setPassword: React.SetStateAction<any>;
}

export const LoginInput = (props: LoginInputProps) => {
  return (
    <div className="flex flex-col gap-8">
      <TextInput
        placeholder="Username/Email"
        id="username"
        onChange={(e: any) => {
          props.setUsername(e.target.value);
        }}
      />
      <TextInput
        placeholder="Password"
        id="password"
        onChange={(e: any) => {
          props.setPassword(e.target.value);
        }}
      />
    </div>
  );
};

export default LoginInput;
