import { AuthForm } from '@/components/auth/auth-form';
import { VerifyForm } from '@/components/auth/verify-form';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verification Code',
  description: 'Enter the verification code sent to your email',
};

export default function VerifyPage() {
  return (
    <>
    <Header />
    <AuthForm
      title="Verification Required"
      description="Enter the verification code sent to your email"
    >
      <VerifyForm />
    </AuthForm>
    <Footer />
    </>
  );
}
