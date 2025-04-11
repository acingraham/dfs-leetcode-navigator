
// Types for our grid visualization
export interface Cell {
  value: number;
  state: CellState;
  arrowDirection?: ArrowDirection;
}

export type CellState = 'unvisited' | 'visited' | 'current' | 'dead-end' | 'completed';
export type ArrowDirection = 'up' | 'down' | 'left' | 'right' | 'check';

export interface DFSStep {
  grid: Cell[][];
  islandCount: number;
  message: string;
  position?: [number, number];
}

// Generate a random grid filled with 1s and 0s
export const generateRandomGrid = (rows: number, cols: number): Cell[][] => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      value: Math.random() > 0.4 ? 1 : 0,
      state: 'unvisited',
    }))
  );
};

// Clone grid for immutable updates
export const cloneGrid = (grid: Cell[][]): Cell[][] => {
  return grid.map(row => row.map(cell => ({ ...cell })));
};

// Function that creates all DFS steps for visualization
export const createDFSSteps = (grid: Cell[][]): DFSStep[] => {
  const steps: DFSStep[] = [];
  const rows = grid.length;
  const cols = grid[0].length;
  
  // Initialize a visited array
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => false)
  );
  
  let islandCount = 0;
  let currentGrid = grid.map(row => row.map(cell => ({ ...cell })));
  
  // Add initial step
  steps.push({
    grid: currentGrid,
    islandCount: 0,
    message: "Starting DFS traversal to find islands."
  });
  
  // Helper function to check if a cell is valid and unvisited land
  const isValidUnvisitedLand = (r: number, c: number): boolean => {
    return (
      r >= 0 && r < rows &&
      c >= 0 && c < cols &&
      currentGrid[r][c].value === 1 &&
      !visited[r][c]
    );
  };
  
  // DFS helper function
  const dfs = (r: number, c: number): void => {
    // Directions for exploration: up, right, down, left
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    const directionNames: ArrowDirection[] = ['up', 'right', 'down', 'left'];
    
    // Mark as visited and current
    visited[r][c] = true;
    currentGrid = cloneGrid(currentGrid);
    currentGrid[r][c].state = 'current';
    
    steps.push({
      grid: currentGrid,
      islandCount,
      message: `Visiting cell (${r}, ${c})`,
      position: [r, c]
    });
    
    // Explore all 4 directions
    for (let i = 0; i < directions.length; i++) {
      const [dr, dc] = directions[i];
      const newR = r + dr;
      const newC = c + dc;
      
      // If next cell is valid unvisited land
      if (isValidUnvisitedLand(newR, newC)) {
        // Mark the direction we're going
        currentGrid = cloneGrid(currentGrid);
        currentGrid[r][c].arrowDirection = directionNames[i];
        
        steps.push({
          grid: currentGrid,
          islandCount,
          message: `Moving ${directionNames[i]} from (${r}, ${c}) to (${newR}, ${newC})`,
          position: [r, c]
        });
        
        // Continue DFS from the new cell
        dfs(newR, newC);
        
        // Mark the direction we're returning from
        currentGrid = cloneGrid(currentGrid);
        const returnDirection: ArrowDirection = 
          directionNames[i] === 'up' ? 'down' :
          directionNames[i] === 'right' ? 'left' :
          directionNames[i] === 'down' ? 'up' : 'right';
          
        currentGrid[newR][newC].arrowDirection = returnDirection;
        currentGrid[newR][newC].state = 'dead-end';
        
        steps.push({
          grid: currentGrid,
          islandCount,
          message: `Backtracking from (${newR}, ${newC}) to (${r}, ${c})`,
          position: [newR, newC]
        });
      }
    }
    
    // Mark as fully visited
    currentGrid = cloneGrid(currentGrid);
    currentGrid[r][c].state = 'visited';
    
    steps.push({
      grid: currentGrid,
      islandCount,
      message: `Completed exploration of (${r}, ${c})`,
      position: [r, c]
    });
  };
  
  // Main loop to find all islands
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (currentGrid[r][c].value === 1 && !visited[r][c]) {
        islandCount++;
        
        // Add step for finding a new island
        currentGrid = cloneGrid(currentGrid);
        steps.push({
          grid: currentGrid,
          islandCount,
          message: `Found island #${islandCount} starting at (${r}, ${c})`,
          position: [r, c]
        });
        
        // Explore the entire island
        dfs(r, c);
        
        // Mark cells of the island as completed
        currentGrid = cloneGrid(currentGrid);
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            if (visited[i][j] && currentGrid[i][j].state === 'visited') {
              currentGrid[i][j].state = 'completed';
            }
          }
        }
        
        // Add a step after completing an island
        steps.push({
          grid: currentGrid,
          islandCount,
          message: `Finished processing island #${islandCount}`,
        });
      }
    }
  }
  
  // Add final step
  steps.push({
    grid: currentGrid,
    islandCount,
    message: `DFS traversal complete. Found ${islandCount} island${islandCount !== 1 ? 's' : ''}`,
  });
  
  return steps;
};
