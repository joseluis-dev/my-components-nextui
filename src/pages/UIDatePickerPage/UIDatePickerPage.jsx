import { CardContainer } from '#components/CardContainer/CardContainer'
import { UIDatePicker } from '#components/UIDatePicker/UIDatePicker'

export const UIDatePickerPage = () => {
  return (
    <>
    <CardContainer title='Date Picker' description='Selección de fecha' nameComponent='UIDatePicker'>
      <UIDatePicker />
    </CardContainer>
    </>
  )
}
