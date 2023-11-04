import { useState } from 'react'
import { defaultColumns } from '#constants/defaultCustomTableItems'

export const useSUITable = () => {
  const [columns, setColumns] = useState(defaultColumns)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const start = (page - 1) * rowsPerPage
  const length = start + rowsPerPage
  const [filterValue, setFilterValue] = useState('')
  const [data, setData] = useState([])
  const [totalItems, setTotalItems] = useState(data.length)

  return {
    data,
    setData,
    filterValue,
    setFilterValue,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    pages,
    setPages,
    start,
    length,
    totalItems,
    setTotalItems,
    columns,
    setColumns
  }
}
