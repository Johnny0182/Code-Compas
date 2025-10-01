import { FaArrowRightLong } from "react-icons/fa6";

import MagicButton from "./MagicButton";

export const offerings = [
  {
    title: "Websites",
    icon: "🌐",
    highlights: [
      "Launch fast with a 1-Page Website",
      "Grow your brand with a 3–5 Page Business Site",
      "Custom Websites with booking, accounts, and rewards built-in",
      "Bilingual (English & Español) to reach more customers and clients",
    ],
  },
  {
    title: "Mobile Apps",
    icon: "📱",
    highlights: [
      "Simple App: your website, now in app form with push alerts",
      "Business App with logins, scheduling, and reminders",
      "E-Commerce & Food Ordering App with payments and rewards",
      "Scalable apps built to expand as your business grows",
    ],
  },
  {
    title: "Industry Solutions",
    icon: "🏗️",
    highlights: [
      "Trade & service websites with booking, automated follow-ups, and lead capture. Perfect for busy entrepreneurs who want more clients without the extra work.",
      "Restaurant, e-commerce, and service based websites and apps with integrated online ordering, reservations, and loyalty rewards.",
      "POS systems with worker tablets, customer kiosks, and displays",
      "Premium Robotics package with seating systems, POS systems, and service robots! Ask us for details.",
      "Simple CRM tools to keep track of clients and repeat business",
    ],
  },
  {
    title: "Custom Software & Automations",
    icon: "⚙️",
    highlights: [
      "Excel automations, financial report automations, finance dashboards, and automated payroll/accounting solutions.",
      "Automated invoicing, payments, and client follow-ups. Digital contracts, online verifications, file encryption, and e-signatures.",
      "Employee portals with clock-In systems, staff scheduling, workforce tracking,HR tools, incicdent reporting, automated notifications systems, and team communications.",
    ],
  },
  {
    title: "Add-Ons",
    icon: "🎨",
    highlights: [
      "Custom branding & logo design",
      "Flyers, menus, and marketing print materials",
      "Branded uniforms, clothing, and team merchandise",
      "Social media setup, digital ads, and campaign support",
      "Professional photography & promo video editing",
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="w-full py-20">
      <div className="flex flex-col items-center text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-white/60">
          Code Compas 🤠
        </p>
        <h2 className="heading lg:max-w-[40vw]">Services & Solutions</h2>
        <p className="text-white-200 md:mt-6 mt-4 max-w-3xl">
          Explore our favorite builds and add-ons, then ask us for a tailored
          quote. Every project starts with a conversation so we can make your
          idea come to life! 💻 ✨
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
              <h3 className="text-2xl font-semibold text-white">
                {category.title}
              </h3>
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

      <div className="mt-12 flex flex-col items-center gap-4 text-center text-sm text-white/80">
        <p>👉 All services are bilingual (English &amp; Español).</p>
        <p>
          👉 Ask us for a custom quote — we tailor every solution to your
          business.
        </p>
        <a href="#contact" className="inline-flex">
          <MagicButton
            title="Talk to us about a project"
            icon={<FaArrowRightLong />}
            position="right"
          />
        </a>
      </div>
    </section>
  );
};

export default Services;
