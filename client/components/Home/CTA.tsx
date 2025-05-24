import React from 'react'
import Container from '../Global/Container'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 p-8 md:p-12">
          <div className="relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Create Your Professional Resume?
              </h2>
              <p className="text-indigo-100 text-lg mb-8">
                Join thousands of job seekers who have successfully landed their dream jobs with our resume builder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-indigo-600 bg-white rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/templates"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                >
                  View Templates
                </Link>
              </div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>
      </Container>
    </section>
  )
} 