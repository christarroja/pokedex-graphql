import React from 'react'

const Footer = () => {
  return (
    <footer className="bottom-0 w-full py-4 bg-gray-700">
      <div className="text-white text-sm flex flex-wrap md:gap-6 gap-2 items-center justify-center mx-auto text-center">
        <div>Developed by Chris Tarroja.</div>
        <div>Design by the <a href='https://www.figma.com/community/file/893705420616737018' target='_blank' className='underline underline-offset-4'>PokéSpartans team Platzi Master</a></div>
      </div>
    </footer>
  )
}

export default Footer