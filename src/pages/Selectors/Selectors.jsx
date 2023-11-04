import { CardContainer } from '#components/CardContainer/CardContainer'
import { CustomTab } from '#components/CustomTab/CustomTab'
import { useEffect, useState } from 'react'

export const Selectors = () => {
  const [SearchSelect, setSearchSelect] = useState(null)

  useEffect(() => {
    const loadSearchSelect = async () => {
      const { SearchSelect } = await import('#components/SearchSelect/SearchSelect')
      setSearchSelect(() => SearchSelect)
    }

    loadSearchSelect()
  }, [])

  const tabs = [
    {
      id: 'component',
      label: 'Component',
      content: SearchSelect && <SearchSelect />
    },
    {
      id: 'code',
      label: 'Code',
      content: [
        {
          id: 'searchselect',
          label: 'SearchSelect.jsx',
          content: `
          import { Button, Chip } from '@nextui-org/react'
          import { useForm, Controller } from 'react-hook-form'
          import CreatableSelect from 'react-select/creatable'

          const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]

          export function SearchSelect () {
            const { control, handleSubmit, formState: { errors }, setValue } = useForm()

            const onSubmit = (values) => {
              console.log(values)
              const { selectValue } = values
              values.selectValue = selectValue.value
              console.log({ formValues: values })
            }

            const handleSelectChange = (option) => {
              console.log({ option })
              setValue('selectValue', option)
            }
            return (
              <>
              <form onSubmit={handleSubmit(onSubmit)} className='p-4 rounded border-solid border-1 border-gray-300'>
                <Controller
                  name='selectValue'
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CreatableSelect
                      {...field}
                      className="mb-2"
                      classNamePrefix="select"
                      defaultValue={options[0]}
                      isDisabled={false}
                      isLoading={false}
                      isClearable={true}
                      isRtl={false}
                      isSearchable={true}
                      options={options}
                      onChange={handleSelectChange}
                    />
                  )}
                />
                {errors.selectValue &&
                  <Chip color='danger' className='text-xs'>This field is required</Chip>}
                <div className='flex w-100 justify-end'>
                  <Button type='submit' variant='flat' color='primary'>Submit</Button>
                </div>
              </form>
              </>
            )
          }
          `
        }
      ]
    }
  ]

  return (
    <>
    <CardContainer title='Selector Buscador' description='Selector con buscador y creación de item nuevo en un formulario con captura del valor' nameComponent='SearchSelect'>
      <CustomTab tabs={tabs}/>
    </CardContainer>
    </>
  )
}
