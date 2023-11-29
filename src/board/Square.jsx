import React from 'react'

export const Square = ({children, isSlected, updateBoard, index})=>{
    const className = `square ${isSlected ? 'is-selected' : ''}`
  
    const handleClick = () => {
      updateBoard(index)
    }
  
    return(
      <div onClick={handleClick} className={className}>
        {children}
      </div>
  
    )
}
