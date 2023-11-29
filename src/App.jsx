import { useState } from "react"

const Turns ={
  X:'x',
  O:'o'
}


const Square = ({children, isSlected, updateBoard, index})=>{
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

 

function App() {
  const  [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(Turns.X)
  const [wineer, setWineer] = useState(null)

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


  const updateBoard = (index) => {
    if(board[index] || wineer){
      return
    }
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)


    const newTurn = turn === Turns.X ? Turns.O : Turns.X
    setTurn(newTurn)

    const winner = checkWinner(newBoard)
    if(winner){
      setWineer(winner)
      alert(`The winner is ${winner}`)
    }
  }

  return (
  <main className="board">
    <h1>tic tac toe</h1>
    <section className="game">
            {board.map((value, index) => (
              
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard}>
                  {value}
              </Square>
            ))}
    </section>
    <section className="turn">
      <Square isSlected={turn===Turns.X}>
        {Turns.X}
      </Square>
      <Square isSlected={turn===Turns.O}>
        {Turns.O}
      </Square>
    </section>
  </main>
  )
}

export default App
