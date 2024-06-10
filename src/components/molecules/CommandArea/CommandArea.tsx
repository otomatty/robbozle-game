'use client';

import React from 'react';
import styles from './CommandArea.module.css';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Command = Direction | 'REPEAT';

interface CommandAreaProps {
  commands: Command[];
  onDrop: (event: React.DragEvent) => void;
  onDragOver: (event: React.DragEvent) => void;
  repeatEnabled: boolean;
  maxRepeatCommands: number;
}

const CommandArea: React.FC<CommandAreaProps> = ({
  commands,
  onDrop,
  onDragOver,
  repeatEnabled,
  maxRepeatCommands,
}) => {
  const repeatCommands = commands.filter(
    (command) => command === 'REPEAT'
  ).length;

  return (
    <div className={styles.commandArea}>
      <div className={styles.panel}>
        <p>Drag commands here:</p>
        <div
          className={styles.dropZone}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          {commands.map((command, index) => (
            <div key={index} className={styles.command}>
              {command}
            </div>
          ))}
        </div>
        {repeatEnabled && (
          <div className={styles.repeatPanel}>
            <p>Repeat commands here:</p>
            <div
              className={styles.dropZone}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              {commands.slice(0, maxRepeatCommands).map((command, index) => (
                <div key={index} className={styles.command}>
                  {command}
                </div>
              ))}
            </div>
            <p>
              {repeatCommands}/{maxRepeatCommands} commands
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandArea;
