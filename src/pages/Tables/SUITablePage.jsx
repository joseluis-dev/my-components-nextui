import { useState, useEffect } from 'react'
import mockData from '#data/mock_data.json'
import { CardContainer } from '#components/CardContainer/CardContainer'
import { useSUITable } from '#hooks/useSUITable'

export const SUITablePage = () => {
  const [SUITable, setSUITable] = useState(null)
  const { start, length, hasSearchFilter, setDataPaginated, itemsFiltered, dataPaginated, pages, totalItems, page, setPage, setRowsPerPage, filterValue, setFilterValue } = useSUITable()

  useEffect(() => {
    const loadComponent = async () => {
      const { SUITable } = await import('#components/SUITable/SUITable')
      setSUITable(() => SUITable)
    }

    loadComponent()
  }, [])

  useEffect(() => {
    const loadData = async () => {
      const newMockData = structuredClone(mockData.slice(start, length))
      if (hasSearchFilter) {
        setDataPaginated(itemsFiltered)
        return
      }
      setDataPaginated(newMockData)
    }

    loadData()
  }, [itemsFiltered, hasSearchFilter, length, start, setDataPaginated])

  return (
    <>
    <CardContainer title='Tabla Paginada' description='Tabla con paginación en back-end' nameComponent='SUITable'>
    {SUITable && <SUITable
                    data={dataPaginated}
                    pages={pages}
                    totalItems={totalItems}
                    page={page}
                    setPage={setPage}
                    setRowsPerPage={setRowsPerPage}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                  />}
    </CardContainer>
    </>
  )
}
