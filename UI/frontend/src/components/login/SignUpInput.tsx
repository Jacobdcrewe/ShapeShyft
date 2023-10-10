import React from "react";
import TextInput from "../common/TextInput";
import EmailInput from "../common/EmailInput";

export interface SignUpInputProps {
  setUsername: React.SetStateAction<any>;
  setFirstName: React.SetStateAction<any>;
  setLastName: React.SetStateAction<any>;
  setPassword: React.SetStateAction<any>;
  setEmail: React.SetStateAction<any>;
}

export const SignUpInput = (props: SignUpInputProps) => {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col md:flex-row w-full overflow-hidden gap-4">
        <div className="md:w-1/2 ">
          <TextInput
            placeholder="First Name"
            id="fName"
            onChange={(e: any) => {
              props.setFirstName(e.target.value);
            }}
          />
        </div>
        <div className="md:w-1/2 ">
          <TextInput
            placeholder="Last Name"
            id="lName"
            onChange={(e: any) => {
              props.setLastName(e.target.value);
            }}
          />
        </div>
      </div>
      <EmailInput
        placeholder="Email"
        id="email"
        onChange={(e: any) => {
          props.setEmail(e.target.value);
        }}
      />
      <TextInput
        placeholder="Username"
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

export default SignUpInput;
