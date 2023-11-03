import { BsBellFill, BsListTask } from 'react-icons/bs'
import { BiSolidFileDoc } from 'react-icons/bi'
import { FaCalendarDays } from 'react-icons/fa6'

export const menuItems = [
  {
    name: 'Selectors',
    icon: <BsBellFill className='text-white'/>,
    subItems: [
      {
        name: 'SearchSelect',
        icon: <BiSolidFileDoc className='text-white' />,
        url: '/search-select',
        subMenuItems: []
      }
    ],
    singleItem: false
  },
  {
    name: 'Tables',
    icon: <BsListTask className='text-white' />,
    subItems: [
      {
        name: 'UITable',
        icon: <FaCalendarDays className='text-white'/>,
        url: '/uitable',
        subMenuItems: []
      },
      {
        name: 'SUITable',
        icon: <FaCalendarDays className='text-white'/>,
        url: '/suitable',
        subMenuItems: []
      }
    ],
    singleItem: false
  },
  {
    name: 'DatePickers',
    icon: <BsListTask className='text-white' />,
    subItems: [
      {
        name: 'UITable',
        icon: <FaCalendarDays className='text-white'/>,
        url: '/uidatepicker',
        subMenuItems: []
      }
    ],
    singleItem: false
  }
]
