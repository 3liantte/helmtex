import Image from "next/image";
import HelmLogo from "@/public/images/helm.png";

export default function Home() {
  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Image
          src={HelmLogo}
          alt="Helm Logo"
          className="absolute space-x-3 rtl:space-x-reverse w-32 left-0 top-0"
        />
      </div>
    </nav>
  );
}
