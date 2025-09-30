import MagicButton from "./MagicButton";
import { FaLocationArrow } from "react-icons/fa6";

const ContactCTA = () => {
  return (
    <section className="py-20">
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital presence to the next level?
        </h2>
        <p className="text-white-200 max-w-2xl">
          Reach out when you are ready to build. Share your idea and we&apos;ll respond with a tailored roadmap in less than two days.
        </p>
        <a href="#contact" className="inline-flex">
          <MagicButton
            title="Start a project conversation"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
    </section>
  );
};

export default ContactCTA;
