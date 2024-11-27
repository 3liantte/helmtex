import FaqQuestions from '@/components/FAQ/FaqQuestions'
import React from 'react'

const page = () => {
  return (
    <div className="w-full pt-32">
      <h1 className="flex items-center justify-center font-semibold md:text-3xl text-gray-800">Frequently Asked Questions</h1>
      <FaqQuestions/>
    </div>
  )
}

export default page
