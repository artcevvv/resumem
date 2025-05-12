import React from 'react'
import Container from '../Global/Container'
import { UserPlus, FileText, Download } from 'lucide-react'

const steps = [
  {
    icon: <UserPlus className="w-8 h-8" />,
    title: "Create Your Account",
    description: "Sign up for free and get instant access to all our features."
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Fill in Your Details",
    description: "Add your experience, education, and skills using our intuitive interface."
  },
  {
    icon: <Download className="w-8 h-8" />,
    title: "Download Your Resume",
    description: "Choose a template and download your professional resume in PDF format."
  }
]

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Create Your Resume in Three Simple Steps
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our streamlined process makes it easy to create a professional resume in minutes.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-200" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 relative z-10">
                  {step.icon}
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-[160px] w-full">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 flex-grow">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
} 