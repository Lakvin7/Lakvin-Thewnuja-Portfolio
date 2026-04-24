import React, { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FileText, Github, Instagram, Linkedin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import alphacorsaFont from "./assets/fonts/alphacorsa.ttf";
import marqueeExtraLightFont from "./assets/fonts/marquee-extralight.otf";
import SocialIcon from "./components/common/SocialIcon";
import ContactSection from "./components/sections/ContactSection";
import FooterSection from "./components/sections/FooterSection";
import {
  aboutBackdropPortraits,
  aboutIntroCopy,
  aboutPortraitOptions,
  aboutPortraitOrder,
  aboutTechStack,
  backgroundImage,
  cvDownloadUrl,
  foregroundImage,
  heroHoverImages,
  workProjects,
} from "./data/portfolioData";

gsap.registerPlugin(ScrollTrigger);


const AboutSection = memo(function AboutSection() {
  const shellRef = useRef(null);
  const stickyRef = useRef(null);

  const heroRef = useRef(null);
  const kickerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const copyRef = useRef(null);
  const tagsRef = useRef(null);
  const portraitRef = useRef(null);
  const portraitImgRef = useRef(null);
  const backdropPortraitRefs = useRef([]);
  const backdropPortraitImgRefs = useRef([]);
  const badgeARef = useRef(null);
  const badgeBRef = useRef(null);
  const badgeCRef = useRef(null);
  const badgeDRef = useRef(null);
  const skillsRef = useRef(null);
  const skillsHeadingRef = useRef(null);
  const skillsCopyRef = useRef(null);
  const techCardRefs = useRef([]);
  const [activePortraitBadge, setActivePortraitBadge] = useState("Designer");
  const [isPortraitAutoRotateEnabled] = useState(true);
  const [isCompactAboutLayout, setIsCompactAboutLayout] = useState(false);
  const [expandedTechName, setExpandedTechName] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const syncLayout = () => setIsCompactAboutLayout(mediaQuery.matches);

    syncLayout();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncLayout);
      return () => mediaQuery.removeEventListener("change", syncLayout);
    }

    mediaQuery.addListener(syncLayout);
    return () => mediaQuery.removeListener(syncLayout);
  }, []);

  useEffect(() => {
    if (!isPortraitAutoRotateEnabled) return undefined;

    const intervalId = window.setInterval(() => {
      setActivePortraitBadge((current) => {
        if (isCompactAboutLayout) {
          const options = aboutPortraitOrder.filter((item) => item !== current);
          return options[Math.floor(Math.random() * options.length)] || current;
        }

        const currentIndex = aboutPortraitOrder.indexOf(current);
        const nextIndex = (currentIndex + 1) % aboutPortraitOrder.length;
        return aboutPortraitOrder[nextIndex];
      });
    }, isCompactAboutLayout ? 2800 : 10000);

    return () => window.clearInterval(intervalId);
  }, [isCompactAboutLayout, isPortraitAutoRotateEnabled]);

  useLayoutEffect(() => {
    const resetElementStyles = (element) => {
      if (!element) return;
      Object.assign(element.style, {
        opacity: "",
        transform: "",
        filter: "",
        pointerEvents: "",
      });
    };

    if (isCompactAboutLayout) {
      [
        heroRef.current,
        kickerRef.current,
        title1Ref.current,
        title2Ref.current,
        copyRef.current,
        tagsRef.current,
        portraitRef.current,
        portraitImgRef.current,
        badgeARef.current,
        badgeBRef.current,
        badgeCRef.current,
        badgeDRef.current,
        skillsRef.current,
        skillsHeadingRef.current,
        skillsCopyRef.current,
        ...backdropPortraitRefs.current,
        ...backdropPortraitImgRefs.current,
        ...techCardRefs.current,
      ].forEach(resetElementStyles);

      return undefined;
    }

    let raf = 0;
    let last = -1;
    let renderedProgress = 0;

    const clampValue = (value, min, max) => Math.max(min, Math.min(max, value));
    const mapValue = (value, a, b, c, d) => c + ((clampValue(value, a, b) - a) / (b - a)) * (d - c);
    const easeOut = (value) => 1 - Math.pow(1 - clampValue(value, 0, 1), 3);
    const easeBack = (value) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      const next = clampValue(value, 0, 1);
      return 1 + c3 * Math.pow(next - 1, 3) + c1 * Math.pow(next - 1, 2);
    };
    const lerp = (a, b, t) => a + (b - a) * t;
    const seg = (progress, start, end, fn = easeOut) => fn(mapValue(progress, start, end, 0, 1));
    const withPause = (progress, pauseStart, pauseEnd) => {
      if (progress <= pauseStart) return progress;
      if (progress <= pauseEnd) return pauseStart;
      return pauseStart + ((progress - pauseEnd) / (1 - pauseEnd)) * (1 - pauseStart);
    };

    const tick = () => {
      const shell = shellRef.current;
      if (!shell) {
        raf = window.requestAnimationFrame(tick);
        return;
      }

      const scrollTop = window.scrollY;
      const shellTop = shell.getBoundingClientRect().top + scrollTop;
      const scrollable = shell.offsetHeight - window.innerHeight;
      const rawProgress = clampValue((scrollTop - shellTop) / scrollable, 0, 1);
      const progress = withPause(rawProgress, 0.34, 0.48);
      renderedProgress = lerp(renderedProgress, progress, 0.05);

      if (Math.abs(renderedProgress - last) < 0.0003 && Math.abs(progress - renderedProgress) < 0.0003) {
        raf = window.requestAnimationFrame(tick);
        return;
      }
      last = renderedProgress;

      const set = (element, styles) => {
        if (!element) return;
        Object.assign(element.style, styles);
      };

      const heroOut = seg(renderedProgress, 0.5, 0.66);
      set(heroRef.current, {
        opacity: lerp(1, 0, heroOut),
        transform: `translateY(${lerp(0, -40, heroOut)}px) scale(${lerp(1, 0.97, heroOut)})`,
        filter: `blur(${lerp(0, 8, heroOut)}px)`,
        pointerEvents: heroOut > 0.8 ? "none" : "auto",
      });

      set(kickerRef.current, {
        opacity: lerp(0, 1, seg(renderedProgress, 0.02, 0.14)),
        transform: `translateY(${lerp(20, 0, seg(renderedProgress, 0.02, 0.14))}px)`,
      });

      [[title1Ref, 0.04, 0.16], [title2Ref, 0.07, 0.2]].forEach(([ref, start, end]) =>
        set(ref.current, {
          opacity: lerp(0, 1, seg(renderedProgress, start, end)),
          transform: `translateY(${lerp(50, 0, seg(renderedProgress, start, end))}px)`,
          filter: `blur(${lerp(12, 0, seg(renderedProgress, start, end))}px)`,
        })
      );

      set(copyRef.current, {
        opacity: lerp(0, 0.88, seg(renderedProgress, 0.12, 0.26)),
        transform: `translateY(${lerp(24, 0, seg(renderedProgress, 0.12, 0.26))}px)`,
      });
      set(tagsRef.current, {
        opacity: lerp(0, 1, seg(renderedProgress, 0.16, 0.28)),
        transform: `translateY(${lerp(16, 0, seg(renderedProgress, 0.16, 0.28))}px)`,
      });

      const portraitIn = seg(renderedProgress, 0.04, 0.26, easeBack);
      const portraitEase = easeOut(mapValue(renderedProgress, 0.04, 0.26, 0, 1));
      backdropPortraitRefs.current.forEach((element, index) => {
        const travel = 58 + index * 16;
        const depthScale = 0.88 + index * 0.03;
        const driftX = index === 0 ? 36 : index === 1 ? -28 : 14;
        const fade = lerp(0.08, 0.26 - index * 0.04, portraitEase);

        set(element, {
          opacity: fade,
          transform: `translate3d(${lerp(driftX, driftX * 0.38, portraitEase)}px, ${lerp(travel, -22 - index * 10, portraitEase)}px, 0) scale(${lerp(depthScale, depthScale + 0.06, portraitIn)}) rotate(${lerp((index === 1 ? -16 : 10) + index * 2, index === 1 ? -10 : 6, portraitEase)}deg)`,
          filter: `blur(${lerp(18 - index * 2, 10 + index, portraitEase)}px)`,
        });
      });

      backdropPortraitImgRefs.current.forEach((element, index) => {
        set(element, {
          transform: `scale(${lerp(1.18 + index * 0.03, 1.05 + index * 0.02, portraitEase)})`,
          filter: `brightness(${lerp(0.58, 0.76 - index * 0.04, portraitEase)}) blur(${lerp(10, 4 + index, portraitEase)}px)`,
        });
      });

      set(portraitRef.current, {
        opacity: lerp(0.2, 1, portraitEase),
        transform: `scale(${lerp(0.84, 1, portraitIn)}) translateY(${lerp(50, 0, portraitEase)}px) rotateX(${lerp(8, 0, portraitEase)}deg)`,
      });
      set(portraitImgRef.current, {
        transform: `scale(${lerp(1.16, 1.02, portraitEase)})`,
        filter: `brightness(${lerp(0.68, 1, portraitEase)}) blur(${lerp(7, 0, portraitEase)}px)`,
      });
      set(badgeARef.current, {
        opacity: lerp(0, 1, seg(renderedProgress, 0.2, 0.32)),
        transform: `translateY(${lerp(16, 0, seg(renderedProgress, 0.2, 0.32))}px)`,
      });
      set(badgeBRef.current, {
        opacity: lerp(0, 1, seg(renderedProgress, 0.24, 0.36)),
        transform: `translateY(${lerp(16, 0, seg(renderedProgress, 0.24, 0.36))}px)`,
      });
      set(badgeCRef.current, {
        opacity: lerp(0, 1, seg(renderedProgress, 0.22, 0.34)),
        transform: `translateY(${lerp(16, 0, seg(renderedProgress, 0.22, 0.34))}px)`,
      });
      set(badgeDRef.current, {
        opacity: lerp(0, 1, seg(renderedProgress, 0.26, 0.38)),
        transform: `translateY(${lerp(16, 0, seg(renderedProgress, 0.26, 0.38))}px)`,
      });

      const skillsIn = seg(renderedProgress, 0.52, 0.68);
      set(skillsRef.current, {
        opacity: lerp(0, 1, skillsIn),
        transform: `translateY(${lerp(40, 0, skillsIn)}px)`,
        filter: "blur(0px)",
        pointerEvents: skillsIn < 0.1 ? "none" : "auto",
      });

      const skillsHeadingIn = seg(renderedProgress, 0.54, 0.66);
      set(skillsHeadingRef.current, {
        opacity: lerp(0, 1, skillsHeadingIn),
        transform: `translateY(${lerp(26, 0, skillsHeadingIn)}px)`,
        filter: `blur(${lerp(8, 0, skillsHeadingIn)}px)`,
      });
      const skillsCopyIn = seg(renderedProgress, 0.58, 0.7);
      set(skillsCopyRef.current, {
        opacity: lerp(0, 1, skillsCopyIn),
        transform: `translateY(${lerp(22, 0, skillsCopyIn)}px)`,
        filter: "blur(0px)",
      });

      techCardRefs.current.forEach((element, index) => {
        const start = 0.58 + index * 0.016;
        const end = start + 0.12;
        const cardIn = seg(renderedProgress, start, end);
        set(element, {
          opacity: lerp(0, 1, cardIn),
          transform: `translateY(${lerp(34, 0, cardIn)}px) scale(${lerp(0.94, 1, cardIn)})`,
          filter: `blur(${lerp(10, 0, cardIn)}px)`,
        });
      });

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [isCompactAboutLayout]);

  const activePortraitImage = aboutPortraitOptions[activePortraitBadge] || aboutPortraitOptions.Designer;
  const skills = [
    { n: "01", title: "Web Development", body: "Clean, purposeful interfaces. Every spacing decision and every contrast ratio is intentional." },
    { n: "02", title: "App Development", body: "Animation that guides attention and gives the experience personality without noise." },
    { n: "03", title: "Creative Tech", body: "React, Next.js, and code that matches the design spec with care." },
  ];
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap');
        .abt-shell,
        .abt-shell *,
        .abt-shell *::before,
        .abt-shell *::after { box-sizing:border-box; }
        .abt-shell ::selection { background:rgba(0,0,0,0.15); }
        .abt-shell {
          position:relative;
          height:210vh;
          background:transparent;
          font-family:'Outfit',sans-serif;
          color:#111;
          overflow:clip;
        }
        .abt-pin {
          position:sticky;
          top:0;
          height:100vh;
          overflow:hidden;
        }
        .abt-pin::after {
          content:'';
          position:absolute;
          inset:0;
          pointer-events:none;
          z-index:300;
          opacity:0.028;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .abt-glass {
          background:rgba(215,215,215,0.52);
          backdrop-filter:blur(20px) saturate(1.4);
          -webkit-backdrop-filter:blur(20px) saturate(1.4);
          border:1px solid rgba(255,255,255,0.62);
        }
        .abt-stage {
          position:absolute;
          inset:0;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          padding:0 28px;
          will-change:transform,opacity,filter;
        }
        .abt-well {
          width:100%;
          max-width:1152px;
        }
        @keyframes abt-float-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes abt-pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .abt-float { animation:abt-float-y 4s ease-in-out infinite; }
        .abt-float2 { animation:abt-float-y 4.6s ease-in-out infinite 1.1s; }
        .abt-img-card { overflow:hidden; }
        .abt-img-card img { transition:transform 0.55s cubic-bezier(0.16,1,0.3,1); }
        .abt-img-card:hover img { transform:scale(1.06) !important; }
        .abt-back-portrait {
          position:absolute;
          border-radius:24px;
          overflow:hidden;
          pointer-events:none;
          z-index:0;
          transform-style:preserve-3d;
          will-change:transform,opacity,filter;
        }
        .abt-tech-grid {
          display:grid;
          grid-template-columns:repeat(4,minmax(0,1fr));
          gap:22px;
        }
        .abt-tech-card {
          display:flex;
          align-items:center;
          gap:16px;
          padding:18px 20px;
          border-radius:20px;
          background:rgba(215,215,215,0.42);
          border:1px solid rgba(255,255,255,0.58);
          backdrop-filter:blur(16px) saturate(1.2);
          -webkit-backdrop-filter:blur(16px) saturate(1.2);
          box-shadow:0 16px 40px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.35);
        }
        .abt-tech-icon {
          width:46px;
          height:46px;
          border-radius:14px;
          display:flex;
          align-items:center;
          justify-content:center;
          background:rgba(255,255,255,0.44);
          border:1px solid rgba(255,255,255,0.46);
          flex-shrink:0;
        }
        .abt-tech-icon img {
          width:26px;
          height:26px;
          object-fit:contain;
        }
        .abt-tech-copy {
          display:block;
        }
        .abt-hero-grid {
          display:grid;
          grid-template-columns:minmax(0,1.02fr) minmax(340px,0.98fr);
          gap:56px 96px;
          align-items:center;
        }
        .abt-copy-column {
          justify-self:start;
          margin-left:-18px;
        }
        .abt-portrait-stage {
          display:flex;
          justify-content:center;
          perspective:1200px;
        }
        .abt-portrait-wrap {
          position:relative;
          width:min(100%,450px);
          height:min(68vh,560px);
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .abt-main-portrait {
          position:relative;
          width:min(100%,320px);
          opacity:0;
          will-change:transform,opacity;
          transform-style:preserve-3d;
          z-index:2;
        }
        .abt-main-portrait-media {
          height:58vh;
          max-height:520px;
          overflow:hidden;
        }
        .abt-badge {
          position:absolute;
          border-radius:12px;
          padding:9px 15px;
          box-shadow:0 6px 24px rgba(0,0,0,0.10);
          opacity:0;
          will-change:transform,opacity;
          background:rgba(215,215,215,0.52);
          cursor:pointer;
        }
        @media (max-width: 900px) {
          .abt-shell {
            height:auto;
            overflow:visible;
            padding:56px 0 24px;
          }
          .abt-pin {
            position:relative;
            height:auto;
            overflow:visible;
          }
          .abt-pin::after {
            display:none;
          }
          .abt-stage {
            position:relative;
            inset:auto;
            min-height:auto;
            padding:0 18px;
            justify-content:flex-start;
          }
          .abt-stage + .abt-stage {
            margin-top:56px;
          }
          .abt-well {
            max-width:100%;
          }
          .abt-hero-grid {
            grid-template-columns:1fr;
            gap:32px;
          }
          .abt-copy-column {
            margin-left:0;
          }
          .abt-portrait-wrap {
            width:100%;
            height:auto;
            min-height:auto;
            padding-top:12px;
          }
          .abt-back-portrait {
            display:none;
          }
          .abt-main-portrait {
            width:min(100%,340px);
            opacity:1;
          }
          .abt-main-portrait-media {
            height:auto;
            max-height:none;
            aspect-ratio:4/5;
          }
          .abt-tech-grid {
            grid-template-columns:repeat(2,minmax(0,1fr));
            gap:12px;
          }
          .abt-tech-card {
            flex-direction:column;
            justify-content:center;
            gap:10px;
            min-height:84px;
            padding:16px 12px;
            text-align:center;
          }
          .abt-tech-card.is-expanded {
            min-height:118px;
          }
          .abt-tech-icon {
            width:52px;
            height:52px;
          }
          .abt-tech-icon img {
            width:30px;
            height:30px;
          }
          .abt-tech-copy {
            display:none;
            width:100%;
          }
          .abt-tech-card.is-expanded .abt-tech-copy {
            display:block;
          }
        }
        @media (max-width: 980px) {
          .abt-tech-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
        }
        @media (max-width: 640px) {
          .abt-tech-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .abt-stage {
            padding:0 14px;
          }
          .abt-tech-card {
            padding:14px 10px;
          }
        }
        @media (max-width: 420px) {
          .abt-tech-grid {
            grid-template-columns:repeat(2,minmax(0,1fr));
          }
        }
      `}</style>

      <section id="about" className="scroll-mt-28 md:scroll-mt-36">
        <section className="abt-shell" ref={shellRef}>
          <div className="abt-pin" ref={stickyRef}>
            <div ref={heroRef} className="abt-stage" style={{ zIndex: 10 }}>
              <div className="abt-well abt-hero-grid">
                <div className="abt-copy-column">
                  <div style={{ marginBottom: 26 }} data-mobile-reveal="true" data-mobile-reveal-delay="0">
                    <h1 ref={title1Ref} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3.2rem,6vw,7rem)", lineHeight: 0.94, letterSpacing: 0, opacity: 0, willChange: "transform,opacity,filter" }}>More than</h1>
                    <h1 ref={title2Ref} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3.2rem,6vw,7rem)", lineHeight: 0.94, letterSpacing: 0, color: "rgba(30,30,30,0.45)", opacity: 0, willChange: "transform,opacity,filter" }}>just code.</h1>
                  </div>
                  <p ref={copyRef} data-mobile-reveal="true" data-mobile-reveal-delay="80" style={{ fontSize: 14, lineHeight: 1.85, fontWeight: 300, color: "rgba(20,20,20,0.62)", maxWidth: 500, marginBottom: 30, opacity: 0, willChange: "transform,opacity" }}>{aboutIntroCopy}</p>
                  <div ref={tagsRef} data-mobile-reveal="true" data-mobile-reveal-delay="140" style={{ display: "flex", flexWrap: "wrap", gap: 12, opacity: 0, willChange: "transform,opacity" }}>
                    {skills.map((skill, index) => (
                      <span key={skill.n} style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 15px", borderRadius: 999, background: index === 0 ? "rgba(0,0,0,0.11)" : "rgba(255,255,255,0.42)", border: index === 0 ? "1px solid rgba(0,0,0,0.16)" : "1px solid rgba(255,255,255,0.65)", color: index === 0 ? "#111" : "#555", backdropFilter: "blur(8px)" }}>{skill.title}</span>
                    ))}
                  </div>
                </div>

                {!isCompactAboutLayout ? (
                  <div className="abt-portrait-stage">
                    <div className="abt-portrait-wrap">
                      {aboutBackdropPortraits.map((portrait, index) => (
                        <div
                          key={portrait.alt}
                          ref={(element) => { backdropPortraitRefs.current[index] = element; }}
                          className={`abt-back-portrait ${portrait.floatClass}`}
                          style={{
                            width: portrait.width,
                            height: portrait.height,
                            maxHeight: portrait.maxHeight,
                            top: portrait.top,
                            right: portrait.right,
                            bottom: portrait.bottom,
                            left: portrait.left,
                            opacity: 0,
                          }}
                        >
                          <div className="abt-glass" style={{ position: "relative", width: "100%", height: "100%", borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 70px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.42)" }}>
                            <img
                              ref={(element) => { backdropPortraitImgRefs.current[index] = element; }}
                              src={portrait.image}
                              alt={portrait.alt}
                              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", willChange: "transform,filter", opacity: 0.9 }}
                            />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(165,165,165,0.45) 0%,transparent 42%)", pointerEvents: "none" }} />
                          </div>
                        </div>
                      ))}
                    <div ref={portraitRef} className="abt-main-portrait">
                      <div className="abt-glass" style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.7)" }}>
                        <div className="abt-main-portrait-media">
                          <img ref={portraitImgRef} src={activePortraitImage} alt={activePortraitBadge.toLowerCase()} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", willChange: "transform,filter", transition: "opacity 0.35s ease, transform 0.35s ease, filter 0.35s ease" }} />
                        </div>
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(165,165,165,0.55) 0%,transparent 38%)", pointerEvents: "none" }} />
                      </div>
                    </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div ref={skillsRef} className="abt-stage" style={{ zIndex: 20, opacity: 0 }}>
              <div className="abt-well">
                <div style={{ marginBottom: 36 }} data-mobile-reveal="true" data-mobile-reveal-delay="0">
                  <h2 ref={skillsHeadingRef} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.2rem,4.8vw,3.8rem)", letterSpacing: 0, lineHeight: 1, color: "#111", margin: 0, opacity: 0, willChange: "transform,opacity,filter" }}><span style={{ color: "rgba(20,20,20,0.38)" }}>Tech</span> <span style={{ color: "#111111" }}>Stacks</span></h2>
                  <p ref={skillsCopyRef} style={{ maxWidth: 620, marginTop: 14, fontSize: 14, lineHeight: 1.8, color: "rgba(20,20,20,0.58)", fontWeight: 300, opacity: 0, willChange: "transform,opacity" }}>
                    The tools I use across coding, design, editing, and creative work.
                  </p>
                </div>
                <div className="abt-tech-grid">
                  {aboutTechStack.map((tech, index) => (
                    <button
                      key={tech.name}
                      ref={(element) => { techCardRefs.current[index] = element; }}
                      type="button"
                      className={`abt-tech-card${isCompactAboutLayout && expandedTechName === tech.name ? " is-expanded" : ""}`}
                      data-mobile-reveal="true"
                      data-mobile-reveal-delay={String(60 + index * 30)}
                      style={{ opacity: 0, willChange: "transform,opacity,filter" }}
                      onClick={() => {
                        if (!isCompactAboutLayout) return;
                        setExpandedTechName((current) => current === tech.name ? null : tech.name);
                      }}
                    >
                      <div className="abt-tech-icon">
                        <img src={tech.icon} alt={tech.name} onError={(event) => { event.currentTarget.style.display = "none"; }} />
                      </div>
                      <div className="abt-tech-copy">
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#181818", letterSpacing: "-0.02em" }}>{tech.name}</div>
                        <div style={{ marginTop: 4, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#111111", fontWeight: 600 }}>{tech.category}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
});
function RippleReveal({ ripple, image, onDone }) {
  const [expanded, setExpanded] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const startTimer = window.setTimeout(() => setExpanded(true), 10);
    const fadeTimer = window.setTimeout(() => setFading(true), 2700);
    const endTimer = window.setTimeout(onDone, 4700);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(endTimer);
    };
  }, [onDone]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden">
      <img
        src={image}
        alt="Ripple reveal"
        className="absolute inset-0 h-full w-full object-cover transition-[clip-path] duration-[3400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: fading ? 0 : 0.9,
          clipPath: expanded
            ? `circle(160vmax at ${ripple.x}px ${ripple.y}px)`
            : `circle(0px at ${ripple.x}px ${ripple.y}px)`,
          transition: `clip-path 3400ms cubic-bezier(0.16,1,0.3,1), opacity 1900ms ease-out`,
        }}
      />
      <div
        className="absolute rounded-full border border-white/45 transition-[transform,opacity,border-width] duration-[3400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          left: ripple.x - 80,
          top: ripple.y - 80,
          width: 160,
          height: 160,
          transform: expanded ? "scale(24)" : "scale(0.16)",
          opacity: expanded ? 0 : 0.92,
          borderWidth: expanded ? "1px" : "2px",
        }}
      />
      <div
        className="absolute rounded-full border border-white/25 transition-[transform,opacity] duration-[3400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          left: ripple.x - 60,
          top: ripple.y - 60,
          width: 120,
          height: 120,
          transform: expanded ? "scale(30)" : "scale(0.12)",
          opacity: expanded ? 0 : 0.55,
        }}
      />
    </div>
  );
}

const WorkSection = memo(function WorkSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isCompactWorkLayout, setIsCompactWorkLayout] = useState(false);
  const [selectedMobileProjectIndex, setSelectedMobileProjectIndex] = useState(null);
  const sectionRef = useRef(null);
  const shellRef = useRef(null);
  const titleLeadRef = useRef(null);
  const topbarRef = useRef(null);
  const featureRef = useRef(null);
  const listCardRefs = useRef([]);
  const activeProject = workProjects[activeProjectIndex];
  const selectedMobileProject =
    selectedMobileProjectIndex === null ? null : workProjects[selectedMobileProjectIndex];

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const syncLayout = () => {
      const isCompact = mediaQuery.matches;
      setIsCompactWorkLayout(isCompact);
      if (!isCompact) {
        setSelectedMobileProjectIndex(null);
      }
    };

    syncLayout();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncLayout);
      return () => mediaQuery.removeEventListener("change", syncLayout);
    }

    mediaQuery.addListener(syncLayout);
    return () => mediaQuery.removeListener(syncLayout);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const element = shellRef.current;
    if (!section || !element) return undefined;

    let isRevealed = false;
    let exitProgress = 0;
    let ticking = false;

    const applyShellState = () => {
      if (!isRevealed) {
        element.style.opacity = "0";
        element.style.transform = "translateY(44px) scale(0.985)";
        element.style.filter = "blur(10px)";
        if (titleLeadRef.current) {
          titleLeadRef.current.style.opacity = "0";
          titleLeadRef.current.style.transform = "translateY(34px) rotate(4deg)";
          titleLeadRef.current.style.filter = "blur(10px)";
        }
        return;
      }

      const visibility = 1 - exitProgress;
      element.style.opacity = `${visibility}`;
      element.style.transform = `translateY(${exitProgress * 42}px) scale(${1 - exitProgress * 0.03})`;
      element.style.filter = `blur(${exitProgress * 8}px)`;
      if (titleLeadRef.current) {
        const titleVisibility = Math.max(0, 1 - exitProgress * 1.15);
        titleLeadRef.current.style.opacity = `${titleVisibility}`;
        titleLeadRef.current.style.transform = `translateY(${exitProgress * 20}px) rotate(${exitProgress * -3}deg)`;
        titleLeadRef.current.style.filter = `blur(${exitProgress * 6}px)`;
      }
    };

    const updateExitProgress = () => {
      ticking = false;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const fadeStart = viewportHeight * 0.42;
      const fadeDistance = Math.max(viewportHeight * 0.34, 1);
      const nextExitProgress = Math.max(0, Math.min((fadeStart - rect.bottom) / fadeDistance, 1));

      exitProgress = nextExitProgress;
      applyShellState();
    };

    const scheduleExitProgressUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateExitProgress);
    };

    const setRevealState = (isVisible) => {
      isRevealed = isVisible;
      applyShellState();
    };

    const revealTargets = [
      topbarRef.current,
      featureRef.current,
      ...listCardRefs.current.filter(Boolean),
    ];
    const setChildRevealState = (isVisible) => {
      revealTargets.forEach((target, index) => {
        if (!target) return;
        const delay = Math.min(index * 55, 220);
        target.style.transitionDelay = isVisible ? `${delay}ms` : "0ms";
        target.style.opacity = isVisible ? "1" : "0";
        target.style.transform = isVisible ? "translateY(0px) scale(1)" : "translateY(26px) scale(0.985)";
        target.style.filter = isVisible ? "blur(0px)" : "blur(8px)";
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          const visibleRatio = entry.intersectionRatio;
          const hasMovedFarAway =
            entry.boundingClientRect.bottom < viewportHeight * 0.14 ||
            entry.boundingClientRect.top > viewportHeight * 0.86;

          if (entry.isIntersecting && visibleRatio > 0.12) {
            setRevealState(true);
            setChildRevealState(true);
            return;
          }

          if (hasMovedFarAway) {
            setRevealState(false);
            setChildRevealState(false);
          }
        });
      },
      { threshold: [0.08, 0.16, 0.28], rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(section);
    updateExitProgress();
    window.addEventListener("scroll", scheduleExitProgressUpdate, { passive: true });
    window.addEventListener("resize", scheduleExitProgressUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleExitProgressUpdate);
      window.removeEventListener("resize", scheduleExitProgressUpdate);
    };
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative z-20 scroll-mt-12 px-3 py-6 md:scroll-mt-16 md:px-6 md:py-10">
      <style>{`
        .work-hold {
          position: relative;
          height: 108vh;
        }
        .work-sticky {
          position: sticky;
          top: 104px;
        }
        .work-shell {
          position: relative;
          overflow: visible;
          height: min(680px, calc(100vh - 7.5rem));
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }
        .work-inner {
          position: relative;
          z-index: 1;
          display: flex;
          height: 100%;
          flex-direction: column;
          padding: 0;
        }
        .work-topbar {
          display: flex;
          justify-content: flex-start;
          gap: 18px;
          margin-bottom: 14px;
        }
        .work-topbar-copy {
          max-width: 520px;
        }
        .work-title {
          margin: 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.2rem, 4.8vw, 3.8rem);
          line-height: 0.94;
          letter-spacing: 0;
          color: rgba(20,20,20,0.88);
        }
        .work-title span {
          color: rgba(20,20,20,0.38);
        }
        .work-title .work-title-accent {
          color: #111111;
        }
        .work-intro {
          margin-top: 8px;
          max-width: 40rem;
          font-family: 'Outfit', sans-serif;
          font-size: clamp(0.9rem, 0.98vw, 0.96rem);
          line-height: 1.48;
          color: rgba(24,24,24,0.56);
        }
        .work-layout {
          flex: 1;
          min-height: 0;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
          gap: 16px;
          align-items: stretch;
        }
        .work-feature {
          position: relative;
          min-height: 0;
          height: 100%;
          overflow: hidden;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.12);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.42);
        }
        .work-feature-glow {
          display: none;
        }
        .work-feature-grid {
          position: absolute;
          inset: 0;
          opacity: 0.24;
          background-image:
            linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.22) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: linear-gradient(180deg, rgba(0,0,0,0.9), transparent 80%);
        }
        .work-feature-curve {
          position: absolute;
          inset: 12% -10% auto 18%;
          height: 150px;
          border: 1px solid rgba(255,255,255,0.34);
          border-radius: 999px;
          transform: rotate(-10deg);
          opacity: 0.55;
        }
        .work-feature-curve::after {
          content: "";
          position: absolute;
          inset: 26px 18%;
          border: 1px solid rgba(255,255,255,0.24);
          border-radius: 999px;
        }
        .work-feature-dots {
          position: absolute;
          inset: auto 8% 14% auto;
          display: grid;
          grid-template-columns: repeat(4, 10px);
          gap: 8px;
          opacity: 0.42;
        }
        .work-feature-dots span {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.56);
        }
        .work-feature-copy {
          position: relative;
          z-index: 1;
          display: flex;
          height: 100%;
          flex-direction: column;
          justify-content: space-between;
          padding: 18px;
        }
        .work-preview-full {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .work-preview-full img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transform: none;
          opacity: 1;
        }
        .work-preview-shade {
          display: none;
        }
        .work-preview-fade {
          display: none;
        }
        .work-feature-head {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: flex-start;
        }
        .work-feature-number {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: rgba(20,20,20,0.44);
          text-transform: uppercase;
        }
        .work-feature-tag {
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.52);
          background: rgba(255,255,255,0.16);
          padding: 8px 12px;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.14em;
          color: rgba(20,20,20,0.7);
          text-transform: uppercase;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.24);
        }
        .work-feature-main {
          width: 100%;
          margin-top: auto;
          padding: 18px 18px 16px;
          border-radius: 24px;
          background: rgba(255,255,255,0.24);
          border: 1px solid rgba(255,255,255,0.54);
          box-shadow: 0 18px 38px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.24);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .work-feature-year {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(20,20,20,0.36);
          text-transform: uppercase;
        }
        .work-feature-title {
          margin-top: 8px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.95rem, 3.1vw, 2.9rem);
          line-height: 0.98;
          letter-spacing: 0;
          color: rgba(16,16,16,0.92);
        }
        .work-feature-desc {
          margin-top: 10px;
          max-width: 34rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.86rem;
          line-height: 1.42;
          color: rgba(24,24,24,0.58);
        }
        .work-feature-footer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.42);
        }
        .work-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .work-pill {
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.46);
          background: rgba(255,255,255,0.18);
          padding: 5px 9px;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          color: rgba(18,18,18,0.5);
          text-transform: uppercase;
        }
        .work-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.48);
          background: rgba(255,255,255,0.26);
          padding: 8px 12px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(20,20,20,0.72);
          text-decoration: none;
          transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.24);
        }
        .work-cta:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.34);
          border-color: rgba(255,255,255,0.68);
        }
        .work-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: flex-end;
        }
        .work-list {
          min-height: 0;
          overflow: auto;
          display: grid;
          gap: 8px;
          padding-right: 4px;
          scrollbar-width: thin;
          scrollbar-color: rgba(90,90,90,0.28) transparent;
        }
        .work-list::-webkit-scrollbar {
          width: 8px;
        }
        .work-list::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: rgba(90,90,90,0.18);
        }
        .work-list::-webkit-scrollbar-track {
          background: transparent;
        }
        .work-list-card {
          position: relative;
          display: grid;
          grid-template-columns: 72px minmax(0, 1fr);
          gap: 12px;
          align-items: center;
          width: 100%;
          border: 1px solid rgba(255,255,255,0.48);
          border-radius: 24px;
          background: rgba(255,255,255,0.16);
          padding: 10px;
          text-align: left;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.28);
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .work-list-card:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.22);
        }
        .work-list-card.is-active {
          border-color: rgba(255,255,255,0.72);
          background: rgba(255,255,255,0.28);
          box-shadow: 0 18px 34px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.34);
        }
        .work-list-visual {
          position: relative;
          height: 76px;
          overflow: hidden;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.34);
          background: rgba(255,255,255,0.08);
        }
        .work-list-preview {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: inherit;
        }
        .work-list-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transform: none;
          opacity: 1;
        }
        .work-list-logo {
          position: absolute;
          inset: 8px;
          width: calc(100% - 16px);
          height: calc(100% - 16px);
          object-fit: contain;
          object-position: center;
          z-index: 2;
          filter: drop-shadow(0 6px 10px rgba(0,0,0,0.12));
        }
        .work-list-icon {
          position: absolute;
          inset: 12px;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .work-list-icon svg {
          width: 34px;
          height: 34px;
          stroke: rgba(255,255,255,0.92);
          stroke-width: 1.7;
        }
        .work-list-visual::before {
          display: none;
        }
        .work-list-visual::after {
          content: "";
          position: absolute;
          inset: auto 10px 10px auto;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(255,255,255,0.42);
          border-radius: 14px;
          transform: rotate(18deg);
        }
        .work-list-wave {
          position: absolute;
          left: 10px;
          right: 10px;
          height: 1px;
          background: rgba(255,255,255,0.58);
          opacity: 0.38;
        }
        .work-list-wave.top { top: 34px; transform: rotate(-8deg); }
        .work-list-wave.bottom { bottom: 28px; transform: rotate(7deg); }
        .work-list-content {
          min-width: 0;
          padding: 8px 10px;
          border-radius: 18px;
          background: rgba(245,245,245,0.94);
          border: 1px solid rgba(255,255,255,0.82);
        }
        .work-list-meta {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 4px;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(18,18,18,0.38);
        }
        .work-list-title {
          font-family: 'Outfit', sans-serif;
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: 0;
          color: rgba(16,16,16,0.84);
        }
        .work-list-desc {
          margin-top: 4px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.82rem;
          line-height: 1.38;
          color: rgba(20,20,20,0.5);
        }
        .work-list-arrow {
          margin-top: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          color: rgba(20,20,20,0.42);
          text-transform: uppercase;
        }
        .work-mobile-list {
          display:none;
        }
        .work-mobile-card {
          position:relative;
          width:100%;
          min-height:124px;
          overflow:hidden;
          border:none;
          border-radius:22px;
          padding:0;
          text-align:left;
          background:#d6d6d6;
          box-shadow:0 18px 38px rgba(0,0,0,0.08);
        }
        .work-mobile-card img {
          width:100%;
          height:100%;
          object-fit:cover;
          object-position:center top;
          display:block;
        }
        .work-mobile-overlay {
          position:absolute;
          inset:auto 0 0 0;
          padding:16px 14px 14px;
          background:linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.24) 22%, rgba(0,0,0,0.72) 100%);
          color:#fff;
        }
        .work-mobile-meta {
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
          font-family:'DM Mono', monospace;
          font-size:9px;
          letter-spacing:0.16em;
          text-transform:uppercase;
          opacity:0.82;
        }
        .work-mobile-title {
          margin-top:8px;
          font-family:'Bebas Neue', sans-serif;
          font-size:2rem;
          line-height:0.92;
          letter-spacing:0.03em;
        }
        .work-mobile-hint {
          margin-top:6px;
          font-family:'Outfit', sans-serif;
          font-size:0.8rem;
          letter-spacing:0.04em;
          opacity:0.82;
        }
        .work-modal {
          position:fixed;
          inset:0;
          z-index:70;
          display:flex;
          align-items:flex-end;
          justify-content:center;
          padding:18px 12px 12px;
          background:rgba(0,0,0,0.42);
          backdrop-filter:blur(10px);
          -webkit-backdrop-filter:blur(10px);
        }
        .work-modal-card {
          width:min(100%,520px);
          max-height:88vh;
          overflow:auto;
          border-radius:28px;
          background:rgba(240,240,240,0.96);
          box-shadow:0 26px 72px rgba(0,0,0,0.24);
        }
        .work-modal-banner {
          position:relative;
          aspect-ratio:16/10;
          overflow:hidden;
        }
        .work-modal-banner img {
          width:100%;
          height:100%;
          object-fit:cover;
          object-position:center top;
          display:block;
        }
        .work-modal-close {
          position:absolute;
          top:14px;
          right:14px;
          width:38px;
          height:38px;
          border:none;
          border-radius:999px;
          background:rgba(255,255,255,0.82);
          color:#111;
          font-size:18px;
        }
        .work-modal-body {
          padding:18px 16px 18px;
        }
        .work-modal-topline {
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          font-family:'DM Mono', monospace;
          font-size:9px;
          letter-spacing:0.16em;
          text-transform:uppercase;
          color:rgba(20,20,20,0.52);
        }
        .work-modal-title {
          margin-top:10px;
          font-family:'Bebas Neue', sans-serif;
          font-size:2.35rem;
          line-height:0.92;
          color:#111;
        }
        .work-modal-desc {
          margin-top:10px;
          font-family:'Outfit', sans-serif;
          font-size:0.92rem;
          line-height:1.55;
          color:rgba(20,20,20,0.68);
        }
        .work-modal-stack {
          display:flex;
          flex-wrap:wrap;
          gap:8px;
          margin-top:14px;
        }
        .work-modal-actions {
          display:grid;
          grid-template-columns:1fr;
          gap:8px;
          margin-top:16px;
        }
        @media (max-width: 980px) {
          .work-hold {
            height: auto;
          }
          .work-sticky {
            position: static;
          }
          .work-shell {
            height: auto;
          }
          .work-inner {
            height: auto;
          }
          .work-layout {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .work-feature {
            min-height: 460px;
            height: auto;
          }
          .work-list {
            overflow: visible;
            padding-right: 0;
          }
        }
        @media (max-width: 900px) {
          .work-topbar {
            margin-bottom: 16px;
          }
          .work-intro {
            max-width: 100%;
          }
          .work-feature {
            border-radius: 24px;
          }
          .work-feature-copy {
            padding: 16px;
          }
          .work-feature-main {
            padding: 16px 16px 14px;
            border-radius: 20px;
          }
          .work-feature-title {
            font-size: clamp(2rem, 7vw, 3rem);
          }
          .work-feature-desc {
            max-width: 100%;
          }
          .work-feature-footer {
            align-items: flex-start;
            justify-content: flex-start;
          }
          .work-actions {
            width: 100%;
            justify-content: flex-start;
          }
          .work-list {
            gap: 10px;
          }
          .work-list-card {
            grid-template-columns: 88px minmax(0, 1fr);
          }
        }
        @media (max-width: 640px) {
          .work-inner {
            padding: 0;
          }
          .work-topbar {
            flex-direction: column;
            gap: 10px;
            margin-bottom: 18px;
          }
          .work-count {
            min-width: 0;
          }
          .work-feature {
            min-height: 420px;
            border-radius: 22px;
          }
          .work-feature,
          .work-list {
            display:none;
          }
          .work-mobile-list {
            display:grid;
            gap:12px;
          }
          .work-feature-copy {
            padding: 14px;
          }
          .work-feature-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .work-feature-main {
            width: 100%;
            padding: 14px;
            border-radius: 18px;
          }
          .work-feature-title {
            font-size: clamp(1.85rem, 9vw, 2.65rem);
          }
          .work-feature-desc {
            font-size: 0.82rem;
            line-height: 1.5;
          }
          .work-feature-footer {
            gap: 14px;
          }
          .work-stack {
            gap: 6px;
          }
          .work-actions {
            display: grid;
            grid-template-columns: 1fr;
            width: 100%;
            gap: 8px;
          }
          .work-cta {
            width: 100%;
            justify-content: center;
          }
          .work-list-card {
            grid-template-columns: 1fr;
            gap: 10px;
            padding: 9px;
            border-radius: 20px;
          }
          .work-list-visual {
            height: 132px;
            border-radius: 16px;
          }
          .work-list-content {
            padding: 10px 12px;
          }
          .work-list-meta {
            gap: 8px;
            font-size: 8px;
          }
          .work-list-title {
            font-size: 0.88rem;
          }
          .work-list-desc {
            font-size: 0.78rem;
            line-height: 1.45;
          }
        }
        @media (max-width: 420px) {
          .work-feature {
            min-height: 390px;
          }
          .work-feature-copy {
            padding: 12px;
          }
          .work-feature-main {
            padding: 12px;
          }
          .work-pill {
            padding: 5px 8px;
            font-size: 8px;
          }
          .work-list-visual {
            height: 118px;
          }
        }
      `}</style>

      <div
        ref={shellRef}
        className="mx-auto max-w-7xl transition-[opacity,transform,filter] duration-700 ease-out"
        style={{ opacity: 0, transform: "translateY(44px) scale(0.985)", filter: "blur(10px)" }}
      >
        <div className="work-hold">
          <div className="work-sticky">
            <div className="work-shell">
              <div className="work-inner">
            <div
              ref={topbarRef}
              className="work-topbar transition-[opacity,transform,filter] duration-700 ease-out"
              data-mobile-reveal="true"
              data-mobile-reveal-delay="0"
              style={{ opacity: 0, transform: "translateY(26px) scale(0.985)", filter: "blur(8px)" }}
            >
              <div className="work-topbar-copy">
                <h2 className="work-title"><span ref={titleLeadRef} className="inline-block transition-[opacity,transform,filter] duration-700 ease-out" style={{ opacity: 0, transform: "translateY(34px) rotate(4deg)", filter: "blur(10px)" }}>My</span> <span className="work-title-accent" style={{ color: "#111111" }}>Work</span></h2>
                <p className="work-intro">
                  A few builds that reflect how I like to work: clean visuals, strong structure, and interactions that feel
                  intentional instead of overdone.
                </p>
              </div>
            </div>

            <div className="work-layout">
              <article
                ref={featureRef}
                className="work-feature"
                style={{
                  "--work-accent-soft": `${activeProject.accent}55`,
                  opacity: 0,
                  transform: "translateY(26px) scale(0.985)",
                  filter: "blur(8px)",
                  transition: "opacity 700ms ease-out, transform 700ms ease-out, filter 700ms ease-out",
                }}
              >
                <div className="work-feature-glow" />
                <div className="work-feature-grid" />
                <div className="work-feature-curve" />
                {activeProject.previewImage ? (
                  <div className="work-preview-full" aria-hidden="true">
                    <img src={activeProject.previewImage} alt={`${activeProject.title} preview`} />
                    <div className="work-preview-shade" />
                    <div className="work-preview-fade" />
                  </div>
                ) : null}
                <div className="work-feature-dots">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <span key={index} />
                  ))}
                </div>

                <div className="work-feature-copy">
                  <div className="work-feature-head">
                    <span
                      className="work-feature-number"
                      style={activeProject.cardTextColor ? { color: activeProject.cardTextColor } : undefined}
                    >
                      {activeProject.number}
                    </span>
                    <span
                      className="work-feature-tag"
                      style={activeProject.cardTextColor ? { color: activeProject.cardTextColor } : undefined}
                    >
                      {activeProject.tag}
                    </span>
                  </div>

                  <div className="work-feature-main">
                    <div
                      className="work-feature-year"
                      style={activeProject.cardTextColor ? { color: activeProject.cardTextColor } : undefined}
                    >
                      {activeProject.year}
                    </div>
                    <div className="work-feature-title">{activeProject.title}</div>
                    <p
                      className="work-feature-desc"
                      style={activeProject.descriptionColor ? { color: activeProject.descriptionColor } : undefined}
                    >
                      {activeProject.description}
                    </p>
                    <div className="work-feature-footer">
                      <div className="work-stack">
                        {activeProject.stack.map((item) => (
                          <span
                            key={item}
                            className="work-pill"
                            style={activeProject.cardTextColor ? { color: activeProject.cardTextColor } : undefined}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="work-actions">
                        <a
                          href="#contact"
                          className="work-cta"
                          style={activeProject.cardTextColor ? { color: activeProject.cardTextColor } : undefined}
                        >
                        Build something like this
                        <span aria-hidden="true">-&gt;</span>
                      </a>
                        <a
                          href={activeProject.visitUrl || "#"}
                          className="work-cta"
                          style={activeProject.cardTextColor ? { color: activeProject.cardTextColor } : undefined}
                          onClick={(event) => {
                            if (!activeProject.visitUrl || activeProject.visitUrl === "#") {
                              event.preventDefault();
                            }
                          }}
                        >
                          Visit
                          <span aria-hidden="true">-&gt;</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              <div className="work-mobile-list" aria-label="Project banners">
                {workProjects.map((project, index) => (
                  <button
                    key={`${project.number}-mobile`}
                    type="button"
                    className="work-mobile-card"
                    data-mobile-reveal="true"
                    data-mobile-reveal-delay={String(60 + index * 70)}
                    onClick={() => setSelectedMobileProjectIndex(index)}
                  >
                    {project.previewImage ? (
                      <img src={project.previewImage} alt={`${project.title} banner`} />
                    ) : (
                      <div
                        style={{
                          minHeight: 124,
                          background: project.useNeutralBanner
                            ? "linear-gradient(135deg, #d7d7d7 0%, #bcbcbc 100%)"
                            : `linear-gradient(135deg, ${project.accent} 0%, ${project.background} 100%)`,
                        }}
                      />
                    )}
                    <div className="work-mobile-overlay">
                      <div className="work-mobile-meta">
                        <span>{project.number}</span>
                        <span>{project.tag}</span>
                      </div>
                      <div className="work-mobile-title">{project.title}</div>
                      <div className="work-mobile-hint">Tap to view project details</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="work-list" aria-label="Project list">
                {workProjects.map((project, index) => (
                  (() => {
                    const ProjectIcon = project.sideIcon;
                    return (
                  <button
                    key={project.number}
                    ref={(element) => { listCardRefs.current[index] = element; }}
                    type="button"
                    className={`work-list-card${index === activeProjectIndex ? " is-active" : ""}`}
                    onMouseEnter={() => setActiveProjectIndex(index)}
                    onFocus={() => setActiveProjectIndex(index)}
                    onClick={() => setActiveProjectIndex(index)}
                    style={{
                      opacity: 0,
                      transform: "translateY(26px) scale(0.985)",
                      filter: "blur(8px)",
                    }}
                  >
                    <div className="work-list-visual">
                      {project.previewImage ? (
                        <div className="work-list-preview" aria-hidden="true">
                          <img src={project.previewImage} alt={`${project.title} list preview`} />
                        </div>
                      ) : null}
                      {project.sideLogo ? (
                        <img
                          className="work-list-logo"
                          src={project.sideLogo}
                          alt=""
                          aria-hidden="true"
                          style={{
                            inset: typeof project.logoInset === "number" ? `${project.logoInset}px` : undefined,
                            width: typeof project.logoInset === "number" ? `calc(100% - ${project.logoInset * 2}px)` : undefined,
                            height: typeof project.logoInset === "number" ? `calc(100% - ${project.logoInset * 2}px)` : undefined,
                            objectFit: project.logoFit || "contain",
                            transform: project.logoScale ? `scale(${project.logoScale})` : undefined,
                          }}
                        />
                      ) : null}
                      {ProjectIcon ? (
                        <div className="work-list-icon" aria-hidden="true">
                          <ProjectIcon />
                        </div>
                      ) : null}
                      <span className="work-list-wave top" />
                      <span className="work-list-wave bottom" />
                    </div>

                    <div className="work-list-content">
                      <div className="work-list-meta">
                        <span>{project.number}</span>
                        <span>{project.tag}</span>
                      </div>
                      <div className="work-list-title">{project.title}</div>
                      <p className="work-list-desc">{project.description}</p>
                      <div className="work-list-arrow">Open in spotlight</div>
                    </div>
                  </button>
                    );
                  })()
                ))}
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>

      {isCompactWorkLayout && selectedMobileProject ? (
        <div className="work-modal" onClick={() => setSelectedMobileProjectIndex(null)}>
          <div className="work-modal-card" onClick={(event) => event.stopPropagation()}>
            <div
              className="work-modal-banner"
              style={{
                background: selectedMobileProject.useNeutralBanner
                  ? "linear-gradient(135deg, #d7d7d7 0%, #bcbcbc 100%)"
                  : `linear-gradient(135deg, ${selectedMobileProject.accent} 0%, ${selectedMobileProject.background} 100%)`,
              }}
            >
              {selectedMobileProject.previewImage ? (
                <img src={selectedMobileProject.previewImage} alt={`${selectedMobileProject.title} preview`} />
              ) : null}
              <button type="button" className="work-modal-close" onClick={() => setSelectedMobileProjectIndex(null)}>
                x
              </button>
            </div>
            <div className="work-modal-body">
              <div className="work-modal-topline">
                <span>{selectedMobileProject.number}</span>
                <span>{selectedMobileProject.year}</span>
                <span>{selectedMobileProject.tag}</span>
              </div>
              <div className="work-modal-title">{selectedMobileProject.title}</div>
              <p className="work-modal-desc">{selectedMobileProject.description}</p>
              <div className="work-modal-stack">
                {selectedMobileProject.stack.map((item) => (
                  <span key={item} className="work-pill">{item}</span>
                ))}
              </div>
              <div className="work-modal-actions">
                <a href="#contact" className="work-cta" onClick={() => setSelectedMobileProjectIndex(null)}>
                  Build something like this
                  <span aria-hidden="true">-&gt;</span>
                </a>
                <a
                  href={selectedMobileProject.visitUrl || "#"}
                  className="work-cta"
                  onClick={(event) => {
                    if (!selectedMobileProject.visitUrl || selectedMobileProject.visitUrl === "#") {
                      event.preventDefault();
                    }
                  }}
                >
                  Visit
                  <span aria-hidden="true">-&gt;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
});

const App = () => {
  const [ripples, setRipples] = useState([]);
  const [hoveredHeaderItem, setHoveredHeaderItem] = useState(null);
  const [heroMenuOpen, setHeroMenuOpen] = useState(false);
  const [activeRevealImage, setActiveRevealImage] = useState(foregroundImage);
  const cursorEnabledRef = useRef(false);
  const cursorFrameRef = useRef(0);
  const cursorTargetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const cursorPositionRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const pointerMotionRef = useRef({
    angle: 0,
    stretch: 1,
    squash: 1,
    radius: "9999px",
  });
  const lastPointerRef = useRef({ x: 0, y: 0, time: 0 });
  const clickHistoryRef = useRef([]);
  const scrollStopTimeoutRef = useRef(null);
  const scrollTargetRef = useRef(0);
  const scrollFrameRef = useRef(0);
  const isScrollingRef = useRef(false);
  const heroProgressRef = useRef(0);
  const heroIsStaticRef = useRef(false);
  const heroHoverLockedRef = useRef(false);
  const heroHoverPreviouslyLockedRef = useRef(false);
  const heroMenuLockedRef = useRef(false);
  const heroMenuOpenRef = useRef(false);
  const hoverPhaseRef = useRef(0);
  const hoverImageIndexRef = useRef(0);
  const pointerFrameRef = useRef(0);
  const pointerLastFrameTimeRef = useRef(0);
  const headerRef = useRef(null);
  const heroSurfaceRef = useRef(null);
  const heroGridCanvasRef = useRef(null);
  const heroLogoRef = useRef(null);
  const heroMenuWrapRef = useRef(null);
  const heroMenuButtonRef = useRef(null);
  const customCursorRef = useRef(null);
  const topMarqueeRef = useRef(null);
  const bottomMarqueeRef = useRef(null);
  const revealImageRef = useRef(null);
  const innerRingRef = useRef(null);
  const outerRingRef = useRef(null);
  const activeRevealImageRef = useRef(foregroundImage);
  const heroRenderStateRef = useRef({
    heroProgress: -1,
    heroTransform: "",
    heroBorderRadius: "",
    heroBoxShadow: "",
    heroFilter: "",
    heroGridCanvasOpacity: "",
    headerOpacity: "",
    headerTransform: "",
    headerPointerEvents: "",
    logoOpacity: "",
    logoTransform: "",
    menuWrapOpacity: "",
    menuWrapTransform: "",
    menuWrapPointerEvents: "",
    menuButtonOpacity: "",
    menuButtonCursor: "",
    menuButtonDisabled: null,
    topMarqueeOpacity: "",
    topMarqueeTransform: "",
    bottomMarqueeOpacity: "",
    bottomMarqueeTransform: "",
    customCursorOpacity: "",
  });

  useEffect(() => {
    const renderCursor = () => {
      cursorFrameRef.current = 0;
      const cursor = customCursorRef.current;
      if (!cursor) return;

      cursorPositionRef.current.x += (cursorTargetRef.current.x - cursorPositionRef.current.x) * 0.22;
      cursorPositionRef.current.y += (cursorTargetRef.current.y - cursorPositionRef.current.y) * 0.22;

      cursor.style.transform = `translate3d(${cursorPositionRef.current.x}px, ${cursorPositionRef.current.y}px, 0) translate(-50%, -50%)`;

      const distance =
        Math.abs(cursorTargetRef.current.x - cursorPositionRef.current.x) +
        Math.abs(cursorTargetRef.current.y - cursorPositionRef.current.y);
      if (distance > 0.2) {
        cursorFrameRef.current = window.requestAnimationFrame(renderCursor);
      }
    };

    const handleMouseMove = (event) => {
      cursorTargetRef.current = { x: event.clientX, y: event.clientY };
      if (!cursorFrameRef.current) {
        cursorFrameRef.current = window.requestAnimationFrame(renderCursor);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (cursorFrameRef.current) {
        window.cancelAnimationFrame(cursorFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    activeRevealImageRef.current = activeRevealImage;
    if (revealImageRef.current) {
      revealImageRef.current.src = activeRevealImage;
    }
  }, [activeRevealImage]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(max-width: 900px)");
    if (!mediaQuery.matches) return undefined;

    const targets = Array.from(document.querySelectorAll("[data-mobile-reveal]"));
    if (targets.length === 0) return undefined;

    const hiddenStyle = {
      opacity: "0",
      transform: "translateY(26px) scale(0.985)",
      filter: "blur(10px)",
    };
    const visibleStyle = {
      opacity: "1",
      transform: "translateY(0px) scale(1)",
      filter: "blur(0px)",
    };

    targets.forEach((element) => {
      Object.assign(element.style, hiddenStyle);
      element.style.transition =
        "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1), filter 700ms ease-out";
      element.style.transitionDelay = `${Number(element.getAttribute("data-mobile-reveal-delay") || 0)}ms`;
      element.style.willChange = "opacity, transform, filter";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Object.assign(entry.target.style, visibleStyle);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = heroGridCanvasRef.current;
    const surface = heroSurfaceRef.current;
    if (!canvas || !surface) return undefined;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;

    const points = [];
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let columns = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, hovering: false };
    const center = { x: 0, y: 0 };
    const maxDpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let time = 0;
    const idlePulseRef = {
      x: 0,
      y: 0,
      radius: 220,
      strength: 0,
      targetStrength: 0,
      nextShiftAt: 0,
    };

    const buildGrid = () => {
      const rect = surface.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * maxDpr);
      canvas.height = Math.round(height * maxDpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(maxDpr, 0, 0, maxDpr, 0, 0);

      center.x = width / 2;
      center.y = height / 2;
      pointer.x = center.x;
      pointer.y = center.y;
      pointer.tx = center.x;
      pointer.ty = center.y;
      idlePulseRef.x = width * 0.32;
      idlePulseRef.y = height * 0.46;
      idlePulseRef.radius = Math.max(width * 0.2, 180);
      idlePulseRef.strength = 0.24;
      idlePulseRef.targetStrength = 0.24;
      idlePulseRef.nextShiftAt = 0;

      points.length = 0;
      const spacing = Math.max(26, Math.min(34, Math.round(width / 34)));
      columns = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const originX = column * spacing;
          const originY = row * spacing;
          points.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            phase: Math.random() * Math.PI * 2,
            brightness: 0.45 + Math.random() * 0.55,
          });
        }
      }
    };

    const updatePointerPosition = (clientX, clientY) => {
      const rect = surface.getBoundingClientRect();
      pointer.tx = clientX - rect.left;
      pointer.ty = clientY - rect.top;
    };

    const handleMove = (event) => {
      const clientX = event.clientX ?? event.touches?.[0]?.clientX;
      const clientY = event.clientY ?? event.touches?.[0]?.clientY;
      if (clientX == null || clientY == null) return;
      pointer.hovering = true;
      updatePointerPosition(clientX, clientY);
    };

    const handleLeave = () => {
      pointer.hovering = false;
      pointer.tx = center.x;
      pointer.ty = center.y;
    };

    const draw = () => {
      animationFrame = window.requestAnimationFrame(draw);
      time += 0.012;

      if (heroMenuLockedRef.current) {
        pointer.hovering = false;
        pointer.tx = center.x;
        pointer.ty = center.y;
        context.clearRect(0, 0, width, height);
        return;
      }

      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      context.clearRect(0, 0, width, height);

      const influenceRadius = Math.min(220, Math.max(150, width * 0.2));
      const isIdle = !pointer.hovering;
      if (isIdle && time >= idlePulseRef.nextShiftAt) {
        idlePulseRef.x = width * (0.14 + Math.random() * 0.72);
        idlePulseRef.y = height * (0.2 + Math.random() * 0.56);
        idlePulseRef.radius = Math.max(150, width * (0.12 + Math.random() * 0.09));
        idlePulseRef.targetStrength = 0.22 + Math.random() * 0.2;
        idlePulseRef.nextShiftAt = time + 0.85 + Math.random() * 1.35;
      }
      if (!isIdle) {
        idlePulseRef.targetStrength = 0;
      }
      idlePulseRef.strength += (idlePulseRef.targetStrength - idlePulseRef.strength) * (isIdle ? 0.05 : 0.12);
      const pulseCenterX = idlePulseRef.x;
      const pulseCenterY = idlePulseRef.y;
      const pulseRadius = idlePulseRef.radius;

      for (const point of points) {
        const dx = pointer.x - point.originX;
        const dy = pointer.y - point.originY;
        const distance = Math.hypot(dx, dy);
        const pull = Math.max(0, 1 - distance / influenceRadius);
        const easedPull = pull * pull * (3 - 2 * pull);
        const pulseDistance = Math.hypot(point.originX - pulseCenterX, point.originY - pulseCenterY);
        const pulseStrength = Math.max(0, 1 - pulseDistance / pulseRadius) * idlePulseRef.strength;
        const wave = Math.sin(time + point.phase) * 1.1;
        const angle = Math.atan2(dy, dx) + Math.PI / 2;

        const targetX =
          point.originX +
          dx * easedPull * 0.24 +
          Math.cos(angle) * easedPull * 7 +
          Math.sin(time * 0.55 + point.originX * 0.015) * 0.8;
        const targetY =
          point.originY +
          dy * easedPull * 0.24 +
          Math.sin(angle) * easedPull * 7 +
          Math.cos(time * 0.5 + point.originY * 0.014) * 0.8;

        point.vx += (targetX - point.x) * 0.12;
        point.vy += (targetY - point.y) * 0.12;
        point.vx *= 0.76;
        point.vy *= 0.76;
        point.x += point.vx;
        point.y += point.vy;

        const alpha =
          easedPull > 0.05
            ? 0.12 + easedPull * 0.46 + pulseStrength * 0.12 + wave * 0.02
            : 0.06 + point.brightness * 0.08 + pulseStrength * 0.08 + wave * 0.014;
        const radius =
          easedPull > 0.05
            ? (0.9 + easedPull * 1.9 + pulseStrength * 0.38) * (0.92 + point.brightness * 0.26)
            : 0.58 + point.brightness * 0.6 + pulseStrength * 0.18;

        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context.fillStyle =
          easedPull > 0.05
            ? `rgba(255,255,255,${Math.min(0.72, alpha)})`
            : `rgba(24,24,24,${Math.min(0.22, alpha)})`;
        context.fill();
      }

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];
        const dx = pointer.x - point.originX;
        const dy = pointer.y - point.originY;
        const distance = Math.hypot(dx, dy);
        const pull = Math.max(0, 1 - distance / influenceRadius);
        const pulseDistance = Math.hypot(point.originX - pulseCenterX, point.originY - pulseCenterY);
        const pulseStrength = Math.max(0, 1 - pulseDistance / pulseRadius) * idlePulseRef.strength;
        if (pull < 0.22) continue;

        if (index + 1 < points.length && points[index + 1].originY === point.originY) {
          const neighbor = points[index + 1];
          const ndx = pointer.x - neighbor.originX;
          const ndy = pointer.y - neighbor.originY;
          const neighborPull = Math.max(0, 1 - Math.hypot(ndx, ndy) / influenceRadius);
          if (neighborPull > 0.14) {
            const alpha = Math.min(pull, neighborPull) * (0.24 + pulseStrength * 0.08);
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(neighbor.x, neighbor.y);
            context.strokeStyle = pulseStrength > 0.02 ? `rgba(24,24,24,${alpha * 0.9})` : `rgba(255,255,255,${alpha})`;
            context.lineWidth = 0.55;
            context.stroke();
          }
        }

        if (index + columns < points.length) {
          const neighbor = points[index + columns];
          const ndx = pointer.x - neighbor.originX;
          const ndy = pointer.y - neighbor.originY;
          const neighborPull = Math.max(0, 1 - Math.hypot(ndx, ndy) / influenceRadius);
          if (neighborPull > 0.14) {
            const alpha = Math.min(pull, neighborPull) * (0.24 + pulseStrength * 0.08);
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(neighbor.x, neighbor.y);
            context.strokeStyle = pulseStrength > 0.02 ? `rgba(24,24,24,${alpha * 0.9})` : `rgba(255,255,255,${alpha})`;
            context.lineWidth = 0.55;
            context.stroke();
          }
        }
      }
    };

    buildGrid();
    draw();

    surface.addEventListener("mousemove", handleMove, { passive: true });
    surface.addEventListener("mouseenter", handleMove, { passive: true });
    surface.addEventListener("mouseleave", handleLeave);
    surface.addEventListener("touchstart", handleMove, { passive: true });
    surface.addEventListener("touchmove", handleMove, { passive: true });
    surface.addEventListener("touchend", handleLeave, { passive: true });
    window.addEventListener("resize", buildGrid);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      surface.removeEventListener("mousemove", handleMove);
      surface.removeEventListener("mouseenter", handleMove);
      surface.removeEventListener("mouseleave", handleLeave);
      surface.removeEventListener("touchstart", handleMove);
      surface.removeEventListener("touchmove", handleMove);
      surface.removeEventListener("touchend", handleLeave);
      window.removeEventListener("resize", buildGrid);
    };
  }, []);

  const isPointerInsideHero = (x, y) => {
    if (x == null || y == null || !heroSurfaceRef.current) return false;
    const rect = heroSurfaceRef.current.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  const handlePointerMove = (event) => {
    if (heroHoverLockedRef.current || heroIsStaticRef.current) {
      if (pointerRef.current.active) {
        handlePointerLeave();
      }
      return;
    }

    const clientX = event.clientX || event.touches?.[0]?.clientX;
    const clientY = event.clientY || event.touches?.[0]?.clientY;

    if (clientX == null || clientY == null) return;

    const now = typeof event.timeStamp === "number" ? event.timeStamp : lastPointerRef.current.time || 0;
    const last = lastPointerRef.current;
    const dx = clientX - last.x;
    const dy = clientY - last.y;
    const dt = Math.max(16, now - last.time);
    const speed = Math.min(Math.hypot(dx, dy) / dt, 1.8);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const stretch = 1 + speed * 0.9;
    const squash = Math.max(0.65, 1 - speed * 0.32);
    const radius = speed > 0.35 ? "42% 58% 60% 40% / 42% 42% 58% 58%" : "9999px";
    const isHoverStart = !pointerRef.current.active;

    if (isHoverStart) {
      hoverImageIndexRef.current = (hoverImageIndexRef.current + 1) % heroHoverImages.length;
      setActiveRevealImage(heroHoverImages[hoverImageIndexRef.current]);
    }

    pointerRef.current = {
      x: clientX,
      y: clientY,
      active: true,
    };

    pointerMotionRef.current = {
      angle,
      stretch,
      squash,
      radius,
    };

    lastPointerRef.current = { x: clientX, y: clientY, time: now };
    if (!pointerFrameRef.current) {
      pointerLastFrameTimeRef.current = now;
      pointerFrameRef.current = window.requestAnimationFrame(renderPointerFrame);
    }
  };

  const handlePointerLeave = () => {
    pointerRef.current = { ...pointerRef.current, active: false };
    pointerMotionRef.current = {
      angle: 0,
      stretch: 1,
      squash: 1,
      radius: "9999px",
    };
    if (!pointerFrameRef.current) {
      pointerFrameRef.current = window.requestAnimationFrame(renderPointerFrame);
    }
  };

  const handleTripleClick = (event) => {
    const now = typeof event.timeStamp === "number" ? event.timeStamp : clickHistoryRef.current.at(-1) || 0;
    clickHistoryRef.current = [...clickHistoryRef.current.filter((time) => now - time < 420), now];

    if (clickHistoryRef.current.length < 3) return;

    clickHistoryRef.current = [];

    const clientX = event.clientX || event.touches?.[0]?.clientX || pointerRef.current.x;
    const clientY = event.clientY || event.touches?.[0]?.clientY || pointerRef.current.y;
    const id = now;

    setRipples((current) => [...current, { id, x: clientX, y: clientY }]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((ripple) => ripple.id !== id));
    }, 1300);
  };

  const handleHeroTouchEnd = (event) => {
    handleTripleClick(event);
    handlePointerLeave();
  };

  function renderPointerFrame(time) {
    const pointer = pointerRef.current;
    const pointerMotion = pointerMotionRef.current;
    const heroIsStatic = heroIsStaticRef.current;
    const heroHoverLocked = heroHoverLockedRef.current;
    const isActive = pointer.active && !heroIsStatic && !heroHoverLocked;

    if (!isActive) {
      if (revealImageRef.current) {
        revealImageRef.current.style.opacity = "0";
      }
      if (innerRingRef.current) {
        innerRingRef.current.style.opacity = "0";
      }
      if (outerRingRef.current) {
        outerRingRef.current.style.opacity = "0";
      }
      hoverPhaseRef.current = 0;
      pointerLastFrameTimeRef.current = 0;
      pointerFrameRef.current = 0;
      return;
    }

    const delta = pointerLastFrameTimeRef.current ? time - pointerLastFrameTimeRef.current : 16;
    pointerLastFrameTimeRef.current = time;
    hoverPhaseRef.current += delta * 0.0022;
    const hoverPhase = hoverPhaseRef.current;
    const hoverMaskImage = `radial-gradient(circle ${
      196 + Math.sin(hoverPhase * 1.1) * 24
    }px at ${pointer.x + Math.cos(hoverPhase * 1.7) * 18}px ${
      pointer.y + Math.sin(hoverPhase * 1.45) * 14
    }px, black 0%, black 58%, transparent 100%),
      radial-gradient(circle ${142 + Math.cos(hoverPhase * 1.6) * 18}px at ${
        pointer.x - 64 + Math.sin(hoverPhase * 1.3) * 28
      }px ${pointer.y - 42 + Math.cos(hoverPhase * 1.9) * 22}px, black 10%, rgba(0,0,0,0.94) 54%, transparent 100%),
      radial-gradient(circle ${122 + Math.sin(hoverPhase * 2) * 16}px at ${
        pointer.x + 74 + Math.cos(hoverPhase * 1.4) * 26
      }px ${pointer.y + 48 + Math.sin(hoverPhase * 1.8) * 20}px, black 4%, rgba(0,0,0,0.88) 52%, transparent 100%)`;

    if (revealImageRef.current) {
      revealImageRef.current.style.opacity = "1";
      revealImageRef.current.style.WebkitMaskImage = hoverMaskImage;
      revealImageRef.current.style.maskImage = hoverMaskImage;
    }

    if (innerRingRef.current) {
      innerRingRef.current.style.opacity = "1";
      innerRingRef.current.style.left = `${pointer.x - 14.28}px`;
      innerRingRef.current.style.top = `${pointer.y - 14.28}px`;
      innerRingRef.current.style.borderRadius = pointerMotion.radius;
      innerRingRef.current.style.transform = `rotate(${pointerMotion.angle}deg) scaleX(${pointerMotion.stretch}) scaleY(${pointerMotion.squash})`;
    }

    if (outerRingRef.current) {
      outerRingRef.current.style.opacity = "1";
      outerRingRef.current.style.left = `${pointer.x - 71.4}px`;
      outerRingRef.current.style.top = `${pointer.y - 71.4}px`;
      outerRingRef.current.style.borderRadius = pointerMotion.radius;
      outerRingRef.current.style.transform = `rotate(${pointerMotion.angle}deg) scaleX(${1 + (pointerMotion.stretch - 1) * 0.45}) scaleY(${1 - (1 - pointerMotion.squash) * 0.45})`;
    }

    pointerFrameRef.current = window.requestAnimationFrame(renderPointerFrame);
  }

  useEffect(() => {
    heroMenuOpenRef.current = heroMenuOpen;
  }, [heroMenuOpen]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const roundTo = (value, precision = 1000) => Math.round(value * precision) / precision;

    const applyIfChanged = (target, property, nextValue, stateKey) => {
      if (!target) return;
      if (heroRenderStateRef.current[stateKey] === nextValue) return;
      heroRenderStateRef.current[stateKey] = nextValue;
      target.style[property] = nextValue;
    };

    const updateHeroFrame = () => {
      scrollFrameRef.current = 0;

      const viewportHeight = window.innerHeight || 1;
      const rawHeroProgress = Math.min(Math.max(scrollTargetRef.current / (viewportHeight * 1.9), 0), 1);
      const heroProgress = rawHeroProgress < 0.86 ? rawHeroProgress / 0.86 : 1;
      const quantizedHeroProgress = roundTo(heroProgress, 320);

      if (
        heroRenderStateRef.current.heroProgress === quantizedHeroProgress &&
        isScrollingRef.current
      ) {
        return;
      }

      heroRenderStateRef.current.heroProgress = quantizedHeroProgress;
      const heroMotionProgress = heroProgress * heroProgress * (3 - 2 * heroProgress);
      const heroScale = roundTo(1 - heroMotionProgress * 0.46, 1000);
      const heroRotateX = roundTo(heroMotionProgress * 6, 100);
      const heroBorderRadius = roundTo(28 + heroMotionProgress * 52, 10);
      const heroShadowOpacity = roundTo(0.22 - heroMotionProgress * 0.08, 100);
      const heroBlur = roundTo(heroMotionProgress * 2.4, 100);
      const heroBrightness = roundTo(1 - heroMotionProgress * 0.06, 1000);
      const heroHoverLocked = heroProgress >= 0.21;
      const heroIsStatic = heroHoverLocked;
      const heroMenuLocked = heroProgress >= 0.25;
      const marqueeProgress = Math.min(Math.max(heroProgress / 0.62, 0), 1);
      const marqueeOpacity = roundTo(marqueeProgress * 0.97, 1000);
      const marqueeOffset = roundTo((1 - marqueeProgress) * 62, 10);
      const marqueeGap = roundTo((1 - marqueeProgress) * 68, 10);
      const headerReveal = roundTo(Math.min(Math.max((heroProgress - 0.82) / 0.18, 0), 1), 1000);
      const wasHoverLocked = heroHoverPreviouslyLockedRef.current;

      heroProgressRef.current = heroProgress;
      heroIsStaticRef.current = heroIsStatic;
      heroHoverLockedRef.current = heroHoverLocked;
      heroHoverPreviouslyLockedRef.current = heroHoverLocked;
      heroMenuLockedRef.current = heroMenuLocked;

      if (heroSurfaceRef.current) {
        applyIfChanged(
          heroSurfaceRef.current,
          "transform",
          `translate3d(0,0,0) scale(${heroScale}) rotateX(${heroRotateX}deg)`,
          "heroTransform"
        );
        applyIfChanged(heroSurfaceRef.current, "borderRadius", `${heroBorderRadius}px`, "heroBorderRadius");
        applyIfChanged(
          heroSurfaceRef.current,
          "boxShadow",
          `0 30px 80px rgba(0,0,0,${Math.max(0.08, heroShadowOpacity)})`,
          "heroBoxShadow"
        );
        applyIfChanged(
          heroSurfaceRef.current,
          "filter",
          `blur(${heroBlur}px) brightness(${heroBrightness})`,
          "heroFilter"
        );
      }

      if (heroGridCanvasRef.current) {
        applyIfChanged(
          heroGridCanvasRef.current,
          "opacity",
          heroMenuLocked ? "0" : "1",
          "heroGridCanvasOpacity"
        );
      }

      const enableCustomCursor = heroProgress >= 0.995;
      cursorEnabledRef.current = enableCustomCursor;
      if (customCursorRef.current) {
        applyIfChanged(
          customCursorRef.current,
          "opacity",
          enableCustomCursor ? "1" : "0",
          "customCursorOpacity"
        );
      }
      document.body.style.cursor = enableCustomCursor ? "none" : "auto";

      if (headerRef.current) {
        applyIfChanged(headerRef.current, "opacity", `${headerReveal}`, "headerOpacity");
        applyIfChanged(headerRef.current, "transform", `translateY(${(1 - headerReveal) * -16}px)`, "headerTransform");
        applyIfChanged(headerRef.current, "pointerEvents", headerReveal > 0.02 ? "auto" : "none", "headerPointerEvents");
      }

      if (heroLogoRef.current) {
        applyIfChanged(heroLogoRef.current, "opacity", headerReveal > 0 ? "0" : "1", "logoOpacity");
        applyIfChanged(
          heroLogoRef.current,
          "transform",
          `translateY(${headerReveal > 0 ? -10 : 0}px) scale(${headerReveal > 0 ? 0.96 : 1})`,
          "logoTransform"
        );
      }

      if (heroMenuWrapRef.current) {
        applyIfChanged(heroMenuWrapRef.current, "opacity", headerReveal > 0 ? "0" : "1", "menuWrapOpacity");
        applyIfChanged(
          heroMenuWrapRef.current,
          "transform",
          `translateY(${headerReveal > 0 ? -10 : 0}px) scale(${headerReveal > 0 ? 0.96 : 1})`,
          "menuWrapTransform"
        );
        applyIfChanged(
          heroMenuWrapRef.current,
          "pointerEvents",
          headerReveal > 0 || heroMenuLocked ? "none" : "auto",
          "menuWrapPointerEvents"
        );
      }

      if (heroMenuButtonRef.current) {
        if (heroRenderStateRef.current.menuButtonDisabled !== heroMenuLocked) {
          heroRenderStateRef.current.menuButtonDisabled = heroMenuLocked;
          heroMenuButtonRef.current.disabled = heroMenuLocked;
        }
        applyIfChanged(heroMenuButtonRef.current, "opacity", heroMenuLocked ? "0.45" : "1", "menuButtonOpacity");
        applyIfChanged(heroMenuButtonRef.current, "cursor", heroMenuLocked ? "default" : "pointer", "menuButtonCursor");
      }

      if (topMarqueeRef.current) {
        applyIfChanged(topMarqueeRef.current, "opacity", `${marqueeOpacity}`, "topMarqueeOpacity");
        applyIfChanged(
          topMarqueeRef.current,
          "transform",
          `translateX(calc(-${marqueeOffset}vw - ${marqueeGap * 0.35}vw)) scale(${1 + marqueeProgress * 0.12})`,
          "topMarqueeTransform"
        );
      }

      if (bottomMarqueeRef.current) {
        applyIfChanged(bottomMarqueeRef.current, "opacity", `${marqueeOpacity * 0.82}`, "bottomMarqueeOpacity");
        applyIfChanged(
          bottomMarqueeRef.current,
          "transform",
          `translateX(calc(${marqueeOffset}vw + ${marqueeGap * 0.35}vw)) scale(${1 + marqueeProgress * 0.12})`,
          "bottomMarqueeTransform"
        );
      }

      if (heroIsStatic || heroHoverLocked) {
        pointerRef.current = { ...pointerRef.current, active: false };
        if (!pointerFrameRef.current) {
          pointerFrameRef.current = window.requestAnimationFrame(renderPointerFrame);
        }
      } else if (wasHoverLocked) {
        const { x, y, time } = lastPointerRef.current;
        if (isPointerInsideHero(x, y)) {
          hoverImageIndexRef.current = (hoverImageIndexRef.current + 1) % heroHoverImages.length;
          setActiveRevealImage(heroHoverImages[hoverImageIndexRef.current]);
          pointerRef.current = { x, y, active: true };
          if (!pointerFrameRef.current) {
            pointerLastFrameTimeRef.current = time || lastPointerRef.current.time || 0;
            pointerFrameRef.current = window.requestAnimationFrame(renderPointerFrame);
          }
        }
      }

      if (heroIsStatic) {
        setRipples([]);
      }

      if (heroMenuLocked && headerReveal <= 0 && heroMenuOpenRef.current) {
        setHeroMenuOpen(false);
      }
    };

    const scheduleHeroFrame = () => {
      if (!scrollFrameRef.current) {
        scrollFrameRef.current = window.requestAnimationFrame(updateHeroFrame);
      }
    };

    const onScroll = () => {
      scrollTargetRef.current = window.scrollY || 0;
      isScrollingRef.current = true;
      scheduleHeroFrame();
      if (scrollStopTimeoutRef.current) {
        window.clearTimeout(scrollStopTimeoutRef.current);
      }
      scrollStopTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
        scheduleHeroFrame();
      }, 140);
    };

    scrollTargetRef.current = window.scrollY || 0;
    updateHeroFrame();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollStopTimeoutRef.current) {
        window.clearTimeout(scrollStopTimeoutRef.current);
      }
      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
      if (pointerFrameRef.current) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }
      document.body.style.cursor = "auto";
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const scrollToAboutSection = (event) => {
    event.preventDefault();
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;

    const headerOffset = window.innerWidth >= 768 ? 148 : 112;
    const aboutShell = aboutSection.querySelector(".abt-shell");
    const sectionTop = (aboutShell || aboutSection).getBoundingClientRect().top + window.scrollY;
    const isMobileAboutLayout = window.innerWidth <= 900;
    const shellScrollable = aboutShell
      ? Math.max(aboutShell.offsetHeight - window.innerHeight, 0)
      : 0;
    const firstLayerProgress = 0.34;
    const firstLayerOffset = isMobileAboutLayout ? 0 : shellScrollable * firstLayerProgress;

    window.scrollTo({
      top: Math.max(0, sectionTop + firstLayerOffset - headerOffset),
      behavior: "smooth",
    });
  };

  const scrollToHomeSection = (event) => {
    event.preventDefault();
    setHeroMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#c0c0c0] font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@400;700&family=Inter:wght@500;600&display=swap');

        @font-face {
          font-family: 'Alphacorsa Personal Use';
          src: url('${alphacorsaFont}') format('truetype');
          font-style: italic;
          font-weight: 400;
        }

        @font-face {
          font-family: 'Marquee ExtraLight Regular';
          src: url('${marqueeExtraLightFont}') format('opentype');
          font-style: normal;
          font-weight: 400;
        }

        html,
        body {
          overscroll-behavior: none;
        }

        .noise {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 100;
          opacity: 0.04;
          background-image: url('https://grainy-gradients.vercel.app/noise.svg');
        }

        body,
        a,
        button,
        [role="button"] {
          cursor: auto;
        }

        @keyframes heroMarqueeLeft {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-33.333%);
          }
        }

        @keyframes heroMarqueeRight {
          from {
            transform: translateX(-33.333%);
          }

          to {
            transform: translateX(0);
          }
        }

        .hero-grid-canvas {
          position: absolute;
          inset: 0;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: block;
          pointer-events: none;
          opacity: 1;
          transition: opacity 180ms ease-out;
        }

        .hero-toggle {
          position: relative;
          width: 40px;
          height: 40px;
          cursor: pointer;
          transition: transform 0.5s ease, opacity 0.12s ease-out;
        }

        .hero-toggle__bar {
          position: absolute;
          left: 50%;
          width: 100%;
          height: 4px;
          background-color: rgba(0, 0, 0, 0.48);
          border-radius: 999px;
          transition: transform 0.5s ease, width 0.5s ease, opacity 0.5s ease, background-color 0.3s ease;
          transform: translateX(-50%);
        }

        .hero-toggle__bar--top {
          transform: translateX(-50%) translateY(-10px);
        }

        .hero-toggle__bar--mid {
          transition-duration: 0.8s;
        }

        .hero-toggle__bar--bottom {
          transform: translateX(-50%) translateY(10px);
        }

        .hero-toggle__bar--short {
          width: 70%;
        }

        .hero-toggle.is-open {
          transform: rotate(180deg);
        }

        .hero-toggle.is-open .hero-toggle__bar--mid {
          transform: translateX(-50%) scaleX(0);
          opacity: 0;
          transition-duration: 0.5s;
        }

        .hero-toggle.is-open .hero-toggle__bar--top {
          width: 100%;
          transform: translateX(-50%) translateY(0) rotate(45deg);
        }

        .hero-toggle.is-open .hero-toggle__bar--bottom {
          width: 100%;
          transform: translateX(-50%) translateY(0) rotate(-45deg);
        }
      `}</style>

      <div className="noise" />
      <img
        ref={customCursorRef}
        src="/mouse.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-8 w-8 select-none object-contain md:block"
        style={{
          opacity: 0,
          transform: "translate3d(-100px,-100px,0)",
          willChange: "transform, opacity",
          transition: "opacity 140ms ease-out",
        }}
      />

      <header
        ref={headerRef}
        className="fixed left-0 top-0 z-50 w-full p-3 transition-[opacity,transform] duration-500 md:p-4"
        style={{ opacity: 0, transform: "translateY(-16px)", pointerEvents: "none" }}
      >
        <div className="relative mx-auto max-w-6xl rounded-[20px] border border-white/35 bg-white/14 shadow-[0_16px_48px_rgba(0,0,0,0.12)] backdrop-blur-md md:rounded-[24px]">
          <div className="pointer-events-auto flex flex-col gap-2.5 p-3.5 md:gap-4 md:p-5">
            <div className="flex items-center justify-between gap-3 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4">
              <button
                type="button"
                onClick={scrollToHomeSection}
                className="m-0 ml-2 border-0 bg-transparent p-0 text-left text-[clamp(14px,3vw,22px)] italic leading-[0.92] tracking-[0.03em] text-black/45 transition-colors duration-300 hover:text-black md:ml-3 md:justify-self-start"
                style={{ fontFamily: '"Alphacorsa Personal Use", "Times New Roman", Georgia, serif' }}
              >
                <span className="block text-[1.18em]">Lakvin</span>
                <span className="block">Thewnuja</span>
              </button>
              <nav className="hidden flex-wrap justify-center gap-1 text-[10px] uppercase tracking-[0.2em] text-black/45 md:flex md:gap-1.5 md:text-[11px] md:tracking-[0.24em]">
              <a
                href="#about"
                className="rounded-full px-3 py-1 transition-[color,transform] duration-300 ease-out hover:-translate-y-0.5"
                style={{ color: hoveredHeaderItem === "about-me" ? "#000B8D" : "rgba(0,0,0,0.45)" }}
                onMouseEnter={() => setHoveredHeaderItem("about-me")}
                onMouseLeave={() => setHoveredHeaderItem(null)}
                onClick={scrollToAboutSection}
              >
                About
              </a>
              <a
                href="#work"
                className="rounded-full px-3 py-1 transition-[color,transform] duration-300 ease-out hover:-translate-y-0.5"
                style={{ color: hoveredHeaderItem === "work" ? "#000B8D" : "rgba(0,0,0,0.45)" }}
                onMouseEnter={() => setHoveredHeaderItem("work")}
                onMouseLeave={() => setHoveredHeaderItem(null)}
              >
                Work
              </a>
              <a
                href="#contact"
                className="rounded-full px-3 py-1 transition-[color,transform] duration-300 ease-out hover:-translate-y-0.5"
                style={{ color: hoveredHeaderItem === "contact" ? "#000B8D" : "rgba(0,0,0,0.45)" }}
                onMouseEnter={() => setHoveredHeaderItem("contact")}
                onMouseLeave={() => setHoveredHeaderItem(null)}
              >
                Contact
              </a>
              </nav>
              <button
                type="button"
                aria-label="Toggle navigation"
                aria-expanded={heroMenuOpen}
                onClick={() => setHeroMenuOpen((current) => !current)}
                className={`hero-toggle md:hidden ${heroMenuOpen ? "is-open" : ""}`}
              >
                <span className="hero-toggle__bar hero-toggle__bar--top hero-toggle__bar--short" />
                <span className="hero-toggle__bar hero-toggle__bar--mid" />
                <span className="hero-toggle__bar hero-toggle__bar--bottom hero-toggle__bar--short" />
              </button>
              <div aria-hidden="true" className="hidden md:block md:justify-self-end md:w-[156px]" />
            </div>
          </div>
        </div>
      </header>

      <section className="relative h-[240vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center overflow-hidden px-[6vw]">
            <div
              ref={topMarqueeRef}
              className="relative w-full overflow-hidden"
              style={{ opacity: 0, transform: "translateX(-62vw) scale(1)", transformOrigin: "center center", willChange: "transform, opacity" }}
            >
              <div
                className="flex w-max whitespace-nowrap text-[clamp(56px,10vw,180px)] font-bold uppercase leading-[0.9] tracking-normal text-white/68"
                style={{
                  fontFamily: '"Averia Serif Libre", serif',
                  animation: "heroMarqueeLeft 24s linear infinite",
                  textShadow: "0 22px 40px rgba(0,0,0,0.12)",
                }}
              >
                <span className="pr-12">- Be The Difference</span>
                <span className="pr-12">- Be The Difference</span>
                <span className="pr-12">- Be The Difference</span>
              </div>
            </div>

            <div
              ref={bottomMarqueeRef}
              className="relative mt-2 w-full overflow-hidden"
              style={{ opacity: 0, transform: "translateX(62vw) scale(1)", transformOrigin: "center center", willChange: "transform, opacity" }}
            >
              <div
                className="flex w-max whitespace-nowrap text-[clamp(56px,10vw,180px)] font-bold uppercase leading-[0.9] tracking-normal text-white/54"
                style={{
                  fontFamily: '"Averia Serif Libre", serif',
                  animation: "heroMarqueeRight 28s linear infinite",
                  textShadow: "0 20px 34px rgba(0,0,0,0.1)",
                }}
              >
                <span className="pr-12">- Be The Difference - Be The Difference - Be The Difference</span>
                <span className="pr-12">- Believe In The Difference - Believe In The Difference - Believe In The Difference</span>
              </div>
            </div>
          </div>

          <div
            ref={heroSurfaceRef}
            className="relative z-[5] h-full w-full overflow-hidden bg-[#c0c0c0]"
            style={{
              transform: "translate3d(0,0,0) scale(1) rotateX(0deg)",
              transformOrigin: "center center",
              borderRadius: "28px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.22)",
              filter: "blur(0px) brightness(1)",
              willChange: "transform, border-radius, box-shadow, filter",
              backfaceVisibility: "hidden",
              contain: "layout paint style",
            }}
            onClick={handleTripleClick}
            onTouchEnd={handleHeroTouchEnd}
            onMouseEnter={handlePointerMove}
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
            onTouchStart={handlePointerMove}
            onTouchMove={handlePointerMove}
          >
            <div className="pointer-events-none absolute left-4 top-4 z-[18] flex md:left-10 md:top-10">
              <div
                ref={heroLogoRef}
                className="text-[clamp(16px,3.4vw,34px)] italic leading-[0.94] tracking-[0.03em] text-black/48"
                style={{
                  fontFamily: '"Alphacorsa Personal Use", "Times New Roman", Georgia, serif',
                  opacity: 1,
                  transform: "translateY(0px) scale(1)",
                  transition: "opacity 120ms ease-out, transform 120ms ease-out",
                  willChange: "transform, opacity",
                }}
              >
                <span className="block text-[1.18em]">Lakvin</span>
                <span className="block">Thewnuja</span>
              </div>
            </div>

            <div
              ref={heroMenuWrapRef}
              className="absolute right-4 top-4 z-[18] md:right-10 md:top-10"
              style={{
                opacity: 1,
                transform: "translateY(0px) scale(1)",
                transition: "opacity 120ms ease-out, transform 120ms ease-out",
                pointerEvents: "auto",
                willChange: "transform, opacity",
              }}
            >
              <button
                ref={heroMenuButtonRef}
                type="button"
                aria-label="Open navigation"
                aria-expanded={heroMenuOpen}
                onClick={() => {
                  if (heroMenuLockedRef.current) return;
                  setHeroMenuOpen((current) => !current);
                }}
                className={`hero-toggle ${heroMenuOpen ? "is-open" : ""}`}
              >
                <span className="hero-toggle__bar hero-toggle__bar--top hero-toggle__bar--short" />
                <span className="hero-toggle__bar hero-toggle__bar--mid" />
                <span className="hero-toggle__bar hero-toggle__bar--bottom hero-toggle__bar--short" />
              </button>
            </div>

            <div
              className="pointer-events-none absolute bottom-3 right-3 z-[18] text-[10px] italic leading-none tracking-[0.03em] text-black/45 md:bottom-5 md:right-6 md:text-[11px]"
              style={{ fontFamily: '"Alphacorsa Personal Use", "Times New Roman", Georgia, serif' }}
            >
              92
            </div>

            <img
              className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-cover"
              src={backgroundImage}
              alt="Base image"
            />

            <canvas ref={heroGridCanvasRef} className="hero-grid-canvas" aria-hidden="true" />

            <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(255,255,255,0.06),rgba(0,0,0,0.08))]" />
            <img
              ref={revealImageRef}
              className="pointer-events-none absolute inset-0 z-[3] h-full w-full select-none object-cover transition-opacity duration-300 ease-out"
              src={activeRevealImage}
              alt="Reveal image"
              style={{
                opacity: 0,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskComposite: "source-over",
                maskComposite: "add",
                willChange: "opacity, mask-image",
              }}
            />
            {ripples.map((ripple) => (
              <RippleReveal
                key={ripple.id}
                ripple={ripple}
                image={activeRevealImage}
                onDone={() => setRipples((current) => current.filter((item) => item.id !== ripple.id))}
              />
            ))}

            <div
              ref={innerRingRef}
              className="pointer-events-none absolute z-[6] border border-white/80 opacity-0 transition-[opacity,border-radius,transform] duration-150"
              style={{
                left: -9999,
                top: -9999,
                width: 28.56,
                height: 28.56,
                willChange: "transform, opacity",
              }}
            />
            <div
              ref={outerRingRef}
              className="pointer-events-none absolute z-[6] border border-white/35 opacity-0 transition-[opacity,border-radius,transform] duration-200"
              style={{
                left: -9999,
                top: -9999,
                width: 142.8,
                height: 142.8,
                willChange: "transform, opacity",
              }}
            />

            <div className="absolute inset-0 -z-[10] bg-[#c0c0c0]" />
          </div>
        </div>
      </section>

      <main className="relative z-10 rounded-t-[24px] border border-white/20 bg-transparent px-0 pb-14 pt-0 text-[#161616] shadow-none md:rounded-t-[42px] md:px-6 md:pb-24 md:pt-1">
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </main>

      <div
        className="fixed inset-0 z-[60] bg-black/18 backdrop-blur-[2px] transition-opacity duration-300 ease-out"
        style={{
          opacity: heroMenuOpen ? 1 : 0,
          pointerEvents: heroMenuOpen ? "auto" : "none",
        }}
        onClick={() => setHeroMenuOpen(false)}
      />

      <div
        className="fixed inset-y-0 right-0 z-[61] flex w-[min(88vw,380px)] flex-col border-l border-white/35 bg-white/18 px-5 pb-5 pt-8 shadow-[-24px_0_72px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-[opacity,transform] duration-300 ease-out md:w-[360px] md:px-6 md:pb-6 md:pt-10"
        style={{
          opacity: heroMenuOpen ? 1 : 0,
          transform: heroMenuOpen ? "translateX(0)" : "translateX(108%)",
          pointerEvents: heroMenuOpen ? "auto" : "none",
          visibility: heroMenuOpen ? "visible" : "hidden",
          overflowY: heroMenuOpen ? "auto" : "hidden",
        }}
      >
        <div className="mb-6 mt-[9px] flex items-center justify-between border-b border-white/18 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]/75" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]/75" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#06d6a0]/75" />
          </div>
        </div>

        <nav className="flex flex-1 flex-col items-start gap-3 text-[13px] uppercase tracking-[0.2em] text-black/45 md:text-[15px] md:tracking-[0.24em]">
          <a
            href="#about"
            className="w-full rounded-[18px] border border-transparent px-4 py-3 transition-[color,transform,border-color,background-color] duration-300 ease-out hover:translate-x-1 hover:border-[#000B8D]/14 hover:bg-white/20"
            onMouseEnter={() => setHoveredHeaderItem("hero-about")}
            onMouseLeave={() => setHoveredHeaderItem(null)}
            onClick={(event) => {
              setHeroMenuOpen(false);
              scrollToAboutSection(event);
            }}
            style={{ color: hoveredHeaderItem === "hero-about" ? "#000B8D" : "rgba(0,0,0,0.45)" }}
          >
            About
          </a>
          <a
            href="#work"
            className="w-full rounded-[18px] border border-transparent px-4 py-3 transition-[color,transform,border-color,background-color] duration-300 ease-out hover:translate-x-1 hover:border-[#000B8D]/14 hover:bg-white/20"
            onMouseEnter={() => setHoveredHeaderItem("hero-work")}
            onMouseLeave={() => setHoveredHeaderItem(null)}
            onClick={() => setHeroMenuOpen(false)}
            style={{ color: hoveredHeaderItem === "hero-work" ? "#000B8D" : "rgba(0,0,0,0.45)" }}
          >
            Work
          </a>
          <a
            href="#contact"
            className="w-full rounded-[18px] border border-transparent px-4 py-3 transition-[color,transform,border-color,background-color] duration-300 ease-out hover:translate-x-1 hover:border-[#000B8D]/14 hover:bg-white/20"
            onMouseEnter={() => setHoveredHeaderItem("hero-contact")}
            onMouseLeave={() => setHoveredHeaderItem(null)}
            onClick={() => setHeroMenuOpen(false)}
            style={{ color: hoveredHeaderItem === "hero-contact" ? "#000B8D" : "rgba(0,0,0,0.45)" }}
          >
            Contact
          </a>
        </nav>

        <div className="mt-8 border-t border-white/18 pt-5">
          <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-black/30">Connect</div>
          <div className="flex items-center gap-3">
            <SocialIcon href="https://www.instagram.com/lkvnn7" label="Instagram" icon={Instagram} />
            <SocialIcon href="https://github.com/Lakvin7" label="GitHub" icon={Github} />
            <SocialIcon href="https://www.linkedin.com/in/lakvin-thewnuja" label="LinkedIn" icon={Linkedin} />
            <SocialIcon href={cvDownloadUrl} label="Download CV" icon={FileText} />
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default App;












