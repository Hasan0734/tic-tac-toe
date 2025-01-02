import { Circle, X } from 'lucide-react';
import React from 'react';
import { Card } from './ui/card';

const Winner = ({winner, resetGame}) => {
  return (
    <Card onClick={resetGame} className=' cursor-pointer size-[216px] flex items-center justify-center flex-col gap-3 border p-3 '>
   
      {winner === 'X' ? <X className='size-24'/> : <Circle className='size-24'/>}
       <h1 className='text-4xl uppercase font-bold text-muted-foreground'>Winner!</h1>
    </Card>
  )
}

export default Winner