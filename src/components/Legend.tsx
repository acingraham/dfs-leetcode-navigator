
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Legend: React.FC = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <CardTitle>Legend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[hsl(var(--water))] border border-gray-300"></div>
            <span className="text-sm">Water (0)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[hsl(var(--land))] border border-gray-300"></div>
            <span className="text-sm">Land (1)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[hsl(var(--current))] border border-gray-300"></div>
            <span className="text-sm">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[hsl(var(--visited))] border border-gray-300"></div>
            <span className="text-sm">Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[hsl(var(--dead-end))] border border-gray-300"></div>
            <span className="text-sm">Backtracking</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[hsl(var(--completed))] border border-gray-300"></div>
            <span className="text-sm">Completed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Legend;
