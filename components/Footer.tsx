import { FaArrowRightLong, FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const offerings = [
  {
    title: "Websites",
    icon: "🌐",
    highlights: [
      "1-Page Website (simple landing page)",
      "3–5 Page Business Website (Home, Services, About, Contact, Gallery)",
      "Custom Websites with advanced features (bookings, accounts, email marketing, rewards, automations)",
    ],
  },
  {
    title: "Mobile Apps",
    icon: "📱",
    highlights: [
      "Simple App (website-to-app with notifications & reminders)",
      "Business App (customer login, scheduling, SMS/email reminders)",
      "E-Commerce / Food Ordering App (ordering, payments, loyalty, tracking)",
    ],
  },
  {
    title: "Custom Software",
    icon: "⚙️",
    highlights: [
      "Excel Automations (dashboards, payroll, inventory tracking)",
      "Tailored business software solutions",
    ],
  },
  {
    title: "POS Systems & Automation",
    icon: "💳",
    highlights: [
      "Basic POS Software + POS Terminal",
      "Worker + Customer POS Package (customer ordering tablets)",
      "Premium POS + Robotics (custom POS, seating software, 2 service robots, table-side ordering app)",
    ],
  },
  {
    title: "Takeout Restaurant Website",
    icon: "🍽️",
    highlights: [
      "Online ordering, customer accounts, rewards, promo codes, ads, secure sign-in",
      "Scales with your business needs",
    ],
  },
  {
    title: "Trade & Service Business Websites",
    icon: "🛠️",
    highlights: [
      "Booking & scheduling systems that sync with your calendar",
      "Client request forms & automated follow-ups",
      "Lead capture & CRM-style tracking",
      "Service galleries & customer testimonials to build trust",
      "Bilingual support (English & Español) to reach more customers",
    ],
  },
  {
    title: "Add-Ons",
    icon: "🎨",
    highlights: [
      "Branding & logos",
      "Business cards, flyers, brochures, menus",
      "Branded clothing & merchandise",
      "Social media setup & ad campaigns",
      "Photography & promotional videos",
    ],
  },
];

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to us today and let&apos;s discuss how we can help you
          achieve your goals.
        </p>
        <a href="mailto:admin@codecompas.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
            containerClassName="mt-6 md:mt-10 md:w-60"
          />
        </a>
      </div>

      <section id="services" className="mt-20 w-full">
        <div className="flex flex-col items-center text-center">
          <h2 className="heading lg:max-w-[40vw]">Code Compas — What We Offer</h2>
          <p className="text-white-200 md:mt-6 mt-4 max-w-3xl">
            Explore our favorite builds and add-ons, then ask us for a tailored quote.
            Every project starts with a conversation so we can curate the perfect mix for your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 mt-12">
          {offerings.map((category) => (
            <div
              key={category.title}
              className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg shadow-purple-500/20"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
              </div>

              <ul className="flex flex-col gap-3 text-sm text-white/90">
                {category.highlights.map((item) => (
                  <li
                    key={`${category.title}-${item}`}
                    className="flex items-start gap-2 rounded-2xl bg-black/30 p-3"
                  >
                    <span className="mt-1 text-purple">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 text-center text-sm text-white/80">
          <p>👉 All services are bilingual (English &amp; Español).</p>
          <p>👉 Ask us for a custom quote — we tailor every solution to your business.</p>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-br from-purple/20 via-transparent to-transparent p-8 backdrop-blur-sm">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-semibold text-white">Need a custom quote?</h3>
              <p className="text-white-200 text-sm leading-relaxed">
                Reach out to us at{" "}
                <a
                  href="mailto:ask@codecompas.com"
                  className="text-purple underline underline-offset-4"
                >
                  ask@codecompas.com
                </a>
                {" "}or write an email here with your project, web app, website, or idea. We will get back to you within 48 hours.
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
      </section>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2025 Code Compas. All rights reserved.
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
