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
    <div className={`bg-cadetGray/40 hover:bg-bone text-babypowder text-center mt-4 mx-auto max-w-[150px] rounded-lg ${className}`}>
      <button
        type="button"
        onClick={onOpenResume}
        className="inline-flex items-center gap-2 pt-2  focus:outline-none text-[14px]"
        aria-label="Download resume"
      >
        <Download className="size-4 " aria-hidden="true" />
        <span>Download C.V.</span>
      </button>
    </div>
  );
};

export default resumeA;
