import { useState, useEffect } from 'react'
import mockData from '#data/mock_data.json'
import { CardContainer } from '#components/CardContainer/CardContainer'

export const UITablePage = () => {
  const [UITable, setUITable] = useState(null)

  useEffect(() => {
    const loadComponent = async () => {
      const { UITable } = await import('#components/UITable/UITable')
      setUITable(() => UITable)
    }

    loadComponent()
  }, [])

  return (
    <>
    <CardContainer title='Tabla Paginada' description='Tabla con paginación en front-end' nameComponent='UITable'>
    {UITable && <UITable data={mockData}/>}
    </CardContainer>
    </>
  )
}
