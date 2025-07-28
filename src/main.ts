import { GameApplication } from './game-application';

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Initialize game when page loads
const initializeGame = async (): Promise<void> => {
  try {
    const gameApp = new GameApplication();
    
    // Add canvas to DOM
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
      throw new Error('Game container element not found');
    }
    
    gameContainer.appendChild(gameApp.getCanvas());
    
    // Initialize game
    await gameApp.init();
    
    // Store reference globally for debugging (remove in production)
    (window as any).gameApp = gameApp;
    
  } catch (error) {
    console.error('Failed to initialize game:', error);
    
    // Display error message to user
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      gameContainer.innerHTML = `
        <div style="
          color: #e74c3c; 
          padding: 20px; 
          font-family: Arial, sans-serif;
          text-align: center;
        ">
          <h3>Game Failed to Load</h3>
          <p>Please refresh the page and try again.</p>
          <p style="font-size: 12px; opacity: 0.7;">Error: ${error}</p>
        </div>
      `;
    }
  }
};

// Start the game
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGame);
} else {
  initializeGame();
} 