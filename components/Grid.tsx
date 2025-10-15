import { gridItems } from "@/data";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

const Grid = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.12,
        ease: "easeOut",
      },
    }),
  };

  const contactItems = gridItems.filter((item) => item.id === 6);

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeInUp}
          custom={0}
          className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#090d2b]/70 px-8 py-16 text-center shadow-[0_40px_120px_-60px_rgba(124,58,237,0.75)] backdrop-blur-xl sm:px-12 lg:px-20"
        >
          <motion.p
            variants={fadeInUp}
            custom={0.5}
            className="text-sm font-medium uppercase tracking-[0.35em] text-white/60"
          >
            We are Code Compas 🤠
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="mt-6 text-3xl font-bold leading-tight text-balance text-white sm:text-4xl md:text-5xl"
          >
            <span className="bg-gradient-to-r from-purple-400 via-white to-purple-200 bg-clip-text text-transparent">
              We build custom apps, websites, and automations. Let us create a digital solution that works for you!
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1.5}
            className="mt-8 text-lg text-white/70 sm:text-xl"
          >
            Built in Los Angeles, CA and ready for the World 🌎
          </motion.p>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg"
          >
            We speak English and Spanish. Helping you win jobs, earn trust, and grow your business.
          </motion.p>
        </motion.div>

        <div className="mt-2">
          <BentoGrid className="w-full max-w-4xl mx-auto">
            {contactItems.map((item) => (
              <BentoGridItem
                id={item.id}
                key={item.id}
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
      </div>
    </section>
  );
};

export default Grid;
