import React from "react";
import TextInput from "../common/TextInput";
import { LoginPageButton } from "../login/LoginPageButton";
export function Login() {
  return (
    <div className="flex flex-grow items-center justify-center rounded-xl bg-gradient-to-t from-indigo-950 to-pink-950 overflow-hidden">
      <div className="w-full h-full flex items-center justify-center overscroll-contain overflow-auto p-4">
        <div className="h-full flex flex-col items-center">
          <p className="text-6xl text-neutral-100 md:my-10 mb-14 md:mb-20 text-center">
            ShapeShyft
          </p>
          <div className="relative p-10 w-full md:w-[34rem] min-h-[472px] flex flex-col md:h-auto bg-neutral-100 rounded-xl overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.8)]">
            <h1 className="text-4xl font-semibold mb-10">Login</h1>
            <div className="flex flex-col flex-grow gap-10 text-xl">
              <div className="flex flex-col gap-8">
                <TextInput placeholder="Username/Email" id="username" />
                <TextInput placeholder="Password" id="password" />
              </div>

              <div className="mt-auto w-full flex flex-col items-center justify-center gap-4">
                <LoginPageButton
                  prompt="Login"
                  id="login"
                  onClick={() => (window.location.href = "/user/dashboard")}
                />
                <div className="w-full flex justify-center items-center  text-neutral-400 gap-4">
                  <div className="w-1/3 bg-neutral-300 h-1 rounded-full" />
                  <p className="text-center mb-1">or</p>
                  <div className="w-1/3 bg-neutral-300 h-1 rounded-full" />
                </div>
                <LoginPageButton
                  prompt="Sign Up"
                  id="signup"
                  onClick={() => (window.location.href = "/user/dashboard")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
