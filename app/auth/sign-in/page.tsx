"use client";

import Button, { GoogleButton } from "@/components/Button";
import Container from "@/components/Container";
import FormField from "@/components/FormField";
import Seperator from "@/components/Seperator";
import WelcomeSection from "@/components/WelcomeSection";
import { icons } from "@/constant";
import { login } from "@/firebase/auth";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("sao@gmail.com");
  const [password, setPassword] = useState("James17!");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await login({ email: "", password: "" });
      setError("");
    } catch (error: any) {
      setError(error.message);
      alert(error.message);
    }
  };

  return (
    <Container>
      <div className="flex justify-center items-center flex-row">
        <div className="w-1/2 bg-gray p-10 border rounded-2xl bg-[#FCFCFC]">
          <div className="mb-4">
            <h1 className="font-bold text-3xl">Sign In</h1>
          </div>
          <GoogleButton label="Sign In with Google" />
          <Seperator label="or Sign In with" />
          <form onSubmit={(e) => e.preventDefault()}>
            <FormField
              placeholder="Email"
              icon={icons.email.src}
              value={email} // <-- value prop added
              onChange={(e) => setEmail(e.target.value)} // <-- onChange prop added
            />
            <FormField
              placeholder="Password"
              icon={icons.lock.src}
              type="password"
              value={password} // <-- value prop added
              onChange={(e) => setPassword(e.target.value)} // <-- onChange prop added
            />
            <Button label="Sign In" onClick={handleLogin} />
          </form>
          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <span className="text-[#F58509]">Sign Up</span>
            </p>
          </div>
        </div>
        <WelcomeSection />
      </div>
    </Container>
  );
};

export default SignIn;
