import Image from "next/image";

const Logo = () => {
  return <Image src={"/icon.png"} alt={"Logo"} width={35} height={35} />;
};

export default Logo;
