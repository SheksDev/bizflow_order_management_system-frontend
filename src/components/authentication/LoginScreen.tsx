import React, { useState } from "react"
import type { LoginErrors, LoginRequest } from "../../api/auth/types/auth"


interface LoginProps {
  onLogin: (loginData: LoginRequest) => Promise<void>;
  loading: boolean;
  error: string;
  fieldErrors: LoginErrors;
}


function LoginScreen(
  {
    onLogin,
    loading,
    error,
    fieldErrors
  }: LoginProps
) {


  const [loginData, setLoginData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setLoginData((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value,
      }
    ));
  };

  return (
    <div
      className="w-full h-screen bg-bf-background flex flex-col">


        {/********************* HEADER *******************/}

      {/* <header
        className="w-full h-11.75 px-6 py-3 bg-[#FFFFFF] bf-border-b flex justify-between items-center">

        <div
          className="flex items-center gap-2">

          <p
            className="px-2 py-0.5 rounded-sm bg-[#FEF3C7] border border-bf-primary]/20 font-medium text-[11px]/[16px] text-[#78350F]">
            Internal System
          </p>

          <p
            className="font-medium text-[12px]/[16px] text-[#6B7280]">
            Operations Access
          </p>

        </div>

        <div>

          <p
            className="font-medium text-[11px]/[16px] text-[#374151]">
            Strict Access Control
          </p>

        </div>

      </header> */}


      {/********************* LOGIN CARD *******************/}

      <main
        className="w-full h-full p-8 flex justify-center items-center">

        <div
          className="w-110 min-h-0 flex flex-col justify-center gap-6 px-9 py-7 rounded-xl bg-[#FFFFFF] bf-border">

          <div
            className="flex flex-col items-center justify-center">

            <div
              className="pb-3">

              <div
                className="w-12 h-12 p-1 rounded-lg bg-[#FFFBEB] border-bf-primary/20 flex items-center justify-center">

                <div
                  className="w-9 h-9 rounded-sm text-bf-primary border-bf-primary/20">

                    <img 
                      src="/src/assets/BizFlow-Logo.svg" 
                      alt="" 
                      className="w-9 h-9 rounded-sm"
                    />

                </div>

              </div>

            </div>

            <h1
              className="font-bold text-[24px]/[32px] tracking-[-0.6px] text-bf-primaryblack">
              BizFlow
            </h1>

            <h3
              className="pt-0.5 font-semibold text-[12px]/[16px] tracking-[0.6px] text-bf-primary">
              DIDUN DELIGHT OPERATIONS
            </h3>

            <p
              className="pt-2 font-normal text-[12px]/[16px] text-[#6B7280]">
              Authorized portal for order fufillment and ledger tracking.
            </p>

          </div>


          {/********************* LOGIN FORM *******************/}

          <form 
            action="submit"
            className="flex flex-col item-center gap-4 pt-1"
            onSubmit={(e) =>
              {
                e.preventDefault();

                onLogin(loginData);
              }
            }>

              {
                error && (
                  <p
                  className="text-[12px]/[16px] tracking-[-0.3px] text-left text-bf-error self-center">
                  {error}
                </p>
                ) 
              }

              <div
                className="flex flex-col gap-1.5">

                <label 
                  htmlFor=""
                  className="font-semibold text-[12px]/[16px] tracking-[-0.3px] text-left text-[#374151]">
                    Email
                    <span
                      className="text-bf-error">
                      *
                    </span>
                </label>

                <div
                  className={`w-full px-3.5 py-2 rounded-lg bg-[#FFFFFF] ${!fieldErrors.email ? "bf-border" : "bf-error-border"}`}>

                  <input 
                    type="email" 
                    name="email"
                    value={loginData.email}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full font-normal text-[14px] text-bf-primaryblack outline-none"
                  />

                </div>

                <span
                  className="text-[12px]/[16px] tracking-[-0.3px] text-left text-bf-error">
                  {fieldErrors.email}
                </span>

              </div>
              

              <div
                className="flex flex-col gap-1.5">

                <label 
                  htmlFor=""
                  className="font-semibold text-[12px]/[16px] tracking-[-0.3px] text-left text-[#374151]">
                    Password
                    <span
                      className="text-bf-error">
                      *
                    </span>
                </label>

                <div
                  className={`w-full px-3.5 py-2 rounded-lg bg-[#FFFFFF] ${!fieldErrors.password ? "bf-border" : "bf-error-border"} flex items-center gap-2`}>

                  <input 
                    type={viewPassword ? "text" : "password"} 
                    name="password"
                    value={loginData.password}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full font-normal text-[14px] text-bf-primaryblack outline-none"
                  />

                  <div
                    onClick={() => setViewPassword((prev) => !prev)}
                    className="cursor-pointer p-2 flex items-center justify-center">

                    <img 
                      src="/src/assets/Eye-Icon-Show.svg" 
                      alt="" 
                      className=""
                    />

                  </div>

                </div>

                <span
                  className="text-[12px]/[16px] tracking-[-0.3px] text-left text-bf-error">
                  {fieldErrors.password}
                </span>

              </div>

              <button
                type="submit"
                disabled={!loginData.email || !loginData.password || loading}
                className={`w-full flex items-center justify-center px-3.5 py-2.5 rounded-lg bg-bf-primary text-[#FFFFFF] font-medium text-[14px]/[20px] cursor-pointer disabled:bg-[#F7EFEB] disabled:text-[#B0AAA7] disabled:cursor-not-allowed`}>
                
                <p>
                  {
                    !loading ? "Sign In" : "Verifying credentials..."
                  }
                </p>

              </button>

          </form>

        </div>

      </main>


      {/********************* FOOTER *******************/}

      <footer
        className="w-full h-10.25 px-6 py-3 bg-[#FFFFFF] bf-border-t flex justify-between items-center">

        <div
          className="flex items-center gap-2">

          <p
            className="font-semibold text-[12px]/[16px] text-bf-primaryblack">
            Didun Delight
          </p>

          <p
            className="font-normal text-[12px]/[16px] text-[#6B7280]">
            Opertaions & Order Management Engine
          </p>

        </div>

        <div>

          <p
            className="font-normal text-[11px]/[16px] text-[#6B7280]">
            Lagos, Nigeria
          </p>

        </div>

      </footer>

    </div>
  )
}

export default LoginScreen