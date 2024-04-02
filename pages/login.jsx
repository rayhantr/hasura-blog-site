import AuthLayout from "@components/Layout/AuthLayout";
import { LoginComponent } from "@components/Login";
import Image from "next/image";
import React from "react";

function Login() {
  return (
    <section className="flex flex-col md:flex-row gap-4 md:gap-24 items-center bg-white rounded-lg p-9 shadow-md max-w-7xl">
      <div className="relative w-72 h-56">
        <Image src="/images/login.svg" fill alt="login-svg" />
      </div>
      <div className="flex-auto">
        <LoginComponent />
      </div>
    </section>
  );
}

Login.getLayout = (page) => <AuthLayout title="Login">{page}</AuthLayout>;

export default Login;
