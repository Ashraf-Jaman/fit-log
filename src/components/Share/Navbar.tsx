"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import brandLogo from "@/assets/images/brand-logo.png";

const Navbar = () => {
  const pathname = usePathname();

  const isWorkoutActive = pathname === "/";
  const isMyPlanActive = pathname === "/my-plan";

  const handleWorkoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Already on homepage
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
          h-[72px]
          w-full
          max-w-[1600px]
          items-center
          justify-between
          px-5
          sm:px-8
          md:px-12
          lg:px-16
          xl:px-20  
        "
      >
        {/* ================= LEFT : LOGO ================= */}
        <div className="flex min-w-0 items-center">
          <Link href="/" className="flex items-center">
            <Image
              src={brandLogo}
              alt="Fitlog"
              priority
              className="
                h-auto
                w-[90px]
                sm:w-[100px]
                md:w-[110px]
              "
            />
          </Link>
        </div>

        {/* ================= CENTER : NAV ================= */}
        <div
          className="
            absolute
            left-1/2
            hidden
            -translate-x-1/2
            items-center
            gap-2
            sm:flex
          "
        >
          {/* Workouts */}
          <Link
            href="/#library"
            onClick={handleWorkoutClick}
            className={`
              rounded-full
              px-5
              py-2.5
              text-sm
              font-medium
              transition-all
              duration-200
              md:px-6
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
              px-5
              py-2.5
              text-sm
              font-medium
              transition-all
              duration-200
              md:px-6
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
        <div className="ml-auto flex items-center gap-5 sm:gap-7 md:gap-9">
          {/* Plan */}
          <Link
            href="/my-plan"
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-[#85878d]
              transition-colors
              hover:text-white
              md:text-[15px]
            "
          >
            <span>Plan</span>

            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-[#c6ff00]
                text-[10px]
                font-bold
                text-black
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
              gap-2
              text-sm
              font-medium
              text-[#85878d]
              transition-colors
              hover:text-white
              md:text-[15px]
            "
          >
            <span>Saved</span>

            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                border
                border-[#34363b]
                text-[10px]
                text-[#85878d]
              "
            >
              0
            </span>
          </Link>
        </div>

        {/* ================= MOBILE NAV ================= */}
        <div className="absolute left-1/2 mt-[74px] flex -translate-x-1/2 items-center gap-1 sm:hidden">
          <Link
            href="/#library"
            onClick={handleWorkoutClick}
            className={`
              rounded-full
              px-4
              py-2
              text-sm
              font-medium
              ${
                isWorkoutActive
                  ? "bg-[#18220d] text-[#c6ff00]"
                  : "text-[#85878d]"
              }
            `}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`
              rounded-full
              px-4
              py-2
              text-sm
              font-medium
              ${
                isMyPlanActive
                  ? "bg-[#18220d] text-[#c6ff00]"
                  : "text-[#85878d]"
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
