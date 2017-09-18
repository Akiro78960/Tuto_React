import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//deprecated
// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}


class Board extends React.Component {
  constructor(){
    super()
    this.state={
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    if(!squares[i] && !calculateWinner(squares)){
      squares[i]= this.state.xIsNext ? 'X' : 'O'
      this.state.xIsNext = !this.state.xIsNext
      this.setState({squares: squares})
    }
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
  }

  render() {
    var status = this.state.xIsNext ? 'Next player: X' : 'Next player: O';
    const winner = calculateWinner(this.state.squares);
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}


function ButtonPerso(props){
    return <button className="new-game" onClick={props.onClick}> New Game </button>
  }



class Game extends React.Component {
  handleClick(){
    console.log(this.refs.boardRef)
    this.refs.boardRef.state.squares.fill(null)
    this.forceUpdate()
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board ref="boardRef"/>
        </div>
        <div className="game-info">
          <div>
            <ButtonPerso onClick={() => this.handleClick()}/>
          </div>
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

//fct helper
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
