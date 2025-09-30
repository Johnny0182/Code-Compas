import { FaArrowRightLong } from "react-icons/fa6";

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

const Services = () => {
  return (
    <section id="services" className="w-full py-20">
      <div className="flex flex-col items-center text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-white/60">Services</p>
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

      <div className="mt-12 flex flex-col items-center gap-4 text-center text-sm text-white/80">
        <p>👉 All services are bilingual (English &amp; Español).</p>
        <p>👉 Ask us for a custom quote — we tailor every solution to your business.</p>
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
