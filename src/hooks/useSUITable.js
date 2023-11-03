import { useCallback, useMemo, useState } from 'react'
import mockData from '#data/mock_data.json'

export const useSUITable = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const start = (page - 1) * rowsPerPage
  const length = start + rowsPerPage
  const [filterValue, setFilterValue] = useState('')
  const [dataPaginated, setDataPaginated] = useState(mockData.slice(start, length))

  const hasSearchFilter = Boolean(filterValue)

  const filterDataByProperty = useCallback((property, filter) => {
    const propertyStr = String(property).toLowerCase()

    if (propertyStr.includes(filter.toLowerCase())) {
      return true
    }

    return false
  }, [])

  const filteredItems = useMemo(() => {
    let filteredData = [...mockData]

    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) => {
        return ['first_name', 'last_name', 'email'].some(prop => filterDataByProperty(item[prop], filterValue))
      })
    }

    return filteredData
  }, [hasSearchFilter, filterValue, filterDataByProperty])

  const itemsFiltered = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const pages = useMemo(() => {
    if (hasSearchFilter) {
      return Math.ceil(filteredItems.length / rowsPerPage)
    }
    return Math.ceil(mockData.length / rowsPerPage)
  }, [filteredItems, hasSearchFilter, rowsPerPage])

  const totalItems = useMemo(() => {
    return hasSearchFilter ? filteredItems.length : mockData.length
  }, [filteredItems, hasSearchFilter])

  return {
    dataPaginated,
    setDataPaginated,
    filterValue,
    setFilterValue,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    hasSearchFilter,
    itemsFiltered,
    pages,
    start,
    length,
    totalItems
  }
}
