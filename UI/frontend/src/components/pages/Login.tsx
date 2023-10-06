import React from "react";

export function Login() {
  return (
    <div className="flex flex-grow items-center justify-center rounded-xl bg-neutral-200 p-4">
      <div className="w-full h-full flex flex-col">
        <p className="text-7xl m-10">Login currently temporary</p>
        <div className="w-full flex flex-grow items-center justify-center">
          <div className="w-1/2 h-2/3 p-1 hover:p-0 transition-all ease-in-out duration-200">
            <button
              onClick={() => (window.location.href = "/user")}
              className="w-full h-full bg-white rounded-xl overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.2)] hover:shadow-[0px_0px_10px_rgba(0,0,0,0.4)] brightness-[0.99] hover:brightness-100"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
