import React from 'react'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Buttons from './Button';
const Navbar = () => {
  return (
    <nav className='flex justify-between items-center p-4 border-b-2 border-black'>
        <div>
            <h1 className='text-2xl font-bold text-blue-500 ml-2.5'>Learn Mate</h1>
        </div> 
        <div className='flex gap-4  mr-1.5'>
            <SignedOut>
              <SignInButton>
                <Buttons desc="Sign In" color='#6c47ff'/>
              </SignInButton>
              <SignUpButton>
                <Buttons desc="Sign Up" color='#6c47ff'/>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton/>
            </SignedIn>
        </div>
    </nav>
  )
}

export default Navbar