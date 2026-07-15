import React from 'react'

export const Home = () => {
  return (
    <div className='w-full'>
        <section className='h-screen p-20 flex flex-col items-center space-y-10'>
            <h1 className='text-7xl'>  
                Welcome to Portfolio Platform
            </h1>
            <p className='text-xl px-60 text-center'>
                PortfolioHub is a clean, modern web application designed for professionals to build, host, and showcase their digital portfolios. Created for developers, designers, and creators, the platform eliminates the need for complex coding. It allows users to quickly launch a stunning, responsive online presence that looks perfect on any screen
                <br/>The platform features an intuitive dashboard where users easily manage project galleries, update text, and link social profiles. It supports multimedia uploads, allowing creators to display high-resolution case studies, embedded videos, and live project previews. Visitors can effortlessly filter projects by category, browse skill sections, and send inquiries through an integrated contact form
            </p>
            <div className='flex space-x-5'>
                <button className='bg-black text-white p-3 rounded-sm cursor-pointer'>Upload your project</button>
                <button className='bg-transparent text-black border py-3 px-10 rounded-sm cursor-pointer'>Get Start</button>
            </div>
        </section>

        <section>
             
        </section>

    </div>
  )
}
