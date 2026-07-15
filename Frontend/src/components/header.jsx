import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='bg-black h-20 w-full py-5 px-15'>
        <nav className='flex justify-between text-white items-center'>
            <div className='text-3xl'>Portfolio</div>
            <div className='space-x-10'>
                <Link to="/">Home</Link>
                <Link to="/">About us</Link>
                <Link to="/">Contact us</Link>
            </div>
            <div className='space-x-10'>
                <Link to="/register">Register</Link>
                <Link to="/">Login</Link>
            </div>
        </nav>
    </div>
  )
}
