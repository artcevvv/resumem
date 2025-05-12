import React from 'react'
import Container from '../Global/Container'
import { FileText, Download, Palette, Share2, Clock, Shield } from 'lucide-react'

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Professional Templates",
    description: "Choose from a variety of professionally designed templates that stand out to employers."
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "PDF Export",
    description: "Download your resume as a PDF file, ready to be shared with potential employers."
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Customizable Design",
    description: "Customize colors, fonts, and layouts to match your personal brand."
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Easy Sharing",
    description: "Share your resume directly with employers or save it for later use."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Quick Creation",
    description: "Create a professional resume in minutes with our intuitive interface."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Privacy First",
    description: "Your data is secure and private. We never share your information."
  }
]

export default function Features() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Everything You Need to Create the Perfect Resume
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our resume builder provides all the tools you need to create a professional resume that gets you noticed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-gray-300 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
} 