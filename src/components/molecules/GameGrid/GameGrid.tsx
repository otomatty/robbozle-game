'use client';

import React from 'react';
import styles from './GameGrid.module.css';

interface GameGridProps {
  layout: number[][];
}

const GameGrid: React.FC<GameGridProps> = ({ layout }) => {
  return (
    <div className={styles.grid}>
      {layout.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          let cellClass = styles.cell;
          if (cell === 1) cellClass += ` ${styles.obstacle}`;
          if (cell === 2) cellClass += ` ${styles.player}`;
          if (cell === 3) cellClass += ` ${styles.goal}`;
          return (
            <div key={`${rowIndex}-${colIndex}`} className={cellClass}></div>
          );
        })
      )}
    </div>
  );
};

export default GameGrid;
