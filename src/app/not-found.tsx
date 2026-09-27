import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-[#0c0d0f] px-4">
      <div className="text-center">

        <p className="text-sm font-bold uppercase tracking-widest text-[#c6ff00]">
          FitLog
        </p>

        <h1 className="mt-3 text-6xl font-black text-white">
          404
        </h1>

        <h2 className="mt-3 text-xl font-bold uppercase text-white">
          Workout Not Found
        </h2>

        <p className="mt-2 max-w-md text-sm text-[#85878d]">
          The workout you are looking for does not exist
          or may have been removed.
        </p>

        <Link
          href="/#library"
          className="
            mt-6
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
            text-black
            transition
            hover:bg-[#d5ff4d]
          "
        >
          <ArrowLeft size={15} />
          Back to Library
        </Link>
      </div>
    </main>
  );
}