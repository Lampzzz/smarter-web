import React, { useState } from "react";
import Button, { GoogleButton } from "@/components/Button";
import Container from "@/components/Container";
import FormField from "@/components/FormField";
import Seperator from "@/components/Seperator";
import WelcomeSection from "@/components/WelcomeSection";

const SignIn = () => {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    // Reset error if validation passes
    setError("");

    // Submit logic here (e.g., API call)
    console.log("Email:", email);
    console.log("Password:", password);

    // Reset form fields
    setEmail("");
    setPassword("");
  };

  return (
    <Container>
      <div className="flex justify-center items-center flex-row">
        <div className="w-1/2 bg-gray p-5">
          <div className="mb-4">
            <h1 className="font-bold text-3xl">Sign Up</h1>
            <p>Please enter your details to sign in</p>
          </div>
          <GoogleButton />
          <Seperator />
          <form onSubmit={handleSubmit}>
            <FormField
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormField
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button label="Sign Up" />
          </form>
          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <span className="text-[#F58509]">Log In</span>
            </p>
          </div>
        </div>
        <WelcomeSection />
      </div>
    </Container>
  );
};

export default SignIn;
