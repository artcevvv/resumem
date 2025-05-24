import React from 'react'

function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className='max-w-[90vw] md:max-w-[1440px] mx-auto py-3 md:py-14 md:px-10'>
            {children}
        </div>
    )
}

export default Container
