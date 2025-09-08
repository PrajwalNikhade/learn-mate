import React from 'react'
import Image from 'next/image'
import Buttons from './Button'
const Home_Page = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-10 xl:py-48 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900 dark:text-gray-50">
                    Unlock Your Learning Potential with LearnMate
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Our AI-powered chatbot is here to help you understand complex topics, get instant answers, and accelerate your learning journey.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  
                    <Buttons desc='Start Learning' color='#4184f0'/>
                  
                </div>
              </div>
                <div className="flex items-center justify-center">
                  <Image 
                    src={'/logo.png'} 
                    height={300} 
                    width={300}
                    alt="LearnMate Logo"
                    className="object-contain"
                  />
                </div>
            </div>
          </div>
        </section>
  )
}

export default Home_Page