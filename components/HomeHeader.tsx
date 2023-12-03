
import React from 'react'
import Navbar from './Navbar'
import SearchDialog from './SearchDialog'

const HomeHeader = () => {
    
  return (
    <div className='w-full flex  justify-center  h-[8vh] sticky top-0 bg-white '>
        <Navbar></Navbar>
        <SearchDialog></SearchDialog>
    </div>
  )
}

export default HomeHeader