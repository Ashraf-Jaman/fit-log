import Image from "next/image";
import Link from "next/link";

import brandLogo from "@/assets/images/brand-logo.png";

const Footer = () => {
  return (
    <footer
      className="
        border-t
        border-[#24262b]
        bg-[#0c0d0f]
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-[1600px]
          flex-col
          gap-5
          px-4
          py-6
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-8
          md:px-12
          lg:px-16
          xl:px-20
        "
      >
        <Link
          href="/"
          className="flex items-center"
        >
          <Image
            src={brandLogo}
            alt="FitLog"
            className="w-[70px] sm:w-[80px]"
          />
        </Link>

        <p
          className="
            text-[10px]
            text-[#777a82]
            sm:text-xs
          "
        >
          © 2026 FitLog — Workout Library.
          Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;