import React, { memo, useEffect, useRef } from "react";

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
          width: 150px;
          padding: 0;
          padding-bottom: 3px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transform: rotate(5deg);
          transform-origin: center;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          box-shadow: 0 2px 0 #575757;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background-color: #8d8d8d;
        }

        .contact-submit span {
          display: block;
          padding: 0.75rem 1rem;
          border-radius: 5px;
          border: 2px solid #494a4b;
          background: #e7eaee;
          color: #111111;
        }

        .contact-submit:active {
          transform: translateY(5px);
          padding-bottom: 0;
          outline: 0;
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
        className="relative mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-6 py-8 transition-[opacity,transform,filter] duration-700 ease-out md:min-h-[64vh] md:py-10"
        style={{ opacity: 0, transform: "translateY(34px) scale(0.985)", filter: "blur(10px)" }}
      >
        <div className="w-full max-w-3xl">
          <div
            ref={headingRef}
            className="mb-8 text-center transition-[opacity,transform,filter] duration-700 ease-out"
            style={{ opacity: 0, transform: "translateY(28px)", filter: "blur(10px)" }}
          >
            <h2
              className="text-[clamp(3.2rem,7vw,6.2rem)] uppercase leading-[0.92] tracking-[0.02em]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span className="text-[#111111]">Get In </span>
              <span className="text-[#7a7a7a]">Touch</span>
            </h2>
          </div>

          <div
            ref={introRef}
            className="mx-auto mb-10 max-w-2xl transition-[opacity,transform,filter] delay-100 duration-700 ease-out"
            style={{ opacity: 0, transform: "translateY(28px)", filter: "blur(10px)" }}
          >
            <p
              className="text-left text-[15px] leading-8 tracking-[0.18em] text-black/78"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              For questions, suggestions, or anything else, a message is enough to contact me.
            </p>
          </div>

          <form
            ref={formRef}
            className="space-y-5 transition-[opacity,transform,filter] delay-150 duration-700 ease-out"
            style={{ opacity: 0, transform: "translateY(28px)", filter: "blur(10px)" }}
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <input
                type="text"
                placeholder="Please tell me your name?"
                className="h-14 w-full rounded-[18px] border border-black/15 bg-[#ececec] px-4 text-[15px] tracking-[0.12em] text-black outline-none placeholder:text-black/70 focus:border-[#7a7a7a]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              />
              <input
                type="email"
                placeholder="How can I reply to you (e-mail)? *"
                className="h-14 w-full rounded-[18px] border border-black/15 bg-[#ececec] px-4 text-[15px] tracking-[0.08em] text-black outline-none placeholder:text-black/70 focus:border-[#7a7a7a]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              />
            </div>

            <textarea
              rows={6}
              placeholder="What would you like to talk about? *"
              className="w-full resize-none rounded-[22px] border border-black/15 bg-[#ececec] px-4 py-4 text-[15px] tracking-[0.08em] text-black outline-none placeholder:text-black/70 focus:border-[#7a7a7a]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            />

            <label
              className="flex items-start gap-3 pt-2 text-[12px] leading-6 tracking-[0.14em] text-black/70"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 shrink-0 rounded-none border border-black/30 bg-transparent accent-[#7a7a7a]"
              />
              <span>
                I have taken note of the privacy policy and agree that my information can be used to answer my inquiry by e-mail.
              </span>
            </label>

            <div className="pt-6">
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
