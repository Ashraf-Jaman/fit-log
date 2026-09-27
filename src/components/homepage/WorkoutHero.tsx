"use client";

import Image from "next/image";
import HeroImage from "@/assets/images/banner-img.png";

const WorkoutHero = () => {
  const handleBrowseWorkouts = () => {
    const librarySection = document.getElementById("library");

    if (librarySection) {
      librarySection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className="
        w-full
        px-4
        py-8
        sm:px-6
        sm:py-10
        md:px-8
        md:py-12
        lg:px-10
        lg:py-14
      "
    >
      <div
        className="
          relative
          mx-auto
          flex
          min-h-[340px]
          w-full
          max-w-[1400px]
          items-center
          overflow-hidden
          rounded-xl
          border
          border-[#25282e]
          bg-[#15171c]
          px-6
          py-14
          sm:min-h-[370px]
          sm:px-10
          sm:py-16
          md:px-12
          md:py-18
          lg:min-h-[400px]
          lg:px-14
          lg:py-20
          xl:px-16
        "
      >
        {/* ================= LEFT CONTENT ================= */}
        <div className="relative z-10 w-full">
          {/* Small heading */}
          <p
            className="
              mb-4
              text-[10px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-[#c6ff00]
              sm:text-[11px]
            "
          >
            Workout Library
          </p>

          {/* Main heading */}
          <h1
            className="
              max-w-[600px]
              text-4xl
              font-black
              uppercase
              leading-[0.92]
              tracking-[-0.03em]
              text-white
              sm:text-5xl
              md:text-6xl
              lg:text-[52px]
              xl:text-[58px]
            "
          >
            Train with intent.
            Log every set.
          </h1>

          {/* Description */}
          <p
            className="
              mt-5
              max-w-[480px]
              text-sm
              leading-6
              text-[#92959d]
              sm:text-[15px]
            "
          >
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and own the week&apos;s work and up.
          </p>

          {/* Browse button */}
          <button
            type="button"
            onClick={handleBrowseWorkouts}
            className="
              mt-6
              rounded-md
              bg-[#c6ff00]
              px-5
              py-3
              text-[11px]
              font-bold
              uppercase
              tracking-wide
              text-black
              transition-all
              duration-200
              hover:bg-[#d1ff33]
              hover:shadow-[0_0_20px_rgba(198,255,0,0.15)]
              active:scale-95
              sm:px-6
              sm:py-3.5
            "
          >
            Browse Workouts
          </button>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div
          className="
            pointer-events-none
            absolute
            right-[-30px]
            hidden
            h-[300px]
            w-[350px]
            sm:block
            md:right-[20px]
            md:h-[320px]
            md:w-[390px]
            lg:right-[45px]
            lg:h-[340px]
            lg:w-[420px]
            xl:right-[70px]
          "
        >
          <Image
            src={HeroImage}
            alt="Workout illustration"
            fill
            priority
            className="object-contain object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default WorkoutHero;