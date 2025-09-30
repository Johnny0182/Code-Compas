import { FaArrowRightLong } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="relative w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="pointer-events-none absolute left-0 -bottom-72 w-full min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="h-full w-full opacity-50"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-16">
        <div className="mx-auto w-full max-w-5xl rounded-3xl border border-white/10 bg-black/60 p-8 shadow-2xl shadow-purple/20 backdrop-blur">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
            <div className="flex flex-col gap-5 text-white/90">
              <p className="text-sm uppercase tracking-[0.35em] text-purple/70">Contact</p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Share your project vision and we&apos;ll reply within 48 hours.
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Reach out at{' '}
                <a
                  href="mailto:ask@codecompas.com"
                  className="text-purple underline underline-offset-4"
                >
                  ask@codecompas.com
                </a>{' '}
                or fill out the form. Tell us about your website, app, POS, or automation idea and we&apos;ll confirm next steps, timeline, and deposit details. If a project isn&apos;t the right fit, we refund deposits immediately.
              </p>
            </div>

            <form
              className="flex flex-col gap-4"
              action="mailto:ask@codecompas.com"
              method="POST"
              encType="text/plain"
            >
              <label className="flex flex-col text-sm text-white/80">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-purple focus:outline-none"
                />
              </label>
              <label className="flex flex-col text-sm text-white/80">
                Subject
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Tell us what you need"
                  className="mt-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-purple focus:outline-none"
                />
              </label>
              <label className="flex flex-col text-sm text-white/80">
                Message
                <textarea
                  name="message"
                  required
                  placeholder="Share details about your project, timeline, and goals"
                  rows={4}
                  className="mt-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-purple focus:outline-none"
                />
              </label>

              <MagicButton
                title="Contact Us for a Quote"
                icon={<FaArrowRightLong />}
                position="right"
                containerClassName="mt-2 w-full"
              />
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 text-center text-sm text-white/70 md:flex-row md:text-left md:text-base">
          <p className="md:font-normal">Copyright © 2025 Code Compas. All rights reserved.</p>

          <div className="flex items-center gap-4 md:gap-3">
            {socialMedia.map((info) => (
              <div
                key={info.id}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-black-300 bg-black-200 bg-opacity-75 backdrop-blur-lg backdrop-filter saturate-180"
              >
                <img src={info.img} alt="social icon" width={20} height={20} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
