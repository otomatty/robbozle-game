'use client';

import React from 'react';
import styles from './DirectionButton.module.css';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface DirectionButtonProps {
  direction: Direction;
  onDragStart: (event: React.DragEvent, direction: Direction) => void;
}

const DirectionButton: React.FC<DirectionButtonProps> = ({
  direction,
  onDragStart,
}) => {
  return (
    <div
      className={styles.direction}
      draggable
      onDragStart={(event) => onDragStart(event, direction)}
    >
      {direction}
    </div>
  );
};

export default DirectionButton;
