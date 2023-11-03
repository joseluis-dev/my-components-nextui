import { Button, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BiSolidUserRectangle } from 'react-icons/bi'
import { Link } from 'wouter'
import './Header.css'

const Header = ({ handleToggle }) => {
  return (
    <div className='nav-container sticky top-0 bg-white z-[46]'>
      <Navbar classNames={{
        base: 'px-0',
        wrapper: 'lg:max-w-[100vw]'
      }}>
        <NavbarContent className="sm:flex gap-4" justify="start">
          <NavbarItem className='lg:hidden'>
            <Button
              variant="flat"
              isIconOnly
              startContent={<GiHamburgerMenu />}
              onClick={handleToggle}
            />
          </NavbarItem>
          <NavbarItem isActive={location.pathname === '/'}>
            <Link color="foreground" href='/'>
              Inicio
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className='flex items-center'>
            <Button color="primary" variant="flat" isIconOnly startContent={<BiSolidUserRectangle size={24} />} />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  )
}

export default Header
