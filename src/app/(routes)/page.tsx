"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default Home;
