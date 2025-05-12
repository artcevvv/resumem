import React from 'react'
import Container from '../Global/Container'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for trying out our resume builder",
    features: [
      "1 resume template",
      "Basic customization",
      "PDF export",
      "24-hour support"
    ],
    cta: "Get Started",
    href: "/signup",
    popular: false
  },
  {
    name: "Pro",
    price: "9.99",
    description: "Best for job seekers who want more options",
    features: [
      "All templates",
      "Advanced customization",
      "Priority PDF export",
      "Resume analytics",
      "24/7 support",
      "Unlimited resumes"
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=pro",
    popular: true
  },
  {
    name: "Enterprise",
    price: "29.99",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team management",
      "Custom branding",
      "API access",
      "Dedicated support",
      "Custom templates"
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false
  }
]

export default function Pricing() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white border ${
                plan.popular ? 'border-indigo-500' : 'border-gray-200'
              } rounded-2xl p-8 shadow-sm relative`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
} 