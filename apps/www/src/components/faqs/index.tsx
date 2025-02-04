import React from "react"

import { Heading } from "../custom/typography"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

const faqs = [
  {
    title: "How much does mangoHR cost?",
    value:
      "Customer success is at our core. We want to see Canadian SMBs succeed, which is why our CoreHR package will always be free, no credit card required. We believe you should be able to try our services wholeheartedly without any commitment. Every package receives 24/7 support for priority issues, and each of you will be assigned a customer success manager who will ensure mangoHR is the product for you.",
  },
  {
    title:
      "I have a small team of less than 10 employees can I still use your platform?",
    value:
      "Customer success is at our core. We want to see Canadian SMBs succeed, which is why our CoreHR package will always be free, no credit card required. We believe you should be able to try our services wholeheartedly without any commitment. Every package receives 24/7 support for priority issues, and each of you will be assigned a customer success manager who will ensure mangoHR is the product for you.",
  },
  {
    title: "I am concerned about data privacy",
    value:
      "Customer success is at our core. We want to see Canadian SMBs succeed, which is why our CoreHR package will always be free, no credit card required. We believe you should be able to try our services wholeheartedly without any commitment. Every package receives 24/7 support for priority issues, and each of you will be assigned a customer success manager who will ensure mangoHR is the product for you.",
  },
  {
    title: "I want a specific module that I don’t see on your website",
    value:
      "Customer success is at our core. We want to see Canadian SMBs succeed, which is why our CoreHR package will always be free, no credit card required. We believe you should be able to try our services wholeheartedly without any commitment. Every package receives 24/7 support for priority issues, and each of you will be assigned a customer success manager who will ensure mangoHR is the product for you.",
  },
]

export default function DefaultFAQS() {
  return (
    <section className="m-auto max-w-screen-lg px-4 pb-20 xl:px-0">
      <div className="mb-20 flex flex-col items-center justify-center space-y-4">
        <Heading>FAQs</Heading>
      </div>
      <Accordion type="single" collapsible className="w-full space-y-8">
        {faqs.map((f, i) => (
          <AccordionItem value={"item-" + i} key={i}>
            <AccordionTrigger variant={"fancy"} expand="plus">
              {f.title}
            </AccordionTrigger>
            <AccordionContent>{f.value}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
