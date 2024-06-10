'use client';

import React from 'react';
import GameGrid from '../../molecules/GameGrid/GameGrid';
import CommandList from '../../atoms/CommandList/CommandList';
import styles from './GameScreen.module.css';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface Player {
  x: number;
  y: number;
  direction: Direction;
}

interface GameScreenProps {
  player: Player;
  layout: number[][];
  commands: (Direction | 'REPEAT')[];
  onDrop: (event: React.DragEvent) => void;
  onDragOver: (event: React.DragEvent) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  player,
  layout,
  commands,
  onDrop,
  onDragOver,
}) => {
  return (
    <div className={styles.gameScreen}>
      <GameGrid layout={layout} />
      <CommandList
        commands={commands}
        onDrop={onDrop}
        onDragOver={onDragOver}
      />
    </div>
  );
};

export default GameScreen;
