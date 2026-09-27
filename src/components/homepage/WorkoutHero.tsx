"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";

import HeroImage from "@/assets/images/banner-img.png";

const WorkoutHero = () => {
  const handleBrowseWorkouts = () => {
    const librarySection =
      document.getElementById("library");

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
          min-h-[390px]
          w-full
          max-w-[1400px]
          items-center
          overflow-hidden
          rounded-xl
          border
          border-[#25282e]
          bg-[#15171c]
          px-6
          py-12
          sm:min-h-[420px]
          sm:px-10
          sm:py-16
          md:min-h-[440px]
          md:px-12
          lg:min-h-[460px]
          lg:px-14
          lg:py-20
          xl:px-16
        "
      >
        {/* ========================================= */}
        {/* LEFT CONTENT */}
        {/* ========================================= */}

        <div
          className="
            relative
            z-10
            w-full
            max-w-[650px]
          "
        >
          {/* Eyebrow */}

          <p
            className="
              mb-4
              text-xs
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#c6ff00]
              sm:text-sm
            "
          >
            Workout Library
          </p>

          {/* Main Heading */}

          <h1
            className="
              max-w-[650px]
              text-4xl
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.035em]
              text-white
              sm:text-5xl
              md:text-6xl
              lg:text-[58px]
              xl:text-[64px]
            "
          >
            Train with intent.
            <br />
            Log every set.
          </h1>

          {/* Description */}

          <p
            className="
              mt-6
              max-w-[510px]
              text-sm
              leading-6
              text-[#92959d]
              sm:text-base
              sm:leading-7
            "
          >
            FitLog is a dark, no-nonsense gym companion:
            pick a lift, lock it into today&apos;s plan,
            and watch the week&apos;s work add up.
          </p>

          {/* CTA */}

          <button
            type="button"
            onClick={handleBrowseWorkouts}
            className="
              mt-7
              inline-flex
              items-center
              gap-2
              rounded-md
              bg-[#c6ff00]
              px-5
              py-3
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-black
              transition-all
              duration-200
              hover:bg-[#d5ff4d]
              hover:shadow-[0_0_24px_rgba(198,255,0,0.16)]
              active:scale-95
              sm:px-6
              sm:py-3.5
              sm:text-[13px]
            "
          >
            Browse Workouts

            <ArrowDown
              size={16}
              strokeWidth={2.5}
            />
          </button>
        </div>

        {/* ========================================= */}
        {/* RIGHT HERO IMAGE */}
        {/* ========================================= */}

        <div
          className="
            pointer-events-none
            absolute
            right-[-55px]
            hidden
            h-[330px]
            w-[390px]
            sm:block
            md:right-[-10px]
            md:h-[370px]
            md:w-[450px]
            lg:right-[20px]
            lg:h-[400px]
            lg:w-[500px]
            xl:right-[45px]
            xl:h-[420px]
            xl:w-[530px]
          "
        >
          <Image
            src={HeroImage}
            alt="FitLog workout illustration"
            fill
            priority
            sizes="
              (max-width: 768px) 0px,
              (max-width: 1024px) 450px,
              530px
            "
            className="
              object-contain
              object-center
            "
          />
        </div>

        {/* ========================================= */}
        {/* MOBILE IMAGE */}
        {/* ========================================= */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-25px]
            right-[-50px]
            h-[190px]
            w-[230px]
            opacity-20
            sm:hidden
          "
        >
          <Image
            src={HeroImage}
            alt=""
            fill
            sizes="230px"
            className="
              object-contain
              object-center
            "
          />
        </div>

        {/* ========================================= */}
        {/* DECORATIVE GLOW */}
        {/* ========================================= */}

        <div
          className="
            pointer-events-none
            absolute
            right-[25%]
            top-1/2
            hidden
            h-[250px]
            w-[250px]
            -translate-y-1/2
            rounded-full
            bg-[#c6ff00]/[0.025]
            blur-3xl
            lg:block
          "
        />
      </div>
    </section>
  );
};

export default WorkoutHero;