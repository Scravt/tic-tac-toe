import React, {useState} from 'react'
import {Square} from './Square'

const Turns ={
    X:'x',
    O:'o'
  }

const winningCombination = [
    [0,1,2], // row 1
    [3,4,5], // row 2
    [6,7,8], // row 3
    [0,3,6], // col 1
    [1,4,7], // col 2
    [2,5,8], // col 3
    [0,4,8], // diagonal 1
    [2,4,6], // diagonal 2
  ] 
  
  
    

export const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(Turns.X)
  const [winner, setWinner] = useState(null)



  const checkWinner = (boardToCheck) => {
    for(const combo of winningCombination){
      const [a,b,c] = combo 
      if(
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]){
        return boardToCheck[a]
      }     
    }
    return null
  } 

  const checkEndGame = (boardToCheck) => {
   return boardToCheck.every(square => square!==null)
  }


  const updateBoard = (index) => {
    if(board[index] || winner){
      return
    }
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === Turns.X ? Turns.O : Turns.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if(newWinner!==null){
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
        setWinner(false)
    }
    }

  return (
  <main className="board">
    <h1>tic tac toe</h1>
    <section className="game">
    {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
    </section>
    <section className="turn">
      <Square isSlected={turn===Turns.X}>
        {Turns.X}
      </Square>
      <Square isSlected={turn===Turns.O}>
        {Turns.O}
      </Square>
    </section>
    {
      winner!=null && (
        <section className="winner">
          <div className="text">
            <h2>
              {
                winner === false ? 'Draw' : `Vctory`
              }
            </h2>

            <header>
              {winner&& <Square>{winner}</Square>}
            </header>

            <footer>  
              <button onClick={()=>{
                setBoard(Array(9).fill(null))
                setWinner(null)
              }}>New Game</button>
            </footer>
          </div>
        </section>
      )
    }
  </main>
  )
  
}
