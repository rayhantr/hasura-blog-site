import AuthLayout from "@components/Layout/AuthLayout";
import { RegisterComponent } from "@components/Register";
import Image from "next/image";
import React from "react";
import { getNhostSession } from "@nhost/nextjs";

function Register() {
  return (
    <section className="flex flex-col md:flex-row gap-10 md:gap-24 items-center bg-white rounded-lg p-9 shadow-md">
      <div className="relative w-72 h-56">
        <Image src="/images/register.svg" layout="fill" alt="login-svg" />
      </div>
      <RegisterComponent />
    </section>
  );
}

Register.getLayout = (page) => <AuthLayout title="Register">{page}</AuthLayout>;

export default Register;

export async function getServerSideProps(context) {
  const nhostSession = await getNhostSession(process.env.NEXT_PUBLIC_NHOST_BACKEND, context);

  if (!nhostSession) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      nhostSession,
    },
  };
}
