import Footer from "@/app/_components/footer/Footer";
import Guide from "@/app/_components/guide/Guide";
import Navbar from "@/app/_components/navbar/Navbar";
import Head from "next/head";

const LoginPage = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <Head>
        <title>Guide</title>
      </Head>
      <Navbar />
      <Guide />
      <Footer />
    </div>
  );
};

export default LoginPage;
