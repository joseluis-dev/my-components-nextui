import { VerticalDotsIcon } from '#assets/VerticalDotsIcon'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'

export const defaultColumns = [
  { name: 'ID', uid: 'id', sortable: true },
  {
    name: 'First Name',
    uid: 'first_name',
    sortable: true,
    visible: true,
    searchable: true
  },
  {
    name: 'Last Name',
    uid: 'last_name',
    sortable: true,
    visible: true,
    searchable: true
  },
  {
    name: 'Email',
    uid: 'email',
    sortable: true,
    visible: true,
    searchable: true
  },
  {
    name: 'Actions',
    uid: 'actions',
    visible: true,
    render: () => <div className="relative flex justify-end items-center gap-2">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <VerticalDotsIcon className="text-default-300" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem>View</DropdownItem>
                        <DropdownItem onClick={() => {}}>Edit</DropdownItem>
                        <DropdownItem>Delete</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
  }
]

export const defaultData = [
  {
    id: 1,
    first_name: 'Isador',
    last_name: 'Kruger',
    email: 'ikruger0@huffingtonpost.com',
    gender: 'Male',
    dob: '2023-04-28T11:19:35Z'
  },
  {
    id: 2,
    first_name: 'Brady',
    last_name: 'Gommery',
    email: 'bgommery1@amazon.de',
    gender: 'Male',
    dob: '2022-12-11T17:35:54Z'
  },
  {
    id: 3,
    first_name: 'Boycie',
    last_name: 'Drei',
    email: 'bdrei2@uol.com.br',
    gender: 'Male',
    dob: '2021-04-25T04:40:04Z'
  },
  {
    id: 4,
    first_name: 'Connie',
    last_name: 'Wooffinden',
    email: 'cwooffinden3@desdev.cn',
    gender: 'Male',
    dob: '2022-04-12T17:18:02Z'
  },
  {
    id: 5,
    first_name: 'Denni',
    last_name: 'Huie',
    email: 'dhuie4@toplist.cz',
    gender: 'Female',
    dob: '2021-01-15T15:08:19Z'
  }
]
