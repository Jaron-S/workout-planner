import Login from "@/app/_components/auth/Login";
import Head from "next/head";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Login</title>
      </Head>
      <Login />
    </div>
  );
};

export default LoginPage;
