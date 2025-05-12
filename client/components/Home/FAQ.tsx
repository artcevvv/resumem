import React from 'react'
import Container from '../Global/Container'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "What makes your resume builder different?",
    answer: "Our resume builder combines professional templates with an intuitive interface, making it easy to create a standout resume. We offer real-time previews, ATS-friendly formatting, and expert tips to help you land your dream job."
  },
  {
    question: "Can I download my resume as a PDF?",
    answer: "Yes! All plans include PDF export functionality. Pro and Enterprise users get priority export with additional formatting options and higher quality output."
  },
  {
    question: "How many resumes can I create?",
    answer: "Free users can create one resume, while Pro and Enterprise users can create unlimited resumes. This is perfect for tailoring your resume to different job applications."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We take data security seriously. All your information is encrypted, and we never share your data with third parties. You can delete your account and data at any time."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service, simply contact our support team for a full refund."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period, and you won't be charged again."
  }
]

export default function FAQ() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our resume builder.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white border border-gray-200 rounded-xl shadow-sm"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer">
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
} 