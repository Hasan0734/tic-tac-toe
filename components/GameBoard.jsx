import React from 'react'
import BoardCard from './BoardCard'

const GameBoard = () => {
  return (
    <div className='grid grid-cols-3 gap-5'>
        {[1,2,3,4,5,6,7,8,9].map(() => <BoardCard/>)}
       
    </div>
  )
}

export default GameBoard