import React, { useState, useEffect } from "react";
import { LoginPageButton } from "../login/LoginPageButton";
import LoginInput from "../login/LoginInput";
import SignUpInput from "../login/SignUpInput";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [login, setLogin] = useState(() => {
    const setSize = sessionStorage.getItem("loggingIn");
    return JSON.parse(setSize!) ?? true;
  });

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("loggingIn", JSON.stringify(login));
  }, [login]);

  const clearForm = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setFirstName("");
    setLastName("");
  };
  console.log(username, password, email, firstName, lastName);
  return (
    <div className="flex flex-grow items-center justify-center rounded-xl bg-gradient-to-t from-indigo-950 to-pink-950 overflow-hidden ">
      <div className="w-full h-full flex items-center justify-center overflow-x-hidden overscroll-contain overflow-auto p-4">
        <div className="pt-4 h-full flex flex-col items-center w-full md:w-[34rem]">
          <div className="w-full flex items-center justify-center min-h-[3.75rem] max-h-[180px] gap-4">
            <img
              src={logo}
              alt="logo"
              className="max-w-[3.75rem] object-contain aspect-square md:my-10 mb-14 md:mb-20"
            />
            <p className="text-6xl text-neutral-100 md:my-10 mb-14 md:mb-20 text-center">
              ShapeShyft
            </p>
          </div>

          <div
            className={`relative p-10 w-full ${
              login ? "min-h-[472px] h-[472px]" : "min-h-[624px] h-[624px]"
            } flex flex-col bg-neutral-100 rounded-xl overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.8)] transition-all ease-in-out duration-300`}
          >
            <h1 className="text-2xl font-semibold mb-10">
              {login ? "Login" : "Sign Up"}
            </h1>
            <div className="flex flex-col flex-grow gap-10 text-xl">
              {login ? (
                <LoginInput
                  setUsername={setUsername}
                  setPassword={setPassword}
                />
              ) : (
                <SignUpInput
                  setUsername={setUsername}
                  setPassword={setPassword}
                  setEmail={setEmail}
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                />
              )}

              {login ? (
                <div className="mt-auto w-full flex flex-col items-center justify-center gap-4">
                  <LoginPageButton
                    prompt="Login"
                    id="login"
                    onClick={() => navigate("/user/dashboard")}
                  />
                  <div className="w-full flex justify-center items-center  text-neutral-400 gap-4">
                    <div className="w-1/3 bg-neutral-300 h-1 rounded-full" />
                    <p className="text-center mb-1">or</p>
                    <div className="w-1/3 bg-neutral-300 h-1 rounded-full" />
                  </div>
                  <LoginPageButton
                    prompt="Sign Up"
                    id="signup"
                    onClick={() => {
                      setLogin(false);
                      clearForm();
                    }}
                  />
                </div>
              ) : (
                <div className="sticky bottom-0 mt-auto w-full flex flex-col items-center justify-center gap-4">
                  <LoginPageButton
                    prompt="Create Account"
                    id="createAccount"
                    onClick={() => navigate("/user/dashboard")}
                  />
                  <div className="w-full flex justify-center items-center  text-neutral-400 gap-4">
                    <div className="w-1/3 bg-neutral-300 h-1 rounded-full" />
                    <p className="text-center mb-1">or</p>
                    <div className="w-1/3 bg-neutral-300 h-1 rounded-full" />
                  </div>
                  <LoginPageButton
                    prompt="Login"
                    onClick={() => {
                      setLogin(true);
                      clearForm();
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
