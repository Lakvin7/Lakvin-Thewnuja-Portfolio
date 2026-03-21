import React, { memo } from "react";
import { Facebook, FileText, Github, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import SocialIcon from "../common/SocialIcon";

const FooterSection = memo(function FooterSection() {
  return (
    <footer className="relative z-20 w-full px-3 pb-5 md:px-6 md:pb-8">
      <div className="mx-auto max-w-6xl rounded-[20px] border border-white/35 bg-white/14 px-4 py-4 text-black/45 shadow-[0_16px_48px_rgba(0,0,0,0.12)] backdrop-blur-md md:rounded-[24px] md:px-5">
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <SocialIcon href="https://github.com/Lakvin7" label="GitHub" icon={Github} />
          <SocialIcon href="https://www.linkedin.com/in/lakvin-thewnuja" label="LinkedIn" icon={Linkedin} />
          <SocialIcon href="https://www.instagram.com/lkvnn7" label="Instagram" icon={Instagram} />
          <SocialIcon href="https://www.facebook.com/" label="Facebook" icon={Facebook} />
          <SocialIcon href="https://www.youtube.com/" label="YouTube" icon={Youtube} />
          <SocialIcon href="mailto:thewnujalakvin@gmail.com" label="Email" icon={Mail} target="_self" rel={undefined} />
          <SocialIcon href="/cv.pdf" label="CV" icon={FileText} />
        </div>
        <div className="mt-4 text-center text-[11px] uppercase tracking-[0.24em] text-black/45">
          <span>Copyright © 2026. All rights reserved.</span>
        </div>
        <div className="mt-3 text-center text-sm text-black/45">You will always be my moon💗</div>
      </div>
    </footer>
  );
});

export default FooterSection;
