import React from 'react'
import Container from '../Global/Container'
import Button from '../Molecules/Button'
import { CircleChevronRight, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function Hero() {
  return (
    <section className="py-8 md:py-16 relative overflow-hidden">
      {/* Background gradient */}
      
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-100 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-100 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16 relative z-10">
          {/* Left side - Image/Illustration */}
          <div className='w-full md:w-[500px] h-[300px] md:h-[500px] relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 backdrop-blur-sm border border-gray-200 shadow-sm'>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                <Image
                  src="/images/preview.png"
                  alt="Resume Builder Illustration"
                  fill
                  className="object-cover"
                  priority
                />
              </div>﻿
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col gap-4 md:gap-7 justify-center items-center md:items-end text-center md:text-end order-1 md:order-2">
            <h1 className='text-4xl md:text-5xl lg:text-7xl font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600'>
              Create your <br className="hidden md:block" />
              own resume <br className="hidden md:block" />
              that will be the <span className='text-indigo-600'>key</span> <br className="hidden md:block" />
              to an incredible future
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl max-w-xl">
              Build professional resumes in minutes with our easy-to-use builder. Stand out from the crowd and land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button 
                link='/dashboard/new' 
                text='Create Resume' 
                icon={<CircleChevronRight className="w-5 h-5" />} 
              />
              <Link 
                href="/templates" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                View Templates
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Features */}
            <div className="flex gap-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>Professional Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>Easy to Use</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>Export to PDF</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
