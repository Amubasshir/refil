import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/Button"

export default function FAQ() {
  const faqs = [
    {
      question: "What is self-re-financing?",
      answer:
        "Self-re-financing is the process of refinancing your mortgage without the assistance of a traditional broker. With Refii, you can use our AI-powered tools to compare loans, apply, and get approved all on your own.",
    },
    {
      question: "How does Refii's AI assistant work?",
      answer:
        "Our AI assistant analyzes thousands of loan options based on your financial situation and preferences. It provides unbiased recommendations to help you find the best refinancing option.",
    },
    {
      question: "Is Refii's loan comparison software accurate?",
      answer:
        "Yes, our loan comparison software uses real-time data and advanced algorithms to provide accurate comparisons. However, always verify the final terms with the lender before making a decision.",
    },
    {
      question: "Is it safe to use Refii for re-financing?",
      answer:
        "Absolutely. We use bank-level encryption to protect your personal and financial information. We never share your data with third parties without your explicit consent.",
    },
    {
      question: "What types of loans can I re-finance with Refii?",
      answer:
        "Refii supports refinancing for various types of mortgages, including conventional, FHA, VA, and jumbo loans. Our AI assistant can help you find the best option for your specific situation.",
    },
    {
      question: "How much can I save by re-financing with Refii?",
      answer:
        "Savings vary depending on your current loan terms and the new loan you qualify for. On average, our customers save $5,000 per year on mortgage payments. Use our comparison tool to get a personalized estimate.",
    },
    {
      question: "Do I need to be tech-savvy to use Refii?",
      answer:
        "Not at all! We've designed our platform to be user-friendly and intuitive. If you can use a smartphone or computer to browse the internet, you can use Refii.",
    },
    {
      question: "What kind of support does Refii offer during the re-financing process?",
      answer:
        "While Refii is designed for self-service, we offer customer support via chat, email, and phone if you need assistance at any point in the process.",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqs.slice(0, 4).map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="text-center mt-8">
        <Button variant="outline">View All FAQs</Button>
      </div>
    </section>
  )
}

