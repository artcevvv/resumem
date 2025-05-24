import React from 'react'
import Container from '../Global/Container'
import Image from 'next/image'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Tech Corp",
    image: "/components/Testimonials/person1.jpg",
    quote: "This resume builder helped me land my dream job at a top tech company. The templates are professional and the interface is incredibly easy to use."
  },
  {
    name: "Michael Chen",
    role: "Marketing Manager",
    company: "Creative Solutions",
    image: "/components/Testimonials/person2.jpg",
    quote: "I was able to create a stunning resume in minutes. The customization options are fantastic, and the PDF export quality is perfect."
  },
  {
    name: "Emily Rodriguez",
    role: "Product Designer",
    company: "Design Studio",
    image: "/components/Testimonials/person3.jpg",
    quote: "As a designer, I'm picky about aesthetics. This tool exceeded my expectations with its beautiful templates and professional output."
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Loved by Job Seekers
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of professionals who have successfully landed their dream jobs using our resume builder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 italic">&ldquo;{testimonial.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
} 