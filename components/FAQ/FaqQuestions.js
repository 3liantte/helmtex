import React from "react";
import Faq from "./Faq";
import { ScrollArea } from "@/components/ui/scroll-area";

const FaqQuestions = () => {
  const faqs = [
    {
      question: "What types of fabrics does your textile factory produce?",
      answer:[
        "We produce a wide variety of fabrics, including cotton, polyester, linen, and blended textiles, tailored for different industries such as fashion, home furnishings, and technical applications.",
      ],
    },
    {
      question: "Do you offer custom fabric manufacturing services?",
      answer: [
        "Yes, we provide custom fabric manufacturing where clients can specify the type of fiber, weave, color, and finishing processes"
      ],
    },
    {
      question: "What are the minimum order quantities for bulk fabric purchases?",
      answer: [
        "Our minimum order quantity typically starts at 500 yards, but we can adjust based on special requirements and project scope."
      ],
    },
    {
      question: "Can your factory handle special textile treatments, such as fire resistance or water repellency?",
      answer: [
        "Yes, we offer various fabric treatments, including fire resistance, water repellency, and UV protection, to meet industry standards and client needs."
      ],
    },
    {
      question: "What is the typical lead time for an order from production to delivery?",
      answer: [
        "The average lead time is between 4 to 8 weeks, depending on the complexity of the order and the current production schedule."
      ],
    },
    {
      question: "Do you manufacture sustainable or eco-friendly textiles?",
      answer: [
        "Yes, we produce eco-friendly fabrics using organic and recycled fibers and environmentally safe dyes and processes."
      ],
    },
    {
      question: "What quality control measures do you have in place to ensure product consistency?",
      answer: [
        "We have a comprehensive quality control process that includes raw material inspections, in-line checks during production, and final product audits."
      ],
    },
    {
      question: "Where do you source your raw materials from?",
      answer: [
        "We source raw materials from certified suppliers both locally and internationally to ensure the best quality and sustainability."
      ],
    },
    {
      question: "Do you offer support for traceability of materials used in production?",
      answer: [
        "Yes, we provide detailed documentation for clients who need traceability reports to verify the origin and quality of the materials."
      ],
    },
    {
      question: "How do you handle supply chain disruptions, and what backup plans are in place?",
      answer: [
        "We work with multiple suppliers and maintain a buffer stock to mitigate potential supply chain disruptions, ensuring continuity of production."
      ],
    },
    {
      question: "What are your pricing structures for different fabric types?",
      answer: [
        "Our pricing varies based on the type of fabric, complexity of the weave, order size, and any additional treatments required. Custom quotes are provided upon request.",
      ],
    },
    {
      question: "Do you offer payment plans or credit terms for large orders?",
      answer: [
        "Yes, we offer flexible payment terms and credit options for bulk orders, subject to approval and negotiation."
      ],
    },
    {
      question: "Does your factory have certifications like ISO, GOTS, or OEKO-TEX?",
      answer: [
        "Yes, we are certified under ISO 9001 for quality management and hold GOTS and OEKO-TEX certifications for our sustainable and non-toxic fabric lines."
      ],
    },
    {
      question: "Are your production practices compliant with environmental and labor regulations?",
      answer: [
        "Absolutely. We adhere to local and international regulations on environmental impact, labor rights, and workplace safety."
      ],
    },
    {
      question:
        "Do you ship internationally?",
      answer: [
        "No, we only deliver locally",
      ],
    },
    {
      question:
        "Is there a warranty or guarantee on your products?",
      answer: [
        "We provide a satisfaction guarantee and will address any manufacturing defects or issues promptly with replacement or refund options."
      ],
    },
    {
      question:
        "Do you provide samples before placing bulk orders?",
      answer: [
        "Yes, we offer fabric swatches and sample yardage so that clients can evaluate the quality before committing to a large order."
      ],
    },
    {
      question: "Can I schedule a tour of your factory or warehouse?",
      answer: [
        "Absolutely! We welcome clients to visit our facilities to see our production process and meet our team. Appointments can be arranged upon request."
      ],
    },
    {
      question: "Do you offer consultation services for fabric selection and custom orders?",
      answer: [
        "Yes, our expert team is available for consultation to help clients choose the right fabrics and customization options for their projects."
      ],
    },
    {
      question: "What safety measures are in place to protect workers in the factory or warehouse?",
      answer: [
        "We prioritize safety with rigorous training programs, proper personal protective equipment (PPE), regular safety drills, and compliance with occupational safety standards. Additionally, our facilities are equipped with fire suppression systems and first aid stations."
      ],
    },
    {
      question: "What modern technologies do you use in your textile production process?",
      answer: [
        "We use advanced weaving machines, computerized designs, and quality control. This helps maintain precision, increase production efficiency, and reduce waste."
      ],
    },
  ];

  return (
    <div className="w-full mx-auto p-6 space-y-4">
      <ScrollArea className="h-[80vh] w-full rounded-md border p-4">
        <div className="pr-4">
          {faqs.map((faq, index) => (
            <Faq key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FaqQuestions;
