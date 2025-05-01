---

# Realtime Tic-Tac-Toe Multiplayer

A real-time multiplayer Tic-Tac-Toe game built using **Node.js** and **WebSockets**. Players can join the game from different browsers or devices and play against each other in real-time.

---

## Features

- **Real-Time Multiplayer**: Two players can play against each other in real-time using WebSockets.
- **Interactive UI**: Clean and modern user interface with animations and hover effects.
- **Player Information**: Displays player symbols (`X` and `O`) and their status.
- **Game Status Updates**: Shows the current player's turn and game results (win, lose, or draw).
- **Restart Game**: Players can restart the game after it ends.

---

## Technologies Used

- **Backend**: Node.js, Express, WebSocket (`ws` library).
- **Frontend**: HTML, CSS, JavaScript.
- **Real-Time Communication**: WebSockets for real-time updates.

---

## How to Play

1. **Start the Server**:
   - Clone the repository and navigate to the project directory.
   - Run the server using the following command:
     ```bash
     node server.js
     ```

2. **Join the Game**:
   - Open the `index.html` file in two different browsers or tabs to simulate two players.
   - Player 1 will be assigned `X`, and Player 2 will be assigned `O`.

3. **Play the Game**:
   - Players take turns clicking on the board to place their symbols (`X` or `O`).
   - The game will automatically detect a win or a draw and display the result.

4. **Restart the Game**:
   - After the game ends, click the **Restart Game** button to start a new game.

---

## Project Structure

```
Realtime-Tic-Tac-Toe-Multiplayer/
├── server.js              # Backend server using Node.js and WebSocket
├── index.html             # Frontend HTML file for the game UI
├── README.md              # Project documentation
├── package.json           # Node.js dependencies and project metadata
└── node_modules/          # Installed dependencies
```

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/Realtime-Tic-Tac-Toe-Multiplayer.git
   cd Realtime-Tic-Tac-Toe-Multiplayer
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Server**:
   ```bash
   node server.js
   ```

4. **Open the Game**:
   - Open `index.html` in your browser or navigate to `http://localhost:3000` (if serving the file via Express).

## How It Works

1. **Server-Side**:
   - The server manages the game state and broadcasts updates to all connected clients using WebSockets.
   - It assigns symbols (`X` and `O`) to players and ensures turns are alternated correctly.
   - The server checks for a win or draw after each move and notifies the clients.

2. **Client-Side**:
   - The frontend interacts with the server using WebSockets to send and receive real-time updates.
   - Players can click on the board to make moves, and the UI updates dynamically.

---

## Future Improvements

- **Leaderboard**: Track wins and losses for each player.
- **Chat Feature**: Allow players to chat during the game.
- **Mobile Support**: Optimize the UI for mobile devices.
- **Room-Based Matchmaking**: Allow players to create and join private rooms.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to the branch.
4. Submit a pull request.
