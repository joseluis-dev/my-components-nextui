import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useCallback, useMemo, useState } from 'react'
import { defaultColumns, defaultData } from '#constants/defaultCustomTableItems'
import { bottomContentAdon, topContentAdon } from './tableAdons'

export const UITable = ({ columns = defaultColumns, data = defaultData }) => {
  const INITIAL_VISIBLE_COLUMNS = columns.length > 0 ? columns.filter(column => column.visible).map(columnFiltered => columnFiltered.uid) : []
  const SEARCHABLE_COLUMNS = useMemo(() => columns.length > 0 ? columns.filter(column => column.searchable).map(columnFiltered => columnFiltered.uid) : [], [columns])

  const [filterValue, setFilterValue] = useState('')
  // const [selectedKeys, setSelectedKeys] = useState(new Set([]))
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS))
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [sortDescriptor, setSortDescriptor] = useState({
    column: '',
    direction: 'ascending'
  })
  const [page, setPage] = useState(1)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns, columns])

  const filterDataByProperty = useCallback((property, filter) => {
    const propertyStr = String(property).toLowerCase()

    if (propertyStr.includes(filter.toLowerCase())) {
      return true
    }

    return false
  }, [])

  const filteredItems = useMemo(() => {
    let filteredData = [...data]

    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) => {
        return SEARCHABLE_COLUMNS.some(prop => filterDataByProperty(item[prop], filterValue))
      })
    }

    return filteredData
  }, [hasSearchFilter, filterValue, data, SEARCHABLE_COLUMNS, filterDataByProperty])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column]
      const second = b[sortDescriptor.column]
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = useCallback((data, columnKey) => {
    const [currentColumn] = columns.filter(column => column.uid === columnKey)
    const { render } = currentColumn
    const cellValue = data[columnKey]

    if (render != null) {
      return render(data)
    } else {
      return <div>
        {cellValue}
      </div>
    }
  }, [columns])

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const topContent = useMemo(() => topContentAdon({
    columns,
    data,
    filterValue,
    onClear,
    onRowsPerPageChange,
    onSearchChange,
    setVisibleColumns,
    visibleColumns
  }), [filterValue, onSearchChange, visibleColumns, onRowsPerPageChange, onClear, columns, data])

  const bottomContent = useMemo(() => bottomContentAdon({
    onNextPage,
    onPreviousPage,
    page,
    pages,
    setPage
  }), [page, pages, onPreviousPage, onNextPage])

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: 'max-h-[382px]'
      }}
      // selectedKeys={selectedKeys}
      // selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      // onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No data found'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id} >
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
