import React, { memo } from "react";

const SocialIcon = memo(function SocialIcon({ href, label, icon: Icon, children, target = "_blank", rel = "noreferrer" }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={label}
      title={label}
      className="group pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/12 bg-white/10 text-black/45 transition-[color,transform,background-color,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-[#000B8D]/35 hover:bg-[#000B8D]/8 hover:text-[#000B8D]"
    >
      {Icon ? (
        <Icon className="h-[18px] w-[18px] transition-colors duration-300 ease-out group-hover:text-[#000B8D]" strokeWidth={1.85} />
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px] transition-colors duration-300 ease-out group-hover:text-[#000B8D]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.85"
        >
          {children}
        </svg>
      )}
    </a>
  );
});

export default SocialIcon;
