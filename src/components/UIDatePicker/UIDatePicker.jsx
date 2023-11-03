import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
import 'react-datepicker/dist/react-datepicker.css'
import './UIDatePicker.css'

registerLocale('es', es)

export const UIDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date())

  const year = startDate.getFullYear()
  const month = startDate.getMonth() // cuenta desde el 0 mes

  console.log(year, month)

  return (
    <DatePicker
      showIcon
      locale="es"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      className='border-1 border-solid border-gray-400 rounded outline-none'
    />
  )
}
