import { FaArrowRightLong, FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const pricingCategories = [
  {
    title: "Websites",
    icon: "🌐",
    packages: [
      {
        name: "1-Page Website",
        price: "$750 – $900",
        description: "Perfect landing page to get online quickly.",
      },
      {
        name: "3–5 Page Business Website",
        price: "$1,500 – $2,500",
        description: "Includes Home, Services, About, Contact, and Gallery pages.",
      },
      {
        name: "Custom Website (1–3 Advanced Features)",
        price: "$5,000 – $8,500",
        description:
          "Booking automation, calendar sync, customer accounts, marketing integrations, file uploads, rewards, and more.",
      },
    ],
    notes: [
      "Maintenance: $250–$400/year",
      "Changes: $100/hr",
    ],
  },
  {
    title: "Mobile Apps",
    icon: "📱",
    packages: [
      {
        name: "Simple App",
        price: "$3,000 – $5,500",
        description:
          "Transforms your website into iOS & Android apps with push notifications and reminders.",
      },
      {
        name: "Business App (Advanced Features)",
        price: "$6,000 – $9,500",
        description:
          "Customer login, scheduling, booking, and automated SMS/email reminders.",
      },
      {
        name: "E-Commerce / Food Ordering App",
        price: "$10,000 – $14,000",
        description:
          "Ordering, cart system, payment processing, loyalty rewards, and real-time order tracking.",
      },
    ],
    notes: ["Maintenance: $250–$500/year depending on system size"],
  },
  {
    title: "Custom Software",
    icon: "⚙️",
    packages: [
      {
        name: "Excel Automation Tools",
        price: "$300 – $1,200",
        description:
          "Automated Excel or Google Sheets dashboards for financial tracking, payroll, reporting, and inventory.",
      },
      {
        name: "Custom Software Projects",
        price: "Starting at $5,000",
        description:
          "Tailored workflow software that goes beyond websites and apps.",
      },
    ],
    notes: ["Changes: $100/hr"],
  },
  {
    title: "POS Systems & Automation",
    icon: "💳",
    packages: [
      {
        name: "Basic POS Software Package",
        price: "$5,000+",
        description:
          "Software for one POS terminal plus on-site physical setup. App connectivity available separately.",
      },
      {
        name: "Worker + Customer POS Package",
        price: "Starting at $15,000",
        description:
          "Worker terminal plus multiple customer ordering tablets—scales with your floor plan.",
      },
      {
        name: "Premium POS + Robotics Package",
        price: "Starting at $30,000",
        description:
          "Custom POS, table management, two service robots, and full website + app integration.",
      },
    ],
    notes: [
      "Maintenance: $350–$500/year",
      "Changes: $100/hr",
      "Market note: Hardware POS machines typically cost $300–$1,500 each. Service robots range $2,000–$4,000 before branding.",
    ],
  },
  {
    title: "Takeout Restaurant Website",
    icon: "🍽️",
    packages: [
      {
        name: "Full Takeout Experience",
        price: "Starting at $2,000",
        description:
          "Online ordering, user accounts, loyalty rewards, promo codes, secure sign-in, and marketing banners.",
      },
    ],
    notes: [
      "Maintenance: $400/year",
      "Transaction Fee: 2.5% per takeout order",
    ],
  },
];

const depositLinkFor = (category: string, packageName: string) => {
  const params = new URLSearchParams({
    category,
    package: packageName,
  });

  return `https://codecompas.com/deposit?${params.toString()}`;
};

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
        <a href="admin@codecompas.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
            containerClassName="mt-6 md:mt-10 md:w-60"
          />
        </a>
      </div>

      <div className="mt-20 w-full">
        <div className="flex flex-col items-center text-center">
          <h2 className="heading lg:max-w-[40vw]">Code Compas Pricing Sheet</h2>
          <p className="text-white-200 md:mt-6 mt-4 max-w-3xl">
            Choose a package to leave a fully refundable deposit. We review every
            request to ensure we&apos;re the right fit—if we can&apos;t approve your
            project, you&apos;ll receive a prompt refund.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 mt-12">
          {pricingCategories.map((category) => (
            <div
              key={category.title}
              className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-2xl font-semibold text-white mt-2">
                    {category.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {category.packages.map((pricing) => (
                  <div
                    key={`${category.title}-${pricing.name}`}
                    className="rounded-2xl border border-white/5 bg-black/40 p-5"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold text-white">
                          {pricing.name}
                        </span>
                        <span className="text-sm text-purple font-semibold">
                          {pricing.price}
                        </span>
                      </div>
                      <p className="text-sm text-white-200 leading-relaxed">
                        {pricing.description}
                      </p>
                    </div>

                    <a
                      href={depositLinkFor(category.title, pricing.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MagicButton
                        title="Leave Deposit"
                        icon={<FaArrowRightLong />}
                        position="right"
                        containerClassName="mt-5 md:w-56"
                      />
                    </a>
                  </div>
                ))}
              </div>

              {category.notes && (
                <ul className="flex flex-col gap-2 text-sm text-white/80">
                  {category.notes.map((note) => (
                    <li key={`${category.title}-${note}`}>{note}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-br from-purple/20 to-transparent p-6 text-sm text-white/80">
          <h3 className="text-lg font-semibold text-white mb-3">
            Why teams choose Code Compas
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Affordable maintenance ranging from $250–$500/year.</li>
            <li>Ownership model—no subscriptions or long-term lock-ins.</li>
            <li>Bilingual experiences across English and Español.</li>
            <li>Flexible pricing that scales with features, hardware, and growth.</li>
          </ul>
        </div>
      </div>

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
