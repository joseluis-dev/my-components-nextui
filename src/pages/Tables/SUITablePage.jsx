import { useState, useEffect } from 'react'
import { CardContainer } from '#components/CardContainer/CardContainer'
import { useSUITableContext } from '#context/SUITableContext'
import { useMockData } from '#hooks/useMockData'
import { CustomTab } from '#components/CustomTab/CustomTab'

export const SUITablePage = () => {
  const [SUITable, setSUITable] = useState(null)
  const { start, length, setData, filterValue, rowsPerPage, setTotalItems, setPages } = useSUITableContext()
  const { itemsFiltered, pages, totalItems } = useMockData({ filterValue, rowsPerPage, length, start })

  useEffect(() => {
    const loadComponent = async () => {
      const { SUITable } = await import('#components/SUITable/SUITable')
      setSUITable(() => SUITable)
    }

    loadComponent()
  }, [])

  useEffect(() => {
    const loadData = async () => {
      setData(itemsFiltered)
      setPages(pages)
      setTotalItems(totalItems)
    }

    loadData()
  }, [itemsFiltered, length, start, setData, setPages, pages, setTotalItems, totalItems])

  const tabs = [
    {
      id: 'component',
      label: 'Component',
      content: SUITable && <SUITable />
    },
    {
      id: 'code',
      label: 'Code',
      content: [
        {
          id: 'suitable',
          label: 'SUITable.jsx',
          content: `
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
        },
        {
          id: 'suitableprovider',
          label: 'SUITableProvider.jsx',
          content: `
          import { SUITableContext } from '#context/SUITableContext'
          import { useSUITable } from '#hooks/useSUITable'

          export const SUITableProvider = ({ children }) => {
            const suiTableState = useSUITable()

            return (
              <>
              <SUITableContext.Provider value={suiTableState}>
                {children}
              </SUITableContext.Provider>
              </>
            )
          }




          `
        },
        {
          id: 'usesuitable',
          label: 'useSUITable.js',
          content: `
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




          `
        },
        {
          id: 'suitablecontext',
          label: 'SUITableContext.js',
          content: `
          import { createContext, useContext } from 'react'

          export const SUITableContext = createContext(null)
          export const useSUITableContext = () => useContext(SUITableContext)




          `
        }
      ]
    }
  ]

  return (
    <>
    <CardContainer title='Tabla Paginada' description='Tabla con paginación en back-end' nameComponent='SUITable'>
      <CustomTab tabs={tabs}/>
    </CardContainer>
    </>
  )
}
