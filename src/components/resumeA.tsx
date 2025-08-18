// components/resumeA.tsx
"use client";
import React from "react";
import { Download } from "lucide-react";

type resumeAProps = {
  onOpenResume: () => void;
  className?: string;
};

const resumeA: React.FC<resumeAProps> = ({ onOpenResume, className = "" }) => {
  return (
    <div className={`text-center mx-auto px-4 max-w-3xl ${className}`}>
      <button
        type="button"
        onClick={onOpenResume}
        className="inline-flex items-center gap-2 text-[#FF1DCE] hover:text-[#D1E231] focus:outline-none"
        aria-label="Download resume"
      >
        <Download className="size-4" aria-hidden="true" />
        <span>Download C.V.</span>
      </button>
    </div>
  );
};

export default resumeA;
