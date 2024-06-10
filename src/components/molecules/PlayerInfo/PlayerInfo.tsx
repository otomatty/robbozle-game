'use client';

import React from 'react';
import styles from './PlayerInfo.module.css';

interface Player {
  x: number;
  y: number;
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
}

interface PlayerInfoProps {
  player: Player;
  message: string;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, message }) => {
  return (
    <div className={styles.playerInfo}>
      <p>
        Player Position: ({player.x}, {player.y})
      </p>
      <p>Player Direction: {player.direction}</p>
      <p>{message}</p>
    </div>
  );
};

export default PlayerInfo;
