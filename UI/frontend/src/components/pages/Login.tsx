import React from "react";
import TextInput from "../common/TextInput";
export function Login() {
  return (
    <div className="flex flex-grow items-center justify-center rounded-xl bg-gradient-to-t from-indigo-950 to-pink-950 p-4">
      <div className="h-full">
        <p className="text-7xl text-neutral-100 m-10">ShapeShyft</p>
        <div className="w-[34rem] h-full transition-all ease-in-out duration-200">
          <div className="px-6 py-4 w-full h-full bg-neutral-100 rounded-xl overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.8)]">
            <h1 className="text-4xl font-semibold mb-4">Login</h1>
            <div className="flex flex-col gap-4 text-xl">
              <TextInput placeholder="Username/Email" id="username" />
              <TextInput placeholder="Password" id="password" />
              <button
                onClick={() => (window.location.href = "/user/dashboard")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
