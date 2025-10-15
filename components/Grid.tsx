import { motion } from "framer-motion";

import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

const Grid = () => {
  const fadeInProps = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  } as const;

  return (
    <section id="about" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-24 -z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 0.45, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-64 w-[36rem] max-w-full rounded-full bg-[radial-gradient(circle_at_center,rgba(108,92,231,0.35),rgba(8,12,26,0))] blur-3xl"
        />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-10 pt-24 text-center sm:pt-28 lg:pt-32">
        <motion.span
          {...fadeInProps}
          className="text-sm font-semibold uppercase tracking-[0.45em] text-[#98A2D7]/80"
        >
          We are Code Compas 🤠
        </motion.span>

        <motion.h2
          {...fadeInProps}
          transition={{ ...fadeInProps.transition, delay: 0.08 }}
          className="mt-6 text-3xl font-semibold text-white [text-wrap:balance] sm:text-4xl md:text-5xl md:leading-tight"
        >
          We build custom apps, websites, and automations. Let us create a digital
          solution that works for you!
        </motion.h2>

        <motion.p
          {...fadeInProps}
          transition={{ ...fadeInProps.transition, delay: 0.16 }}
          className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg"
        >
          Built in Los Angeles, CA and ready for the World 🌎
        </motion.p>

        <motion.p
          {...fadeInProps}
          transition={{ ...fadeInProps.transition, delay: 0.24 }}
          className="mt-3 max-w-2xl text-base text-white/70 sm:text-lg"
        >
          We speak English and Spanish. Helping you win jobs, earn trust, and grow your
          business.
        </motion.p>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 pb-24">
        <BentoGrid className="w-full py-0">
          {gridItems.map((item, i) => (
            <BentoGridItem
              id={item.id}
              key={i}
              title={item.title}
            description={item.description}
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
          />
        ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default Grid;
