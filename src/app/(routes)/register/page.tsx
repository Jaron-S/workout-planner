import Register from "@/app/_components/auth/Register";
import Head from "next/head";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Register</title>
      </Head>
      <Register />
    </div>
  );
};

export default RegisterPage;
