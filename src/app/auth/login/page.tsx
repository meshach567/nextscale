import { AuthForm } from "@/components/auth/auth-form";
import { LoginForm } from "@/components/auth/login-form";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <AuthForm
        title="Sign In"
        description="Enter your credentials to access your account"
      >
        <LoginForm />
      </AuthForm>
      <Footer />
    </>
  );
}
