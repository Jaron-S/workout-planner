// pages/index.tsx
import React from 'react';
import Head from 'next/head';
import Navbar from '@/app/_components/navbar/Navbar';
import BodyFatCalculator from '@/app/_components/calculators/BodyFatCalculator';
import Footer from '@/app/_components/footer/Footer';

function Dashboard() {
  return (
    <>
      <div className="h-full w-full overflow-hidden">
        <Head>
          <title>Body Fat Calculator</title>
        </Head>
        <Navbar />
        <BodyFatCalculator />
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
