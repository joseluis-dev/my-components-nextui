import { CardContainer } from '#components/CardContainer/CardContainer'
import { useEffect, useState } from 'react'

export const Selectors = () => {
  const [SearchSelect, setSearchSelect] = useState(null)

  useEffect(() => {
    const loadSearchSelect = async () => {
      const { SearchSelect } = await import('#components/SearchSelect/SearchSelect')
      setSearchSelect(() => SearchSelect)
    }

    loadSearchSelect()
  }, [])

  if (SearchSelect == null) return null

  return (
    <>
    <CardContainer title='Selector Buscador' description='Selector con buscador y creación de item nuevo en un formulario con captura del valor' nameComponent='SearchSelect'>
      <SearchSelect />
    </CardContainer>
    </>
  )
}
