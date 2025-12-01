/**
 * Utility to convert old Level format to new GameConfig format
 * Use this to migrate hardcoded levels to the new system
 */

import { Level } from '@/types/game';
import { RoverGameConfig } from '@/types/games';

export function convertLevelToRoverConfig(level: Level): RoverGameConfig {
  return {
    type: 'rover',
    title: level.title,
    description: level.description,
    difficulty: level.difficulty,
    initialCode: level.initialCode,
    gridSize: level.gridSize,
    startPosition: level.startPosition,
    startDirection: level.startDirection,
    targets: level.targets,
    obstacles: level.obstacles,
    requiredOutput: level.requiredOutput,
    maxMoves: level.maxMoves,
    instructions: level.instructions,
    hints: level.hints
  };
}

/**
 * Convert all levels from lib/levels.ts to game configs
 * Run this once to generate the new format
 */
export function convertAllLevels(levels: Level[]): RoverGameConfig[] {
  return levels.map(convertLevelToRoverConfig);
}

