
import React, { useState, useEffect } from 'react';
import Grid from '@/components/Grid';
import Controls from '@/components/Controls';
import Legend from '@/components/Legend';
import { generateRandomGrid, createDFSSteps, DFSStep } from '@/utils/dfsUtils';
import { toast } from '@/components/ui/use-toast';

const Islands: React.FC = () => {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [steps, setSteps] = useState<DFSStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Get the current step
  const currentStep = steps[currentStepIndex] || { 
    grid: [], 
    islandCount: 0, 
    message: "No steps generated yet" 
  };

  // Generate initial random grid
  useEffect(() => {
    generateNewGrid();
  }, []);

  // Handle generation of a new random grid
  const generateNewGrid = () => {
    if (rows < 2 || rows > 20 || columns < 2 || columns > 20) {
      toast({
        title: "Invalid grid size",
        description: "Please use a grid size between 2x2 and 20x20",
        variant: "destructive"
      });
      return;
    }

    const grid = generateRandomGrid(rows, columns);
    const dfsSteps = createDFSSteps(grid);
    setSteps(dfsSteps);
    setCurrentStepIndex(0);
  };

  // Handle rows change
  const handleRowsChange = (value: number) => {
    setRows(Math.max(2, Math.min(20, value)));
  };

  // Handle columns change
  const handleColumnsChange = (value: number) => {
    setColumns(Math.max(2, Math.min(20, value)));
  };

  // Step navigation
  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold text-center mb-12">Number of Islands</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
        <div className="w-full max-w-2xl">
          {currentStep.grid.length > 0 ? (
            <Grid grid={currentStep.grid} />
          ) : (
            <div className="min-h-[300px] flex items-center justify-center border rounded">
              <p>No grid generated yet.</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-4">
          <Controls
            rows={rows}
            columns={columns}
            onRowsChange={handleRowsChange}
            onColumnsChange={handleColumnsChange}
            onGenerateRandom={generateNewGrid}
            onStepPrevious={handlePreviousStep}
            onStepNext={handleNextStep}
            canStepPrevious={currentStepIndex > 0}
            canStepNext={currentStepIndex < steps.length - 1}
            islandCount={currentStep.islandCount}
            currentMessage={currentStep.message}
          />
          
          <Legend />
        </div>
      </div>
    </div>
  );
};

export default Islands;
