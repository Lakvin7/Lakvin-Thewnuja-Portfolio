import React, { memo, useEffect, useRef } from "react";
import { cvDownloadUrl } from "../../data/portfolioData";

const ContactSection = memo(function ContactSection() {
  const sectionRef = useRef(null);
  const shellRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const shell = shellRef.current;
    const elements = [headingRef.current, introRef.current, formRef.current].filter(Boolean);
    if (!section || !shell || elements.length === 0) return undefined;

    const hiddenStates = [
      { opacity: "0", transform: "translateY(28px)", filter: "blur(10px)" },
      { opacity: "0", transform: "translateY(28px)", filter: "blur(10px)" },
      { opacity: "0", transform: "translateY(28px)", filter: "blur(10px)" },
    ];
    const visibleState = { opacity: "1", transform: "translateY(0px)", filter: "blur(0px)" };
    let isRevealed = false;
    let exitProgress = 0;
    let ticking = false;

    const applyShellState = () => {
      if (!isRevealed) {
        shell.style.opacity = "0";
        shell.style.transform = "translateY(34px) scale(0.985)";
        shell.style.filter = "blur(10px)";
        elements.forEach((element, index) => {
          Object.assign(element.style, hiddenStates[index]);
        });
        return;
      }

      const visibility = 1 - exitProgress;
      shell.style.opacity = `${visibility}`;
      shell.style.transform = `translateY(${exitProgress * 34}px) scale(${1 - exitProgress * 0.02})`;
      shell.style.filter = `blur(${exitProgress * 7}px)`;

      elements.forEach((element, index) => {
        const delay = Math.min(index * 90, 180);
        element.style.transitionDelay = exitProgress > 0.02 ? "0ms" : `${delay}ms`;
        Object.assign(element.style, visibleState);
      });
    };

    const updateExitProgress = () => {
      ticking = false;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, viewportHeight);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const shouldReveal =
        visibleHeight > viewportHeight * 0.18 &&
        rect.bottom > viewportHeight * 0.12 &&
        rect.top < viewportHeight * 0.88;
      const fadeStart = viewportHeight * 0.36;
      const fadeDistance = Math.max(viewportHeight * 0.28, 1);
      exitProgress = Math.max(0, Math.min((fadeStart - rect.bottom) / fadeDistance, 1));
      isRevealed = shouldReveal;
      applyShellState();
    };

    const scheduleExitProgressUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateExitProgress);
    };

    updateExitProgress();
    window.addEventListener("scroll", scheduleExitProgressUpdate, { passive: true });
    window.addEventListener("resize", scheduleExitProgressUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleExitProgressUpdate);
      window.removeEventListener("resize", scheduleExitProgressUpdate);
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative z-20 min-h-[60vh] overflow-hidden px-3 pb-0 pt-12 md:min-h-[64vh] md:px-6 md:pb-0 md:pt-16">
      <style>{`
        .contact-submit {
          width: 100%;
          padding: 0;
          padding-bottom: 0;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          transform: none;
          transform-origin: center;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          box-shadow: 0 2px 0 #575757;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background-color: #8d8d8d;
        }

        .contact-submit span {
          display: block;
          padding: 0.9rem 1rem;
          border-radius: 16px;
          border: 2px solid #494a4b;
          background: #e7eaee;
          color: #111111;
        }

        .contact-submit:active {
          transform: translateY(5px);
          padding-bottom: 0;
          outline: 0;
        }

        .contact-cv-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0.85rem 1.2rem;
          border-radius: 16px;
          border: 1px solid rgba(17, 17, 17, 0.18);
          background: rgba(255, 255, 255, 0.34);
          color: #111111;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-decoration: none;
          text-transform: uppercase;
          transition: transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .contact-cv-link:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 11, 141, 0.28);
          background: rgba(255, 255, 255, 0.5);
        }

        @media (min-width: 768px) {
          .contact-submit {
            width: 150px;
            padding-bottom: 3px;
            border-radius: 5px;
            transform: rotate(5deg);
            font-size: 15px;
            letter-spacing: 0.14em;
          }

          .contact-submit span {
            padding: 0.75rem 1rem;
            border-radius: 5px;
          }

          .contact-cv-link {
            min-height: 52px;
            border-radius: 18px;
            font-size: 14px;
            letter-spacing: 0.14em;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06) 0, transparent 35%),
              radial-gradient(circle at 80% 30%, rgba(255,255,255,0.04) 0, transparent 30%),
              radial-gradient(circle at 50% 80%, rgba(255,255,255,0.03) 0, transparent 35%),
              repeating-linear-gradient(
                90deg,
                rgba(255,255,255,0.03) 0px,
                rgba(255,255,255,0.03) 1px,
                transparent 1px,
                transparent 6px
              )
            `,
          }}
        />
      </div>

      <div
        ref={shellRef}
        className="relative mx-auto flex min-h-[60vh] max-w-5xl items-start justify-center px-4 py-6 transition-[opacity,transform,filter] duration-700 ease-out md:min-h-[64vh] md:items-center md:px-6 md:py-10"
        style={{ opacity: 0, transform: "translateY(34px) scale(0.985)", filter: "blur(10px)" }}
      >
        <div className="w-full max-w-3xl p-0">
          <div
            ref={headingRef}
            className="mb-5 text-left transition-[opacity,transform,filter] duration-700 ease-out md:mb-8 md:text-center"
            data-mobile-reveal="true"
            data-mobile-reveal-delay="0"
            style={{ opacity: 0, transform: "translateY(28px)", filter: "blur(10px)" }}
          >
            <h2
              className="text-[clamp(2.45rem,11vw,5.5rem)] uppercase leading-[0.96] tracking-normal md:text-[clamp(3.2rem,7vw,6.2rem)]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span className="text-[#111111]">Get In </span>
              <span className="text-[#7a7a7a]">Touch</span>
            </h2>
          </div>

          <div
            ref={introRef}
            className="mb-7 max-w-2xl transition-[opacity,transform,filter] delay-100 duration-700 ease-out md:mx-auto md:mb-10"
            data-mobile-reveal="true"
            data-mobile-reveal-delay="80"
            style={{ opacity: 0, transform: "translateY(28px)", filter: "blur(10px)" }}
          >
            <p
              className="text-left text-[13px] leading-6 tracking-[0.12em] text-black/78 md:text-[15px] md:leading-8 md:tracking-[0.18em]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              For questions, suggestions, or anything else, a message is enough to contact me.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-5 md:justify-center">
              <a href={cvDownloadUrl} download="Lakvin-Thewnuja-CV.pdf" target="_blank" rel="noreferrer" className="contact-cv-link">
                Download CV
              </a>
            </div>
          </div>

          <form
            ref={formRef}
            className="space-y-4 transition-[opacity,transform,filter] delay-150 duration-700 ease-out md:space-y-5"
            data-mobile-reveal="true"
            data-mobile-reveal-delay="140"
            style={{ opacity: 0, transform: "translateY(28px)", filter: "blur(10px)" }}
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <input
                type="text"
                placeholder="Please tell me your name?"
                className="h-12 w-full rounded-[16px] border border-black/15 bg-[#ececec] px-4 text-[14px] tracking-[0.06em] text-black outline-none placeholder:text-black/70 focus:border-[#7a7a7a] md:h-14 md:rounded-[18px] md:text-[15px] md:tracking-[0.12em]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              />
              <input
                type="email"
                placeholder="How can I reply to you (e-mail)? *"
                className="h-12 w-full rounded-[16px] border border-black/15 bg-[#ececec] px-4 text-[14px] tracking-[0.05em] text-black outline-none placeholder:text-black/70 focus:border-[#7a7a7a] md:h-14 md:rounded-[18px] md:text-[15px] md:tracking-[0.08em]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              />
            </div>

            <textarea
              rows={6}
              placeholder="What would you like to talk about? *"
              className="min-h-[180px] w-full resize-none rounded-[18px] border border-black/15 bg-[#ececec] px-4 py-4 text-[14px] tracking-[0.05em] text-black outline-none placeholder:text-black/70 focus:border-[#7a7a7a] md:rounded-[22px] md:text-[15px] md:tracking-[0.08em]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            />

            <label
              className="flex items-start gap-3 pt-1 text-[11px] leading-5 tracking-[0.08em] text-black/70 md:pt-2 md:text-[12px] md:leading-6 md:tracking-[0.14em]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 rounded-none border border-black/30 bg-transparent accent-[#7a7a7a] md:mt-1 md:h-5 md:w-5"
              />
              <span>
                I have taken note of the privacy policy and agree that my information can be used to answer my inquiry by e-mail.
              </span>
            </label>

            <div className="pt-4 md:pt-6">
              <button type="submit" className="contact-submit">
                <span className="flex items-center justify-center">Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
});

export default ContactSection;
