'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { GameConfig, GameCompletionCallback } from '@/types/games';

// ============================================================================
// LAZY LOAD ALL GAME COMPONENTS
// This improves initial load time by only loading games when needed
// ============================================================================

const RoverGame = dynamic(() => import('./rover/RoverGame').then(mod => ({ default: mod.RoverGame })), {
  loading: () => <GameLoading />
});

const MathGame = dynamic(() => import('./math/MathGame').then(mod => ({ default: mod.MathGame })), {
  loading: () => <GameLoading />
});

const FractionPizzaGame = dynamic(() => import('./math/FractionPizzaGame').then(mod => ({ default: mod.FractionPizzaGame })), {
  loading: () => <GameLoading />
});

const MathRaceGame = dynamic(() => import('./math/MathRaceGame').then(mod => ({ default: mod.MathRaceGame })), {
  loading: () => <GameLoading />
});

const NumberLineGame = dynamic(() => import('./math/NumberLineGame').then(mod => ({ default: mod.NumberLineGame })), {
  loading: () => <GameLoading />
});

const EquationBalanceGame = dynamic(() => import('./math/EquationBalanceGame').then(mod => ({ default: mod.EquationBalanceGame })), {
  loading: () => <GameLoading />
});

const GeometryBuilderGame = dynamic(() => import('./math/GeometryBuilderGame').then(mod => ({ default: mod.GeometryBuilderGame })), {
  loading: () => <GameLoading />
});

const QuizGame = dynamic(() => import('./quiz/QuizGame').then(mod => ({ default: mod.QuizGame })), {
  loading: () => <GameLoading />
});

const CodeFixerGame = dynamic(() => import('./coding/CodeFixerGame').then(mod => ({ default: mod.CodeFixerGame })), {
  loading: () => <GameLoading />
});

const SpeedTyperGame = dynamic(() => import('./coding/SpeedTyperGame').then(mod => ({ default: mod.SpeedTyperGame })), {
  loading: () => <GameLoading />
});

const IndentPoliceGame = dynamic(() => import('./coding/IndentPoliceGame').then(mod => ({ default: mod.IndentPoliceGame })), {
  loading: () => <GameLoading />
});

const ParsonsPuzzleGame = dynamic(() => import('./coding/ParsonsPuzzleGame').then(mod => ({ default: mod.ParsonsPuzzleGame })), {
  loading: () => <GameLoading />
});

const LogicGatekeeperGame = dynamic(() => import('./logic/LogicGatekeeperGame').then(mod => ({ default: mod.LogicGatekeeperGame })), {
  loading: () => <GameLoading />
});

const RobotTurtleGame = dynamic(() => import('./logic/RobotTurtleGame').then(mod => ({ default: mod.RobotTurtleGame })), {
  loading: () => <GameLoading />
});

const SliceMasterGame = dynamic(() => import('./data/SliceMasterGame').then(mod => ({ default: mod.SliceMasterGame })), {
  loading: () => <GameLoading />
});

const MemoryMatchGame = dynamic(() => import('./data/MemoryMatchGame').then(mod => ({ default: mod.MemoryMatchGame })), {
  loading: () => <GameLoading />
});

const OutputPredictorGame = dynamic(() => import('./algorithm/OutputPredictorGame').then(mod => ({ default: mod.OutputPredictorGame })), {
  loading: () => <GameLoading />
});

const FillBlanksGame = dynamic(() => import('./algorithm/FillBlanksGame').then(mod => ({ default: mod.FillBlanksGame })), {
  loading: () => <GameLoading />
});

const VariableTracerGame = dynamic(() => import('./algorithm/VariableTracerGame').then(mod => ({ default: mod.VariableTracerGame })), {
  loading: () => <GameLoading />
});

// ============================================================================
// LOADING COMPONENT
// ============================================================================

function GameLoading() {
  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
      <div className="text-blue-400 font-mono font-bold text-xl animate-pulse">
        טוען משחק...
      </div>
    </div>
  );
}

// ============================================================================
// GAME RENDERER PROPS
// ============================================================================

interface GameRendererProps {
  config: GameConfig;
  onComplete: GameCompletionCallback;
  backUrl?: string;
}

// ============================================================================
// MAIN GAME RENDERER (Factory Component)
// ============================================================================

/**
 * GameRenderer - Central factory for rendering all game types
 * 
 * This component acts as a router/factory, dynamically rendering the appropriate
 * game component based on the game type in the config.
 * 
 * Usage:
 * ```tsx
 * <GameRenderer 
 *   config={lesson.gameConfig} 
 *   onComplete={(data) => handleGameComplete(data)}
 *   backUrl="/learn/course/module"
 * />
 * ```
 */
export function GameRenderer({ config, onComplete, backUrl }: GameRendererProps) {
  // Route to the appropriate game component based on type
  switch (config.type) {
    case 'rover':
      return <RoverGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'math':
      return <MathGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'fraction-pizza':
      return <FractionPizzaGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'math-race':
      return <MathRaceGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'number-line':
      return <NumberLineGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'equation-balance':
      return <EquationBalanceGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'geometry-builder':
      return <GeometryBuilderGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'quiz':
      return <QuizGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'code-fixer':
      return <CodeFixerGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'speed-typer':
      return <SpeedTyperGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'indent-police':
      return <IndentPoliceGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'parsons-puzzle':
      return <ParsonsPuzzleGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'logic-gatekeeper':
      return <LogicGatekeeperGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'robot-turtle':
      return <RobotTurtleGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'slice-master':
      return <SliceMasterGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'memory-match':
      return <MemoryMatchGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'output-predictor':
      return <OutputPredictorGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'fill-blanks':
      return <FillBlanksGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    case 'variable-tracer':
      return <VariableTracerGame config={config} onComplete={onComplete} backUrl={backUrl} />;
    
    default:
      // TypeScript should catch this, but just in case
      return (
        <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
          <div className="text-red-400 font-mono font-bold text-xl">
            Unknown game type: {(config as GameConfig).type}
          </div>
        </div>
      );
  }
}

