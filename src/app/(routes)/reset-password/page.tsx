import ResetPassword from "@/app/_components/auth/ResetPassword";
import Head from "next/head";

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Reset Password</title>
      </Head>
      <ResetPassword />
    </div>
  );
};

export default ResetPasswordPage;
