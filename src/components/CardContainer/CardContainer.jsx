import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'

export const CardContainer = ({ children, title, description, nameComponent }) => {
  return (
    <div>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{title}</p>
          <small className="text-default-500">{description}</small>
          <h4 className="font-bold text-large">{nameComponent}</h4>
        </CardHeader>
        <Divider className="my-4" />
        <CardBody className="overflow-visible py-2 min-h-[300px]">
          {children}
        </CardBody>
      </Card>
    </div>
  )
}
