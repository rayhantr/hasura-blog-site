import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { nhost } from "@utils/nhost";
import toast from "react-hot-toast";
import { FormInput } from "@components/Form";
import { Button } from "@components/Button";
import { MdEmail, MdLock } from "react-icons/md";
import { GoPerson } from "react-icons/go";

export default function RegisterComponent() {
  // form data
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // authentication feedback
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // form submission handler for registration
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await nhost.auth.signUp({
        email,
        password,
        options: {
          displayName: displayName,
        },
      });

      if (error) {
        setLoading(false);
        setMessage(error.message);
      } else {
        toast.success("Registration successful!");
        await router.push("/");
      }
    } catch (error) {
      toast.error("Registration failed!");
    }
  }

  return (
    <div>
      <h2 className="text-center text-gradient-primary text-2xl font-bold uppercase mb-5">
        Register
      </h2>
      {message && (
        <p className="p-3 bg-red-50 text-red-600 mb-4 rounded-md">{message}</p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <FormInput
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your Name"
            autoFocus
            icon={<GoPerson />}
          />
        </div>
        <div>
          <FormInput
            type="email"
            value={email}
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            icon={<MdEmail />}
          />
        </div>
        <div>
          <FormInput
            type="password"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            icon={<MdLock />}
          />
        </div>
        <Button type="submit" fullWidth disabled={loading}>
          Register
        </Button>
      </form>
      <p className="mt-3 text-slate-500">
        Already a member?{" "}
        <Link href="/login" className="text-sky-400">
          Login
        </Link>
      </p>
    </div>
  );
}
