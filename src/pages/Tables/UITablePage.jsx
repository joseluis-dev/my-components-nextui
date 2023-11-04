import { useState, useEffect } from 'react'
import mockData from '#data/mock_data.json'
import { CardContainer } from '#components/CardContainer/CardContainer'
import { CustomTab } from '#components/CustomTab/CustomTab'

export const UITablePage = () => {
  const [UITable, setUITable] = useState(null)

  useEffect(() => {
    const loadComponent = async () => {
      const { UITable } = await import('#components/UITable/UITable')
      setUITable(() => UITable)
    }

    loadComponent()
  }, [])

  const tabs = [
    {
      id: 'component',
      label: 'Component',
      content: UITable && <UITable data={mockData}/>
    },
    {
      id: 'code',
      label: 'Code',
      content: [
        {
          id: 'uitable',
          label: 'UITable.jsx',
          content: `
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




          `
        },
        {
          id: 'tableAdons',
          label: 'tableAdons.jsx',
          content: `
          import { ChevronDownIcon } from '#assets/ChevronDownIcon'
          import { PlusIcon } from '#assets/PlusIcon'
          import { SearchIcon } from '#assets/SearchIcon'
          import { capitalize } from '#utils/utils'
          import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination } from '@nextui-org/react'

          export const topContentAdon = ({ filterValue, onClear, onSearchChange, visibleColumns, setVisibleColumns, columns, totalItems, onRowsPerPageChange }) => {
            return (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                  <Input
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="Search by name..."
                    startContent={<SearchIcon />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                  />
                  <div className="flex gap-3">
                    <Dropdown>
                      <DropdownTrigger className="hidden sm:flex">
                        <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                          Columns
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectedKeys={visibleColumns}
                        selectionMode="multiple"
                        onSelectionChange={setVisibleColumns}
                      >
                        {columns.map((column) => (
                          <DropdownItem key={column.uid} className="capitalize">
                            {capitalize(column.name)}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                    <Button color="primary" endContent={<PlusIcon />}>
                      Add New
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-default-400 text-small">Total {totalItems} items</span>
                  <label className="flex items-center text-default-400 text-small">
                    Rows per page:
                    <select
                      className="bg-transparent outline-none text-default-400 text-small"
                      onChange={onRowsPerPageChange}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                    </select>
                  </label>
                </div>
              </div>
            )
          }

          export const bottomContentAdon = ({ page, pages, setPage, onPreviousPage, onNextPage }) => {
            return (
              <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                  <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                    Previous
                  </Button>
                  <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                    Next
                  </Button>
                </div>
              </div>
            )
          }




          
          `
        }
      ]
    }
  ]

  return (
    <>
    <CardContainer title='Tabla Paginada' description='Tabla con paginación en front-end' nameComponent='UITable'>
      <CustomTab tabs={tabs}/>
    </CardContainer>
    </>
  )
}
