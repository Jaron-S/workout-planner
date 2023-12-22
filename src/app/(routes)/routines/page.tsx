import Head from "next/head";
import Routines from "@/app/_components/routines/Routines";
import Navbar from "@/app/_components/navbar/Navbar";
import Footer from "@/app/_components/footer/Footer";

function Dashboard() {
  return (
    <div className="h-full w-full overflow-hidden min-h-screen">
      <Head>
        <title>My Routines</title>
      </Head>
      <Navbar />
      <Routines />
      <Footer />
    </div>
  );
}

export default Dashboard;
