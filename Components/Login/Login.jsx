import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { nhost } from "utils/nhost";
import { FormInput } from "@components/Form";
import toast from "react-hot-toast";
import { Button } from "@components/Button";
import { MdEmail, MdLock } from "react-icons/md";

export default function LoginComponent() {
  // form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // authentication feedback
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // form submission handler for login
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await nhost.auth.signIn({
        email: email,
        password: password,
      });

      if (error) {
        setLoading(false);
        setMessage(error.message);
      } else {
        toast.success("Login Successful!");
        await router.push("/");
      }
    } catch (error) {
      toast.error("Login failed! Something went wrong.");
    }
  }

  return (
    <div>
      <h2 className="text-center text-gradient-primary text-2xl font-bold uppercase mb-5">Login</h2>
      {message && <p className="p-3 bg-red-50 text-red-600 mb-4 rounded-md">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <FormInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoFocus icon={<MdEmail />} />
        </div>
        <div>
          <FormInput type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} icon={<MdLock />} />
        </div>
        <div>
          <Button type="submit" fullWidth disabled={loading}>
            Login
          </Button>
        </div>
      </form>
      <p className="mt-3 text-slate-500">
        Not a member yet?{" "}
        <Link href="/register">
          <a className="text-sky-400">Register</a>
        </Link>
      </p>
    </div>
  );
}
