import { CodeHighlighter } from '#components/CodeHighlighter/CodeHighlighter'
import { Button } from '@nextui-org/react'
import { useState } from 'react'

export const SubTab = ({ subItem }) => {
  const [view, setView] = useState(false)

  const handleClick = () => {
    if (view) setView(false)
    else setView(true)
  }

  return (
    <div className={`${view && 'max-h-[55vh]'} ${!view && 'max-h-60'} flex w-full justify-center`}>
      <CodeHighlighter codeString={subItem.content} />
      <Button
        variant='shadow'
        className='absolute bottom-10'
        onClick={handleClick}
      >
        {view ? 'Ver menos...' : 'Ver más...'}
      </Button>
    </div>
  )
}
