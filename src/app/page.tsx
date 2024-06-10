'use client';

import { useState, useEffect } from 'react';
import GameScreen from '../components/organisms/GameScreen/GameScreen';
import CommandArea from '../components/molecules/CommandArea/CommandArea';
import PlayerInfo from '../components/molecules/PlayerInfo/PlayerInfo';
import DirectionButton from '../components/atoms/DirectionButton/DirectionButton';
import styles from './page.module.css';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Command = Direction | 'REPEAT';

interface Player {
  x: number;
  y: number;
  direction: Direction;
}

interface Stage {
  id: number;
  layout: number[][];
  repeatEnabled: boolean;
  maxRepeatCommands: number;
  initialPlayer: Player; // Added initialPlayer property
}

const directions: Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
const commandsList: Command[] = [...directions, 'REPEAT'];

const Game = () => {
  const [player, setPlayer] = useState<Player>({ x: 0, y: 0, direction: 'UP' });
  const [message, setMessage] = useState<string>('');
  const [commands, setCommands] = useState<Command[]>([]);
  const [repeatEnabled, setRepeatEnabled] = useState<boolean>(true);
  const [maxRepeatCommands, setMaxRepeatCommands] = useState<number>(5);
  const [stages, setStages] = useState<Stage[]>([]);
  const [currentStage, setCurrentStage] = useState<Stage | null>(null);

  useEffect(() => {
    // ステージデータを読み込む
    fetch('/stages.json')
      .then((response) => response.json())
      .then((data) => {
        setStages(data);
        if (data.length > 0) {
          setCurrentStage(data[0]);
        }
      });
  }, []);

  useEffect(() => {
    if (currentStage) {
      const initialPlayerPosition = currentStage.initialPlayer;
      setPlayer(initialPlayerPosition);
      setRepeatEnabled(currentStage.repeatEnabled);
      setMaxRepeatCommands(currentStage.maxRepeatCommands);
      setCommands([]);
      setMessage('');
    }
  }, [currentStage]);

  const findInitialPlayerPosition = (layout: number[][]): Player => {
    for (let y = 0; y < layout.length; y++) {
      for (let x = 0; x < layout[y].length; x++) {
        if (layout[y][x] === 2) {
          return { x, y, direction: 'UP' };
        }
      }
    }
    return { x: 0, y: 0, direction: 'UP' };
  };

  const movePlayer = (direction: Direction) => {
    setPlayer((prevPlayer) => {
      let { x, y } = prevPlayer;
      switch (direction) {
        case 'UP':
          y -= 1;
          break;
        case 'DOWN':
          y += 1;
          break;
        case 'LEFT':
          x -= 1;
          break;
        case 'RIGHT':
          x += 1;
          break;
      }
      const newPlayer = { ...prevPlayer, x, y, direction };
      if (checkGoal(newPlayer)) {
        setMessage('Goal reached!');
      }
      return newPlayer;
    });
  };

  const checkGoal = (player: Player) => {
    return currentStage && currentStage.layout[player.y][player.x] === 3;
  };

  const handleDragStart = (event: React.DragEvent, command: Command) => {
    event.dataTransfer.setData('command', command);
  };

  const handleDrop = (event: React.DragEvent) => {
    const command = event.dataTransfer.getData('command') as Command;
    setCommands((prevCommands) => [...prevCommands, command]);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const executeCommands = () => {
    let repeatCommands: Command[] = [];
    let inRepeat = false;

    commands.forEach((command, index) => {
      setTimeout(() => {
        if (command === 'REPEAT') {
          if (inRepeat) {
            repeatCommands.forEach((repeatCommand) =>
              movePlayer(repeatCommand as Direction)
            );
            repeatCommands = [];
            inRepeat = false;
          } else {
            inRepeat = true;
          }
        } else {
          if (inRepeat) {
            repeatCommands.push(command);
          } else {
            movePlayer(command as Direction);
          }
        }
      }, index * 500); // 0.5秒ごとに次のコマンドを実行
    });
  };

  const resetCommands = () => {
    setCommands([]);
    if (currentStage) {
      setPlayer(currentStage.initialPlayer);
    }
    setMessage('');
  };

  const changeStage = (stageId: number) => {
    const stage = stages.find((s) => s.id === stageId);
    if (stage) {
      setCurrentStage(stage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <GameScreen
          player={player}
          layout={currentStage?.layout || []}
          commands={commands}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
      </div>
      <div className={styles.rightPanel}>
        <CommandArea
          commands={commands}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          repeatEnabled={repeatEnabled}
          maxRepeatCommands={maxRepeatCommands}
        />
        <div>
          {commandsList.map((command) => (
            <DirectionButton
              key={command}
              direction={command as Direction}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
        <button onClick={executeCommands}>Execute</button>
        <button onClick={resetCommands}>Reset</button>
        <PlayerInfo player={player} message={message} />
        <div>
          <h2>Change Stage</h2>
          {stages.map((stage) => (
            <button key={stage.id} onClick={() => changeStage(stage.id)}>
              Stage {stage.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
