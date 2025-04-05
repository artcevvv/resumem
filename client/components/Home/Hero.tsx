import React from 'react'
import Container from '../Global/Container'
import Button from '../Molecules/Button'
import { CircleChevronRight } from 'lucide-react'

function Hero() {
  return (
    <section>
      <Container>
        <div className="flex justify-between text-end">
          <div className='h-[500px] w-[500px] bg-blue rounded-2xl'></div>
          <div className="flex flex-col gap-7 justify-center items-center">
            <h1 className='text-7xl font-bold capitalize'>
                Create your <br/>
                own resume <br/>
                that will be the <span className='text-[#DB4D3F]'>key</span> <br/> 
                to an incredible future <br/>
            </h1>
            <Button link='/' text='Begin' icon={<CircleChevronRight />}/>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero