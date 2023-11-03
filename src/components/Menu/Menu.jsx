import { Accordion, AccordionItem, Button, Divider, User } from '@nextui-org/react'
import { menuItems } from '#constants/menuItems'
import { Link } from 'wouter'

export const Menu = ({ show, handleToggle }) => {
  const itemClasses = {
    base: 'py-0 w-full mb-1',
    title: 'font-normal text-sm text-white',
    trigger: 'px-4 py-0 bg-lte-blue rounded h-[40px] flex items-center',
    indicator: 'text-medium text-white',
    content: 'text-small px-2'
  }

  const itemClassesSub = {
    base: 'py-0 px-0 w-full',
    title: 'font-normal text-sm text-white',
    trigger: 'px-4 py-0 rounded data-[hover=true]:bg-default/40 h-[40px] flex items-center',
    indicator: 'text-medium text-white',
    content: 'text-small px-2'
  }

  const handleClick = (e) => {
    e.stopPropagation()
    handleToggle(e)
  }

  return (
    <aside
      className={`${show && 'absolute top-0 bottom-0 right-0 left-0 bg-gray-500/30 z-[50]'} lg:relative`}
      onClick={handleClick}
    >
      <div
        className={`flex flex-col items-center pt-4 h-[100vh] bg-neutral-700 w-[255px] fixed top-0 z-50 transition-left lg:left-0 ${show && 'left-0'} ${!show && '-left-64'}`}
        onClick={(e) => { e.stopPropagation() }}
      >
        <User
          name="MY-COMPONENTS"
          avatarProps={{
            src: '',
            radius: 'sm',
            className: 'w-20'
          }}
          className='text-white'
          classNames={{
            name: 'text-lg'
          }}
        />
        <Divider className="my-4 bg-slate-500 max-w-[234px]" />
        <User
          name='User'
          description='Default User'
          avatarProps={{
            src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
          }}
          className='text-white'
        />
        <Divider className="my-4 bg-slate-500 max-w-[234px]" />
        <ul className='flex flex-col items-center pt-4 bg-neutral-700 w-[255px] overflow-auto'>
        {menuItems.map((item, index) => (
          !item.singleItem
            ? <li key={`${index}-${item.name}`} className="px-0 flex flex-col gap-1 w-full">
              <Accordion
                  showDivider={false}
                  itemClasses={itemClasses}>
                  <AccordionItem
                    className='max-w-[234px]'
                    aria-label={item.name}
                    startContent={item.icon}
                    title={item.name}
                  >
                    {
                      item.subItems.length > 0
                        ? item.subItems.map((subItem, index) => (
                          subItem.subMenuItems.length > 0
                            ? <Accordion
                                showDivider={false}
                                key={`${index}-${subItem.name}`}
                                className='px-0'
                                itemClasses={itemClassesSub}
                              >
                              <AccordionItem
                                aria-label={subItem.name}
                                startContent={subItem.icon}
                                title={subItem.name}
                              >
                                {subItem.subMenuItems.map((subMenuItems, index) => (
                                  <Button
                                    key={`${index}-${subMenuItems.name}`}
                                    className='rounded justify-normal text-white'
                                    fullWidth
                                    variant='light'
                                    startContent={subMenuItems.icon}
                                    as={Link}
                                    to={subMenuItems.url}
                                  >
                                    {subMenuItems.name}
                                  </Button>
                                ))}
                              </AccordionItem>
                            </Accordion>
                            : <Button
                                key={`${index}-${subItem.name}`}
                                className='rounded justify-normal text-white'
                                fullWidth
                                variant='light'
                                startContent={subItem.icon}
                                as={Link}
                                to={subItem.url}
                              >
                                {subItem.name}
                              </Button>
                        ))
                        : null
                    }
                  </AccordionItem>
                </Accordion>
            </li>
            : <li key={`${index}-${item.name}`} className="px-0 flex flex-col gap-1 w-full items-center">
              <Button
                  className='h-[40px] max-w-[234px] mb-1 rounded justify-normal text-white'
                  fullWidth
                  variant='light'
                  startContent={item.icon}
                  as={Link}
                  to={item.url}
                >
                  {item.name}
                </Button>
            </li>
        ))}
        </ul>
        </div>
    </aside>
  )
}
