import React from 'react'

function Container({children}: {children: React.ReactNode}) {
  return (
    <div className='max-w-[1440px] mx-auto py-14'>
        {children}
    </div>
  )
}

export default Container