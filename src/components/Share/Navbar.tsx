"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import brandLogo from "@/assets/images/brand-logo.png";

const Navbar = () => {
  const pathname = usePathname();

  const [planCount, setPlanCount] =
    useState(0);

  const [savedCount, setSavedCount] =
    useState(0);

  /* ================= LOAD COUNTERS ================= */

  const updateCounters = () => {
    try {
      const plan =
        localStorage.getItem("todayPlan");

      const saved =
        localStorage.getItem(
          "savedExercises"
        );

      const parsedPlan = plan
        ? JSON.parse(plan)
        : [];

      const parsedSaved = saved
        ? JSON.parse(saved)
        : [];

      setPlanCount(
        Array.isArray(parsedPlan)
          ? parsedPlan.length
          : 0
      );

      setSavedCount(
        Array.isArray(parsedSaved)
          ? parsedSaved.length
          : 0
      );
    } catch {
      setPlanCount(0);
      setSavedCount(0);
    }
  };

  useEffect(() => {
    updateCounters();

    const handleStorageUpdate = () => {
      updateCounters();
    };

    const handleStorage = () => {
      updateCounters();
    };

    window.addEventListener(
      "fitlog-storage-update",
      handleStorageUpdate
    );

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "fitlog-storage-update",
        handleStorageUpdate
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  const isWorkoutActive =
    pathname === "/" ||
    pathname.startsWith("/workouts");

  const isMyPlanActive =
    pathname === "/my-plan";

  /* ================= WORKOUT CLICK ================= */

  const handleWorkoutClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (pathname === "/") {
      e.preventDefault();

      const librarySection =
        document.getElementById(
          "library"
        );

      if (librarySection) {
        librarySection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-[#24262b]
        bg-[#0c0d0f]/95
        backdrop-blur-md
      "
    >
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
          <Link
            href="/"
            className="flex items-center"
          >
            <Image
              src={brandLogo}
              alt="FitLog"
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

        {/* ================= DESKTOP NAV ================= */}

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

          <Link
            href="/my-plan"
            className={`
              rounded-full
              px-4
              py-2
              text-sm
              font-medium
              transition-all
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

        {/* ================= COUNTERS ================= */}

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
          <Link
            href="/my-plan"
            className="
              flex
              items-center
              gap-2
              text-xs
              font-medium
              text-[#85878d]
              transition
              hover:text-white
              sm:text-sm
              md:text-[15px]
            "
          >
            <span>Plan</span>

            <span
              className="
                flex
                min-w-5
                h-5
                items-center
                justify-center
                rounded-full
                bg-[#c6ff00]
                px-1.5
                text-[10px]
                font-bold
                text-black
              "
            >
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="
              flex
              items-center
              gap-2
              text-xs
              font-medium
              text-[#85878d]
              transition
              hover:text-white
              sm:text-sm
              md:text-[15px]
            "
          >
            <span>Saved</span>

            <span
              className="
                flex
                min-w-5
                h-5
                items-center
                justify-center
                rounded-full
                border
                border-[#34363b]
                px-1.5
                text-[10px]
                text-[#85878d]
              "
            >
              {savedCount}
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
          <Link
            href="/#library"
            onClick={handleWorkoutClick}
            className={`
              rounded-full
              px-5
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
              px-5
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