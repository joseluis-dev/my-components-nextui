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
