"use client";

import { ArrowLeft, ArrowRight, Scale } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FB] px-4 py-16">
      <div className="w-full max-w-2xl rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-[0_20px_45px_-24px_rgba(15,23,42,0.25)] sm:p-14">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-[#D4A017]">
          <Scale className="h-6 w-6" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-[#D4A017]">
          Error 404
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
          The page you are looking for is unavailable or may have moved. Return
          to the dashboard to continue managing your cases.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#23272F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d2229]"
          >
            <ArrowRight className="h-4 w-4" />
            Go Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#D4A017] hover:text-[#D4A017]"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
