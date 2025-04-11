
import React from 'react';
import GridCell from './GridCell';
import { Cell } from '../utils/dfsUtils';

interface GridProps {
  grid: Cell[][];
}

const Grid: React.FC<GridProps> = ({ grid }) => {
  return (
    <div className="grid gap-[1px]" style={{ 
      gridTemplateRows: `repeat(${grid.length}, 1fr)`,
      gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`
    }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <GridCell 
            key={`${rowIndex}-${colIndex}`} 
            cell={cell} 
          />
        ))
      )}
    </div>
  );
};

export default Grid;
