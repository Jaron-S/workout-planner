import { useAuthContext } from "@/app/_context/AuthContext";
import { useEffect } from "react";
import { populateExercisesWithJSONData } from "@/app/_firebase/firestore/addData";
import Head from "next/head";
import Board from "@/app/_components/dashboard/Dashboard";
import Navbar from "@/app/_components/navbar/Navbar";
import Footer from "@/app/_components/footer/Footer";
import { ToastContainer } from "react-toastify";

function Dashboard() {
  // useEffect(() => {
  //   populateExercisesWithJSONData();
  // });

  return (
    <>
      <div className="h-full w-full overflow-hidden">
        <Head>
          <title>Dashboard</title>
        </Head>
        <Navbar />

        <Board />
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
