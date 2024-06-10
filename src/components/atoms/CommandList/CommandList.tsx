'use client';

import React from 'react';
import styles from './CommandList.module.css';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Command = Direction | 'REPEAT';

interface CommandListProps {
  commands: Command[];
  onDrop: (event: React.DragEvent) => void;
  onDragOver: (event: React.DragEvent) => void;
}

const CommandList: React.FC<CommandListProps> = ({
  commands,
  onDrop,
  onDragOver,
}) => {
  return (
    <div className={styles.commands} onDrop={onDrop} onDragOver={onDragOver}>
      {commands.map((command, index) => (
        <div key={index} className={styles.command}>
          {command}
        </div>
      ))}
    </div>
  );
};

export default CommandList;
