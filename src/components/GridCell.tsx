
import React from 'react';
import { Cell } from '../utils/dfsUtils';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GridCellProps {
  cell: Cell;
}

const GridCell: React.FC<GridCellProps> = ({ cell }) => {
  const getCellColor = () => {
    if (cell.value === 0) return 'bg-[hsl(var(--water))]';
    
    switch (cell.state) {
      case 'current': return 'bg-[hsl(var(--current))]';
      case 'visited': return 'bg-[hsl(var(--visited))]';
      case 'dead-end': return 'bg-[hsl(var(--dead-end))]';
      case 'completed': return 'bg-[hsl(var(--completed))]';
      default: return 'bg-[hsl(var(--land))]';
    }
  };
  
  const renderArrow = () => {
    if (!cell.arrowDirection) return null;
    
    switch (cell.arrowDirection) {
      case 'up': return <ArrowUp className="w-6 h-6" />;
      case 'down': return <ArrowDown className="w-6 h-6" />;
      case 'left': return <ArrowLeft className="w-6 h-6" />;
      case 'right': return <ArrowRight className="w-6 h-6" />;
      case 'check': return <Check className="w-6 h-6 text-purple-800" />;
      default: return null;
    }
  };
  
  return (
    <div 
      className={cn(
        "flex items-center justify-center aspect-square border border-gray-300 text-lg font-medium relative",
        getCellColor()
      )}
    >
      {cell.value}
      <div className="absolute inset-0 flex items-center justify-center text-gray-800">
        {renderArrow()}
      </div>
    </div>
  );
};

export default GridCell;
