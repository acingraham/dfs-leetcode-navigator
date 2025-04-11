
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ControlsProps {
  rows: number;
  columns: number;
  onRowsChange: (value: number) => void;
  onColumnsChange: (value: number) => void;
  onGenerateRandom: () => void;
  onStepPrevious: () => void;
  onStepNext: () => void;
  canStepPrevious: boolean;
  canStepNext: boolean;
  islandCount: number;
  currentMessage: string;
}

const Controls: React.FC<ControlsProps> = ({
  rows,
  columns,
  onRowsChange,
  onColumnsChange,
  onGenerateRandom,
  onStepPrevious,
  onStepNext,
  canStepPrevious,
  canStepNext,
  islandCount,
  currentMessage
}) => {
  return (
    <div className="flex flex-col space-y-4 w-full max-w-md">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Grid Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="rows" className="block text-sm font-medium mb-1">
                Rows
              </label>
              <Input
                id="rows"
                type="number"
                min="2"
                max="20"
                value={rows}
                onChange={(e) => onRowsChange(parseInt(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="columns" className="block text-sm font-medium mb-1">
                Columns
              </label>
              <Input
                id="columns"
                type="number"
                min="2"
                max="20"
                value={columns}
                onChange={(e) => onColumnsChange(parseInt(e.target.value))}
              />
            </div>
          </div>
          <Button 
            className="w-full mt-4" 
            onClick={onGenerateRandom}
          >
            Generate Random
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-4">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              size="icon"
              onClick={onStepPrevious}
              disabled={!canStepPrevious}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium">Step</div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={onStepNext}
              disabled={!canStepNext}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Island Count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-center">{islandCount}</div>
          <div className="mt-2 text-sm text-muted-foreground text-center">
            {currentMessage}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Controls;
