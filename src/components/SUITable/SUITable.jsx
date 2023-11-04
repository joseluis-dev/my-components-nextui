import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useCallback, useMemo, useState } from 'react'
import { bottomContentAdon, topContentAdon } from './tableAdons'
import { useSUITableContext } from '#context/SUITableContext'

export const SUITable = () => {
  const { data, pages, totalItems, page, setPage, setRowsPerPage, filterValue, setFilterValue, columns } = useSUITableContext()

  const INITIAL_VISIBLE_COLUMNS = columns.length > 0 ? columns.filter(column => column.visible).map(columnFiltered => columnFiltered.uid) : []
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS))
  const [sortDescriptor, setSortDescriptor] = useState({
    column: '',
    direction: 'ascending'
  })

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns, columns])

  const sortedItems = useMemo(() => {
    return [...data].sort((a, b) => {
      const first = a[sortDescriptor.column]
      const second = b[sortDescriptor.column]
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, data])

  const renderCell = useCallback((row, columnKey) => {
    const [currentColumn] = columns.filter(column => column.uid === columnKey)
    const { render } = currentColumn
    const cellValue = row[columnKey]

    if (render != null) {
      return render(row)
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
  }, [page, pages, setPage])

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page, setPage])

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [setPage, setRowsPerPage])

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [setFilterValue, setPage])

  const onClear = useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [setFilterValue, setPage])

  const topContent = useMemo(() => topContentAdon({
    columns,
    totalItems,
    filterValue,
    onClear,
    onRowsPerPageChange,
    onSearchChange,
    setVisibleColumns,
    visibleColumns
  }), [filterValue, onSearchChange, visibleColumns, onRowsPerPageChange, onClear, columns, totalItems])

  const bottomContent = useMemo(() => bottomContentAdon({
    onNextPage,
    onPreviousPage,
    page,
    pages,
    setPage
  }), [onNextPage, onPreviousPage, page, pages, setPage])

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: 'max-h-[382px]'
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
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
