import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const faqs = [
  {
    question: "Are Sugandhika products herbal?",
    answer:
      "Yes. Our mosquito repellents are made using carefully selected herbal ingredients.",
  },
  {
    question: "Are they safe for children?",
    answer:
      "They are designed with family safety in mind. Always follow the usage instructions on the product.",
  },
  {
    question: "How long does one application last?",
    answer:
      "Protection duration depends on the product, but most provide several hours of effective protection.",
  },
  {
    question: "Do you deliver across Nepal?",
    answer:
      "Yes. We provide delivery service throughout Nepal.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-20">
      <Container>
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Everything you need to know."
        />

        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border bg-white shadow-sm"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? -1 : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="font-semibold">
                  {faq.question}
                </span>

                <FiChevronDown
                  className={`transition ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}