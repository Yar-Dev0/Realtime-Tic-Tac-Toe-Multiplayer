const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const players = {};
let gameState = Array(9).fill(null);
let currentPlayer = 'X';

wss.on('connection', (ws) => {
  const playerId = Object.keys(players).length + 1;
  players[playerId] = ws;
  ws.playerId = playerId;

  console.log(`Player ${playerId} connected`);

  const playerSymbol = playerId === 1 ? 'X' : 'O';
  ws.send(JSON.stringify({ type: 'assignSymbol', playerId, symbol: playerSymbol }));

  ws.send(JSON.stringify({ type: 'updateGameState', gameState }));

  if (Object.keys(players).length === 1) {
    broadcast(JSON.stringify({ type: 'waitingForPlayer' }));
  } else if (Object.keys(players).length === 2) {
    broadcast(JSON.stringify({ type: 'gameStart', currentPlayer }));
  }

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'makeMove') {
      const { index } = data;
      if (gameState[index] === null && currentPlayer === playerSymbol) {
        gameState[index] = playerSymbol;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        broadcast(JSON.stringify({ type: 'updateGameState', gameState, currentPlayer }));

        const winner = checkWinner();
        if (winner) {
          broadcast(JSON.stringify({ type: 'gameOver', winner }));
          resetGame();
        } else if (gameState.every(cell => cell !== null)) {
          broadcast(JSON.stringify({ type: 'gameOver', winner: 'draw' }));
          resetGame();
        }
      }
    } else if (data.type === 'restart') {
      resetGame();
      broadcast(JSON.stringify({ type: 'updateGameState', gameState, currentPlayer }));
    }
  });

  ws.on('close', () => {
    console.log(`Player ${playerId} disconnected`);
    delete players[playerId];
    resetGame();
    if (Object.keys(players).length === 1) {
      broadcast(JSON.stringify({ type: 'waitingForPlayer' }));
    }
  });
});

function broadcast(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a];
    }
  }
  return null;
}

function resetGame() {
  gameState = Array(9).fill(null);
  currentPlayer = 'X';
}

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});