import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [boardSize, setBoardSize] = useState(3);
  const [tempBoardSize, setTempBoardSize] = useState(boardSize);
  const [history, setHistory] = useState([
    { squares: Array(boardSize * boardSize).fill(null), move: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isXNext, setIsXNext] = useState(true);
  const [winners, setWinners] = useState([]);
  const [userSymbol, setUserSymbol] = useState("X");
  const [computerSymbol, setComputerSymbol] = useState("O");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const calculateWinner = (squares) => {
    const lines = [];
    const size = boardSize;

    for (let i = 0; i < size; i++) {
      lines.push(Array.from({ length: size }, (_, j) => i * size + j));
      lines.push(Array.from({ length: size }, (_, j) => i + j * size));
    }

    lines.push(Array.from({ length: size }, (_, i) => i * (size + 1)));
    lines.push(Array.from({ length: size }, (_, i) => (i + 1) * (size - 1)));

    for (let line of lines) {
      const firstSymbol = squares[line[0]];
      if (
        firstSymbol &&
        line.every((index) => squares[index] === firstSymbol)
      ) {
        return firstSymbol;
      }
    }
    return null;
  };

  const showWinnerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const handleClick = (i) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = isXNext ? userSymbol : computerSymbol;
    const row = Math.floor(i / boardSize) + 1;
    const col = (i % boardSize) + 1;

    const newHistory = currentHistory.concat([
      { squares, move: { row, col, player: squares[i] } },
    ]);
    setHistory(newHistory);
    setStepNumber(currentHistory.length);
    setIsXNext(!isXNext);

    const winner = calculateWinner(squares);
    if (winner) {
      setWinners([...winners, winner]);
      showWinnerPopup(`ผู้ชนะ: ${winner}`);
    } else if (squares.every((square) => square !== null)) {
      showWinnerPopup("เสมอ!");
    }
  };

  const resetGame = () => {
    setHistory([
      { squares: Array(boardSize * boardSize).fill(null), move: null },
    ]);
    setStepNumber(0);
    setIsXNext(true);
  };

  const changeBoardSize = (size) => {
    setTempBoardSize(size);
  };

  const confirmBoardSize = () => {
    setBoardSize(tempBoardSize);
    setHistory([
      { squares: Array(tempBoardSize * tempBoardSize).fill(null), move: null },
    ]);
    setStepNumber(0);
    setIsXNext(true);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setIsXNext(step % 2 === 0);
  };

  const handleSymbolChange = (symbol) => {
    setUserSymbol(symbol);
    setComputerSymbol(symbol === "X" ? "O" : "X");
    resetGame();
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const isBoardFull = current.squares.every((square) => square !== null);
  const status = winner
    ? `ผู้ชนะ: ${winner}`
    : isBoardFull
    ? "เสมอ!"
    : `ผู้เล่นถัดไป: ${isXNext ? userSymbol : computerSymbol}`;

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {current.squares[i]}
      </button>
    );
  };

  const renderBoard = () => {
    const rows = [];
    for (let i = 0; i < boardSize; i++) {
      const squaresInRow = [];
      for (let j = 0; j < boardSize; j++) {
        squaresInRow.push(renderSquare(i * boardSize + j));
      }
      rows.push(
        <div className="board-row" key={i}>
          {squaresInRow}
        </div>
      );
    }
    return rows;
  };

  const renderHistory = () => {
    return history.map((step, move) => {
      const desc = move
        ? `ย้อนกลับไปตา #${move} (${step.move.player} แถว ${step.move.row}, คอลัมน์ ${step.move.col})`
        : "เริ่มเกมใหม่";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });
  };

  return (
    <div className="container">
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>ผลลัพธ์</Modal.Title>
        </Modal.Header>
        <Modal.Body>{popupMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowPopup(false);
              resetGame();
            }}
          >
            เริ่มเกมใหม่
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="game">
        <Button
          variant="secondary"
          className="back-button"
          onClick={() => navigate("/")}
        >
          {" "}
          ← กลับ
        </Button>

        <div className="controls">
          <div className="symbol-selection">
            <label>เลือกสัญลักษณ์ของคุณ:</label>
            <div className="symbol-buttons">
              <button
                className={`symbol-button ${
                  userSymbol === "X" ? "active" : ""
                }`}
                onClick={() => handleSymbolChange("X")}
              >
                X
              </button>
              <button
                className={`symbol-button ${
                  userSymbol === "O" ? "active" : ""
                }`}
                onClick={() => handleSymbolChange("O")}
              >
                O
              </button>
            </div>
          </div>
          <div className="board-controls">
            <label>
              ขนาดบอร์ด:
              <input
                type="number"
                value={tempBoardSize}
                onChange={(e) => changeBoardSize(parseInt(e.target.value, 10))}
                min="3"
                max="99999"
              />
            </label>
            <button onClick={confirmBoardSize}>ยืนยันขนาดบอร์ด</button>
          </div>
        </div>
        <div className="game-board">
          <div className="status">{status}</div>
          {renderBoard()}
        </div>
      </div>
      <div className="game-info">
        <h3>ประวัติการเล่น</h3>
        <ol>{renderHistory()}</ol>
        <h3>ผู้ชนะ</h3>
        <ul>
          {winners.map((winner, index) => (
            <li key={index}>{winner}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
