import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import { SubTab } from './SubTab'

export const CustomTab = ({ tabs }) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item) => {
          return Array.isArray(item.content)
            ? (
              <Tab key={item.id} title={item.label}>
                <Card>
                  <CardBody>
                  <div className="flex w-full flex-col">
                    <Tabs aria-label="Dynamic tabs" items={item.content} variant='underlined'>
                      {(subItem) => (
                        <Tab key={subItem.id} title={subItem.label} className={'rounded relative flex justify-center'}>
                          <SubTab subItem={subItem}/>
                        </Tab>
                      )}
                    </Tabs>
                  </div>
                  </CardBody>
                </Card>
              </Tab>
              )
            : (
              <Tab key={item.id} title={item.label}>
                <Card>
                  <CardBody className='min-h-[300px]'>
                    {item.content}
                  </CardBody>
                </Card>
              </Tab>
              )
        }}
      </Tabs>
    </div>
  )
}
