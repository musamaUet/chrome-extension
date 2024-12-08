import { Image } from "@/components/atoms";
import LAMP_TOP from "@/assets/images/lamp-top.webp";

export default function Illustration() {
  return (
    <>
      <div className="noise-global z-3 opacity-40" />
      <div className="lamp-top pointer-events-none absolute left-1/2 top-0 z-1 w-[675px] -translate-x-1/2 select-none">
        <Image src={LAMP_TOP} alt="Light" className="w-full" />
      </div>
    </>
  );
}
