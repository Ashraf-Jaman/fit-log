"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import brandLogo from "@/assets/images/brand-logo.png";

const Navbar = () => {
  const pathname = usePathname();

  const isWorkoutActive = pathname === "/";
  const isMyPlanActive = pathname === "/my-plan";

  const handleWorkoutClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (pathname === "/") {
      e.preventDefault();

      const librarySection = document.getElementById("library");

      if (librarySection) {
        librarySection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#24262b] bg-[#0c0d0f]">
      <nav
        className="
          mx-auto
          flex
          w-full
          max-w-[1600px]
          flex-wrap
          items-center
          justify-between
          px-4
          py-3
          sm:h-[72px]
          sm:flex-nowrap
          sm:px-8
          md:px-12
          lg:px-16
          xl:px-20
        "
      >
        {/* ================= LOGO ================= */}
        <div className="flex shrink-0 items-center">
          <Link href="/" className="flex items-center">
            <Image
              src={brandLogo}
              alt="Fitlog"
              priority
              className="
                h-auto
                w-[78px]
                sm:w-[90px]
                md:w-[100px]
                lg:w-[110px]
              "
            />
          </Link>
        </div>

        {/* ================= DESKTOP CENTER NAV ================= */}
        <div
          className="
            absolute
            left-1/2
            hidden
            -translate-x-1/2
            items-center
            gap-1
            sm:flex
            md:gap-2
          "
        >
          {/* Workouts */}
          <Link
            href="/#library"
            onClick={handleWorkoutClick}
            className={`
              rounded-full
              px-4
              py-2
              text-sm
              font-medium
              transition-all
              duration-200
              md:px-6
              md:py-2.5
              md:text-[15px]
              ${
                isWorkoutActive
                  ? "bg-[#18220d] text-[#c6ff00]"
                  : "text-[#85878d] hover:text-white"
              }
            `}
          >
            Workouts
          </Link>

          {/* My Plan */}
          <Link
            href="/my-plan"
            className={`
              rounded-full
              px-4
              py-2
              text-sm
              font-medium
              transition-all
              duration-200
              md:px-6
              md:py-2.5
              md:text-[15px]
              ${
                isMyPlanActive
                  ? "bg-[#18220d] text-[#c6ff00]"
                  : "text-[#85878d] hover:text-white"
              }
            `}
          >
            My Plan
          </Link>
        </div>

        {/* ================= RIGHT ================= */}
        <div
          className="
            ml-auto
            flex
            items-center
            gap-3
            sm:gap-5
            md:gap-7
            lg:gap-9
          "
        >
          {/* Plan */}
          <Link
            href="/my-plan"
            className="
              flex
              items-center
              gap-1.5
              text-xs
              font-medium
              text-[#85878d]
              transition-colors
              hover:text-white
              sm:gap-2
              sm:text-sm
              md:text-[15px]
            "
          >
            <span>Plan</span>

            <span
              className="
                flex
                h-4
                w-4
                items-center
                justify-center
                rounded-full
                bg-[#c6ff00]
                text-[9px]
                font-bold
                text-black
                sm:h-5
                sm:w-5
                sm:text-[10px]
              "
            >
              0
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="
              flex
              items-center
              gap-1.5
              text-xs
              font-medium
              text-[#85878d]
              transition-colors
              hover:text-white
              sm:gap-2
              sm:text-sm
              md:text-[15px]
            "
          >
            <span>Saved</span>

            <span
              className="
                flex
                h-4
                w-4
                items-center
                justify-center
                rounded-full
                border
                border-[#34363b]
                text-[9px]
                text-[#85878d]
                sm:h-5
                sm:w-5
                sm:text-[10px]
              "
            >
              0
            </span>
          </Link>
        </div>

        {/* ================= MOBILE NAV ================= */}
        <div
          className="
            mt-3
            flex
            w-full
            items-center
            justify-center
            gap-1
            border-t
            border-[#1d1f23]
            pt-3
            sm:hidden
          "
        >
          {/* Workouts */}
          <Link
            href="/#library"
            onClick={handleWorkoutClick}
            className={`
              rounded-full
              px-5
              py-2
              text-sm
              font-medium
              transition-all
              duration-200
              ${
                isWorkoutActive
                  ? "bg-[#18220d] text-[#c6ff00]"
                  : "text-[#85878d] hover:text-white"
              }
            `}
          >
            Workouts
          </Link>

          {/* My Plan */}
          <Link
            href="/my-plan"
            className={`
              rounded-full
              px-5
              py-2
              text-sm
              font-medium
              transition-all
              duration-200
              ${
                isMyPlanActive
                  ? "bg-[#18220d] text-[#c6ff00]"
                  : "text-[#85878d] hover:text-white"
              }
            `}
          >
            My Plan
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;