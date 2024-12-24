import React from 'react'
import './UserDash.css'
import { CiSearch } from "react-icons/ci"
import { MdMenu } from "react-icons/md"
import { FaDumbbell } from "react-icons/fa"
import { NavbarMenu } from '../../mockdata/data'
import { PiShoppingCartThin } from 'react-icons/pi'
import ResponsiveMenu from './ResponsiveMenu'


const Header = () => {

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <nav className='navuser'>
        <div className="container flex justify-between items-center py-8 ">

          {/* logosection */}
          <div className='text-2xl flex items-center gap-2 font-bold uppercase' >
            <FaDumbbell />
            <p className='text-white' >WHEELS</p>
            <p className='gym-text' >CAR</p>
          </div>

          {/* menusection */}
          <div className='hidden md:block' >
            <ul className='flex items-center gap-6 text-gray-600 ' >
              {
                NavbarMenu.map((item) => {
                  return (
                    <li key={item.id} ><a href={item.link} className='navitems inline-block py-1 text-white  px-3 font-semibold' > {item.title}</a></li>
                  )
                })
              }
            </ul>
          </div>

          {/* iconssection */}
          <div className='flex items-center gap-4' >
            <button className='icon-button' >
              <CiSearch className='' />
            </button>
            <button className='icon-button' >
              <PiShoppingCartThin />
            </button>
            <button className='gradient-button px-6 py-2 font-semibold rounded-md duration-200 hidden md:block'>
              Login
            </button>

          </div>

          {/* mobilesection */}
          <div className='md:hidden' onClick={() => setOpen(!open)} >
            <MdMenu className='text-4xl' />
          </div>

        </div>
      </nav>

      {/* mobile_sidebar_section */}
      <ResponsiveMenu open={open} />

    </>
  )
}

export default Header