"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq({ question, answer }) {
  return (
    <div>
        <Accordion type="single" collapsible className="w-full m-2">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left text-lg font-medium hover:text-primary">
            {question}
          </AccordionTrigger>
          <AccordionContent>
            {Array.isArray(answer) ? (
              <ul className="list-disc pl-6 space-y-2">
                {answer.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            ) : (
              <p>{answer}</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}