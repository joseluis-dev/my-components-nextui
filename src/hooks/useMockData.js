import mockData from '#data/mock_data.json'
import { useCallback, useMemo } from 'react'

export const useMockData = ({ filterValue, rowsPerPage, start, length: end }) => {
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
    return filteredItems.slice(start, end)
  }, [filteredItems, start, end])

  const totalItems = useMemo(() => {
    return hasSearchFilter ? filteredItems.length : mockData.length
  }, [filteredItems, hasSearchFilter])

  const pages = useMemo(() => {
    if (hasSearchFilter) {
      return Math.ceil(filteredItems.length / rowsPerPage)
    }
    return Math.ceil(mockData.length / rowsPerPage)
  }, [filteredItems, hasSearchFilter, rowsPerPage])

  return {
    itemsFiltered,
    totalItems,
    pages
  }
}
