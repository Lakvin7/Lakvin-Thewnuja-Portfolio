import React, { memo } from "react";
import { Facebook, FileText, Github, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import SocialIcon from "../common/SocialIcon";

const FooterSection = memo(function FooterSection() {
  return (
    <footer className="relative z-20 w-full px-0 pb-0 md:px-6 md:pb-8">
      <div className="mx-auto max-w-6xl rounded-t-[28px] border border-b-0 border-white/35 bg-white/14 px-4 py-5 text-black/45 shadow-[0_16px_48px_rgba(0,0,0,0.12)] backdrop-blur-md md:rounded-[24px] md:border-b md:px-5">
        <div className="mt-2 grid grid-cols-4 place-items-center gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
          <SocialIcon href="https://github.com/Lakvin7" label="GitHub" icon={Github} />
          <SocialIcon href="https://www.linkedin.com/in/lakvin-thewnuja" label="LinkedIn" icon={Linkedin} />
          <SocialIcon href="https://www.instagram.com/lkvnn7" label="Instagram" icon={Instagram} />
          <SocialIcon href="https://www.facebook.com/" label="Facebook" icon={Facebook} />
          <SocialIcon href="https://www.youtube.com/" label="YouTube" icon={Youtube} />
          <SocialIcon href="mailto:thewnujalakvin@gmail.com" label="Email" icon={Mail} target="_self" rel={undefined} />
          <SocialIcon href="/cv.pdf" label="CV" icon={FileText} />
        </div>
        <div className="mt-5 text-center text-[10px] uppercase tracking-[0.18em] text-black/45 md:text-[11px] md:tracking-[0.24em]">
          <span>Copyright 2026. All rights reserved.</span>
        </div>
        <div className="mt-2 text-center text-[13px] text-black/45 md:mt-3 md:text-sm">You will always be my moon💗</div>
      </div>
    </footer>
  );
});

export default FooterSection;
