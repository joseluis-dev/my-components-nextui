import { Selectors } from '#pages/Selectors/Selectors'
import { Route } from 'wouter'
import './App.css'
import { Menu } from '#components/Menu/Menu'
import { useState } from 'react'
import Header from '#components/Header/Header'
import { UITablePage } from '#pages/Tables/UITablePage'
import { SUITablePage } from '#pages/Tables/SUITablePage'
import { UIDatePickerPage } from '#pages/UIDatePickerPage/UIDatePickerPage'
import { SUITableProvider } from '#components/SUITable/SUITableProvider'

const App = () => {
  const [show, setShow] = useState(false)

  const handleToggle = (e) => {
    e.stopPropagation()
    if (show) setShow(false)
    else setShow(true)
  }
  return (
    <>
    <header>
      <Header show={show} handleToggle={handleToggle}/>
    </header>
    <aside>
      <Menu show={show} handleToggle={handleToggle}/>
    </aside>
    <main className='main-container'>
      <Route path='/search-select' component={Selectors}/>
      <Route path='/uitable' component={UITablePage}/>
      <SUITableProvider>
        <Route path='/suitable' component={SUITablePage}/>
      </SUITableProvider>
      <Route path='/uidatepicker' component={UIDatePickerPage}/>
    </main>
    </>
  )
}

export default App
