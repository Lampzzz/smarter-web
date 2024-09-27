import Button, { GoogleButton } from "@/components/Button";
import Container from "@/components/Container";
import FormField from "@/components/FormField";
import Seperator from "@/components/Seperator";
import WelcomeSection from "@/components/WelcomeSection";

const SignIn = () => {
  return (
    <Container>
      <div className="flex justify-center items-center flex-row">
        <div className="w-1/2 bg-gray p-5">
          <div className="mb-4">
            <h1 className="font-bold text-3xl">Sign In</h1>
            <p>Please enter your details to sign in</p>
          </div>
          <GoogleButton />
          <Seperator />
          <form>
            <FormField placeholder="Email" />
            <FormField placeholder="Password" />
            <Button label="Sign Up" />
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
