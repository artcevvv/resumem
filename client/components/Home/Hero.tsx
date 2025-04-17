import React from 'react'
import Container from '../Global/Container'
import Button from '../Molecules/Button'
import { CircleChevronRight } from 'lucide-react'

function Hero() {
  return (
    <section className="py-8 md:py-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16">
          <div className='w-full md:w-[500px] h-[300px] md:h-[500px] bg-blue rounded-2xl'></div>
          <div className="flex flex-col gap-4 md:gap-7 justify-center items-center md:items-end text-center md:text-end order-1 md:order-2">
            <h1 className='text-4xl md:text-5xl lg:text-7xl font-bold capitalize'>
              Create your <br className="hidden md:block" />
              own resume <br className="hidden md:block" />
              that will be the <span className='text-[#DB4D3F]'>key</span> <br className="hidden md:block" />
              to an incredible future
            </h1>
            <Button link='/' text='Begin' icon={<CircleChevronRight />} />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
