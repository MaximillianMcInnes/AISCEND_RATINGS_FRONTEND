"use client"
import React from "react";
import Link from "next/link";
import ShimmerButton from "@/components/ui/shimmer-button";

export function ShimmerButtonDemo() {
  return (
    <div className="z-10 flex min-h-64 items-center justify-center">
      <Link href="https://aiscend.co.uk/" passHref>
        <ShimmerButton
          className="shadow-2xl w-48 h-16"
        >
          <span className="whitespace-pre-wrap text-center text-lg font-medium text-bold leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-xl">
            Click Here
          </span>
        </ShimmerButton>
      </Link>
    </div>
  );
}

export default function Find_more() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen">
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-bold">
        Find Out More About AIScend
      </p>
      <ShimmerButtonDemo />
    </div>
  );
}
