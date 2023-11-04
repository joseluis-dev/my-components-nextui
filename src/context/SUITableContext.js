import { createContext, useContext } from 'react'

export const SUITableContext = createContext(null)
export const useSUITableContext = () => useContext(SUITableContext)
