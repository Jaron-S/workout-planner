import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src={"/program_balancer_logo_light.png"}
      alt={"Logo"}
      width={35}
      height={35}
    />
  );
};

export default Logo;
