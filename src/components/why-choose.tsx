import { Headset, Map, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    text: "Your safety is priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    text: "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    text: "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-[#e8f4f4] px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-display text-3xl text-neutral-900 md:text-4xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-neutral-500">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white p-6 shadow-sm">
              <Icon className="size-7 text-cyan-500" strokeWidth={2.2} />
              <h3 className="mt-5 font-display text-xl text-neutral-900">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
