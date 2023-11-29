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

function App() {
  const  [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(Turns.X)

  const updateBoard = (index) => {
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    console.log(newBoard)

    const newTurn = turn === Turns.X ? Turns.O : Turns.X
    setTurn(newTurn)
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
