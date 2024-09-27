import Button, { GoogleButton } from "@/components/Button";
import Container from "@/components/Container";
import FormField from "@/components/FormField";
import Seperator from "@/components/Seperator";
import WelcomeSection from "@/components/WelcomeSection";
import { icons } from "@/constant";

const SignUp = () => {
  return (
    <Container>
      <div className="flex justify-center items-center flex-row">
        <div className="w-1/2 bg-gray p-10 border rounded-2xl bg-[#FCFCFC]">
          <div className="mb-4">
            <h1 className="font-bold text-3xl">Sign Up</h1>
          </div>
          <GoogleButton label="Sign In with Google" />
          <Seperator label="or Sign In with" />
          <form>
            <FormField placeholder="Name" icon={icons.user.src} />
            <FormField placeholder="Email" icon={icons.email.src} />
            <FormField placeholder="Password" icon={icons.lock.src} />
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

export default SignUp;
