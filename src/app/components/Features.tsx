import React from 'react'

const Features = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm dark:bg-gray-700">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-50">
                  Why Choose LearnMate?
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  LearnMate is designed to be your personal learning companion, available 24/7 to help you with any subject.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Instant Answers</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get immediate, accurate answers to your questions, no matter how complex.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Complex Topics Explained</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Break down difficult concepts into simple, easy-to-understand explanations.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">24/7 Availability</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your AI assistant is always available, whenever you need it.
                </p>
              </div>
            </div>
          </div>
        </section>
  )
}

export default Features