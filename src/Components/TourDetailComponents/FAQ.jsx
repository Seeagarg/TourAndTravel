import { useState } from "react";
import styles from "./FAQ.module.css";

const faqs = [
  {
    question: "What is the best time to visit Delhi?",
    answer:
      "The best time to visit Delhi is from October to March when the weather is pleasant and ideal for sightseeing. Summers can be very hot, while winters are comfortable for exploring historical monuments."
  },
  {
    question: "What should I carry for a Delhi tour?",
    answer:
      "Carry comfortable walking shoes, light cotton clothes (or warm layers in winter), sunglasses, sunscreen, basic medicines, and a valid photo ID. A small backpack is useful for daily sightseeing."
  },
  {
    question: "Is this Delhi tour suitable for families and senior citizens?",
    answer:
      "Yes, this Delhi tour is suitable for families and senior citizens. Sightseeing is planned at a relaxed pace with AC transfers, and assistance is available if required."
  },
  {
    question: "Are monument entry tickets included in the package?",
    answer:
      "Entry tickets to monuments are generally not included unless mentioned. You can purchase tickets on-site or online, and our guide will assist you during visits."
  },
  {
    question: "Is airport or railway station pickup included?",
    answer:
      "Yes, pickup and drop from Indira Gandhi International Airport or New Delhi Railway Station are included as per the itinerary."
  },
  {
    question: "Can this Delhi tour package be customized?",
    answer:
      "Absolutely! The itinerary can be customized based on your travel dates, interests, and budget. You can add or remove sightseeing spots or upgrade hotels as per your preference."
  }
];

const FAQ = ({ tour }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const displayFaqs = (tour && tour.faqs) ? tour.faqs : faqs;

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.heading}>Frequently Asked Questions</h2>
      <p className={styles.subHeading}>Your right to know!</p>

      <div className={styles.faqList}>
        {displayFaqs.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ""
              }`}
            onClick={() => toggleFAQ(index)}
          >
            <div className={styles.questionRow}>
              <span className={styles.question}>
                Q. {faq.question}
              </span>
              <span className={styles.icon}>
                {activeIndex === index ? "⌄" : "›"}
              </span>
            </div>

            {activeIndex === index && (
              <div className={styles.answer}>
                <strong>A:</strong> {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
