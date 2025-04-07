import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, Terminal, Brain, KeyRound, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

interface GamesProps {
  setScore: (game: string, points: number) => void;
}

// Memory Hack Game
const MemoryHack: React.FC<{ onScore: (points: number) => void }> = ({ onScore }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [level, setLevel] = useState(1);
  const [showSequence, setShowSequence] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('memoryHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  const colors = [
    { name: 'Red', bg: 'bg-red-500', border: 'border-red-600', hover: 'hover:bg-red-600' },
    { name: 'Blue', bg: 'bg-blue-500', border: 'border-blue-600', hover: 'hover:bg-blue-600' },
    { name: 'Green', bg: 'bg-green-500', border: 'border-green-600', hover: 'hover:bg-green-600' },
    { name: 'Yellow', bg: 'bg-yellow-500', border: 'border-yellow-600', hover: 'hover:bg-yellow-600' }
  ];

  const resetGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setLevel(1);
    setGameOver(false);
    setShowSequence(false);
    setIsPlaying(false);
  };

  const startGame = () => {
    resetGame();
    setIsPlaying(true);
    generateSequence([]);
  };

  const generateSequence = (currentSequence: number[]) => {
    const newSequence = [...currentSequence, Math.floor(Math.random() * 4)];
    setSequence(newSequence);
    playSequence(newSequence);
  };

  const playSequence = async (seq: number[]) => {
    setShowSequence(true);
    setPlayerSequence([]);
    
    for (let i = 0; i < seq.length; i++) {
      const button = document.getElementById(`hack-button-${seq[i]}`);
      if (button) {
        button.classList.add(colors[seq[i]].bg);
        await new Promise(resolve => setTimeout(resolve, 500));
        button.classList.remove(colors[seq[i]].bg);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    setShowSequence(false);
  };

  const handleButtonClick = (index: number) => {
    if (!isPlaying || showSequence || gameOver) return;

    const button = document.getElementById(`hack-button-${index}`);
    if (button) {
      button.classList.add(colors[index].bg);
      setTimeout(() => button.classList.remove(colors[index].bg), 200);
    }

    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);

    // Check if the player made a mistake
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameOver(true);
      setIsPlaying(false);
      onScore(-5);
      return;
    }

    // Check if the player completed the sequence
    if (newPlayerSequence.length === sequence.length) {
      const newScore = level * 10;
      onScore(newScore);
      if (level > highScore) {
        setHighScore(level);
        localStorage.setItem('memoryHighScore', level.toString());
      }
      setLevel(level + 1);
      setPlayerSequence([]);
      setTimeout(() => generateSequence(sequence), 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold">Memory Hack</h3>
        <div className="flex justify-center gap-4 text-sm">
          <span className="text-primary">Level: {level}</span>
          <span className="text-secondary">High Score: {highScore}</span>
        </div>
        {isPlaying && (
          <p className="text-sm text-muted-foreground">
            {showSequence ? 'Watch the sequence...' : `Repeat the sequence! (${playerSequence.length}/${sequence.length})`}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        {colors.map((color, index) => (
          <button
            key={index}
            id={`hack-button-${index}`}
            disabled={showSequence || !isPlaying || gameOver}
            onClick={() => handleButtonClick(index)}
            className={`
              w-full h-24 rounded-lg border-2 transition-all duration-200
              ${color.border} bg-background
              ${!showSequence && !gameOver && isPlaying ? color.hover : ''}
              disabled:opacity-50 disabled:cursor-not-allowed
              relative overflow-hidden
            `}
          >
            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium opacity-50">
              {color.name}
            </span>
          </button>
        ))}
      </div>

      <div className="text-center space-y-4">
        {gameOver ? (
          <>
            <p className="text-destructive font-medium">Game Over! Score: {(level - 1) * 10}</p>
            <Button onClick={startGame} variant="outline" className="w-full">
              Try Again
            </Button>
          </>
        ) : !isPlaying ? (
          <Button onClick={startGame} className="w-full">
            Start Game
          </Button>
        ) : null}
      </div>

      {isPlaying && (
        <div className="text-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              if (confirm('Are you sure you want to reset the game?')) {
                resetGame();
              }
            }}
          >
            Reset Game
          </Button>
        </div>
      )}
    </div>
  );
};

// Code Breaker Game
const CodeBreaker: React.FC<{ onScore: (points: number) => void }> = ({ onScore }) => {
  const [code, setCode] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>(Array(4).fill(''));
  const [activeCell, setActiveCell] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [feedback, setFeedback] = useState<Array<{ positions: ('correct' | 'misplaced' | 'wrong')[] }>>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const startGame = () => {
    const newCode = Array.from({ length: 4 }, () => 
      Math.floor(Math.random() * 10).toString()
    );
    setCode(newCode);
    setGameActive(true);
    setAttempts([]);
    setFeedback([]);
    setCurrentGuess(Array(4).fill(''));
    setActiveCell(0);
    setGameWon(false);
    inputRefs.current[0]?.focus();
  };

  const handleInput = (index: number, value: string) => {
    if (!gameActive || gameWon) return;
    
    const newGuess = [...currentGuess];
    newGuess[index] = value;
    setCurrentGuess(newGuess);

    if (value && index < 3) {
      setActiveCell(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !currentGuess[index] && index > 0) {
      setActiveCell(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const submitGuess = () => {
    if (!gameActive || gameWon || currentGuess.some(g => g === '')) return;

    const guess = currentGuess.join('');
    const newAttempts = [...attempts, guess];
    setAttempts(newAttempts);

    const positions = currentGuess.map((digit, index) => {
      if (digit === code[index]) return 'correct';
      if (code.includes(digit)) return 'misplaced';
      return 'wrong';
    });

    const newFeedback = [...feedback, { positions }];
    setFeedback(newFeedback);

    if (positions.every(p => p === 'correct')) {
      setGameWon(true);
      setGameActive(false);
      onScore(Math.max(100 - (attempts.length * 20), 20));
    } else if (newAttempts.length >= 5) {
      setGameActive(false);
      onScore(-10);
    }

    setCurrentGuess(Array(4).fill(''));
    setActiveCell(0);
    inputRefs.current[0]?.focus();
  };

  const getDigitStyle = (status: 'correct' | 'misplaced' | 'wrong') => {
    switch (status) {
      case 'correct':
        return 'bg-green-500/20 border-green-500 text-green-500';
      case 'misplaced':
        return 'bg-yellow-500/20 border-yellow-500 text-yellow-500';
      default:
        return 'bg-muted border-muted-foreground/20';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Code Breaker</h3>
        <p className="text-sm text-muted-foreground">
          {gameActive ? `${5 - attempts.length} attempts remaining` : 'Crack the 4-digit code'}
        </p>
      </div>

      <div className="space-y-4">
        {/* Previous Attempts */}
        <div className="space-y-2">
          {attempts.map((attempt, i) => (
            <div key={i} className="flex justify-center gap-2">
              {attempt.split('').map((digit, j) => (
                <div
                  key={j}
                  className={`w-10 h-10 flex items-center justify-center border-2 rounded font-mono text-lg transition-colors ${getDigitStyle(feedback[i].positions[j])}`}
                >
                  {digit}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Current Input */}
        <div className="flex justify-center gap-2">
          {currentGuess.map((digit, i) => (
            <input
              key={i}
              ref={el => inputRefs.current[i] = el}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInput(i, e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`w-10 h-10 text-center border-2 rounded font-mono text-lg
                ${i === activeCell ? 'border-primary' : 'border-muted'}
                bg-background focus:outline-none focus:ring-1 focus:ring-primary`}
              disabled={!gameActive || gameWon}
            />
          ))}
        </div>

        <Button
          onClick={gameActive ? submitGuess : startGame}
          className="w-full"
          disabled={gameActive && currentGuess.some(g => g === '')}
        >
          {gameActive ? 'Submit Guess' : 'Start Game'}
        </Button>

        {!gameActive && (
          <div className="text-center text-sm">
            {gameWon ? (
              <p className="text-green-500">Congratulations! You cracked the code!</p>
            ) : attempts.length >= 5 ? (
              <p className="text-destructive">Game Over! The code was {code.join('')}</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

// Color Match Game
const ColorMatch: React.FC<{ onScore: (points: number) => void }> = ({ onScore }) => {
  const [targetColor, setTargetColor] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef<number>();

  const generateColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const generateOptions = (correct: string) => {
    const opts = [correct];
    while (opts.length < 4) {
      const newColor = generateColor();
      if (!opts.includes(newColor)) {
        opts.push(newColor);
      }
    }
    return opts.sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    const newTarget = generateColor();
    setTargetColor(newTarget);
    setOptions(generateOptions(newTarget));
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameActive(false);
          onScore(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleGuess = (color: string) => {
    if (color === targetColor) {
      setScore(score + 10);
      const newTarget = generateColor();
      setTargetColor(newTarget);
      setOptions(generateOptions(newTarget));
    } else {
      setScore(Math.max(0, score - 5));
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Color Match</h3>
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <span>Score: {score}</span>
          <span>Time: {timeLeft}s</span>
        </div>
      </div>

      {gameActive ? (
        <>
          <div 
            className="h-24 rounded-lg border-2 border-muted"
            style={{ backgroundColor: targetColor }}
          />
          <div className="grid grid-cols-2 gap-2">
            {options.map((color, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-12 relative overflow-hidden"
                onClick={() => handleGuess(color)}
              >
                <div 
                  className="absolute inset-2 rounded"
                  style={{ backgroundColor: color }}
                />
              </Button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Match the target color with one of the options below. Score points for correct matches!
          </p>
          <Button onClick={startGame} className="w-full">
            Start Game
          </Button>
          {score > 0 && (
            <p className="text-sm">Final Score: {score}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Terminal Game
const TerminalGame: React.FC<{ onScore: (points: number) => void }> = ({ onScore }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [gameState, setGameState] = useState<{
    inGame: boolean;
    currentGame?: string;
    data?: any;
  }>({ inGame: false });

  const games = {
    guess: {
      init: () => ({
        number: Math.floor(Math.random() * 100) + 1,
        attempts: 0,
        maxAttempts: 7
      }),
      process: (input: string, data: any) => {
        const guess = parseInt(input);
        data.attempts++;

        if (isNaN(guess)) {
          return { output: 'Please enter a valid number', continue: true };
        }

        if (guess === data.number) {
          const points = Math.max(50 - (data.attempts * 5), 10);
          onScore(points);
          return {
            output: `Congratulations! You found the number in ${data.attempts} attempts!`,
            continue: false
          };
        }

        if (data.attempts >= data.maxAttempts) {
          onScore(-5);
          return {
            output: `Game Over! The number was ${data.number}`,
            continue: false
          };
        }

        return {
          output: `${guess > data.number ? 'Lower' : 'Higher'}! ${data.maxAttempts - data.attempts} attempts remaining`,
          continue: true
        };
      }
    },
    unscramble: {
      init: () => {
        const words = ['HACK', 'CYBER', 'SECURE', 'CODE', 'BINARY', 'SYSTEM'];
        const word = words[Math.floor(Math.random() * words.length)];
        return {
          word,
          scrambled: word.split('').sort(() => Math.random() - 0.5).join(''),
          attempts: 0,
          maxAttempts: 5
        };
      },
      process: (input: string, data: any) => {
        data.attempts++;

        if (input.toUpperCase() === data.word) {
          const points = Math.max(30 - (data.attempts * 5), 10);
          onScore(points);
          return {
            output: `Correct! You unscrambled the word in ${data.attempts} attempts!`,
            continue: false
          };
        }

        if (data.attempts >= data.maxAttempts) {
          onScore(-5);
          return {
            output: `Game Over! The word was ${data.word}`,
            continue: false
          };
        }

        return {
          output: `Wrong! ${data.maxAttempts - data.attempts} attempts remaining`,
          continue: true
        };
      }
    }
  };

  const commands: { [key: string]: (...args: string[]) => void } = {
    help: () => {
      setOutput([...output, 'Available commands:', 'games - List available games', 'play <game> - Start a game', 'exit - Exit current game', 'clear - Clear terminal']);
    },
    games: () => {
      setOutput([...output, 'Available games:', '- guess: Guess the number between 1-100', '- unscramble: Unscramble the word']);
    },
    play: (game: string) => {
      if (gameState.inGame) {
        setOutput([...output, 'Please exit the current game first']);
        return;
      }

      if (game in games) {
        const data = games[game as keyof typeof games].init();
        setGameState({ inGame: true, currentGame: game, data });
        setOutput([
          ...output,
          game === 'guess' 
            ? 'Guess the number between 1-100'
            : `Unscramble this word: ${data.scrambled}`
        ]);
      } else {
        setOutput([...output, 'Unknown game. Type "games" to see available games']);
      }
    },
    exit: () => {
      if (gameState.inGame) {
        setGameState({ inGame: false });
        setOutput([...output, 'Game ended']);
      } else {
        setOutput([...output, 'No active game']);
      }
    },
    clear: () => {
      setOutput([]);
    }
  };

  const handleCommand = (cmd: string) => {
    setOutput([...output, `> ${cmd}`]);

    if (gameState.inGame) {
      const game = games[gameState.currentGame as keyof typeof games];
      const result = game.process(cmd, gameState.data);
      setOutput(prev => [...prev, result.output]);
      
      if (!result.continue) {
        setGameState({ inGame: false });
      }
    } else {
      const [command, ...args] = cmd.toLowerCase().trim().split(' ');
      if (command in commands) {
        commands[command](...args);
      } else {
        setOutput(prev => [...prev, 'Unknown command. Type "help" for available commands']);
      }
    }

    setInput('');
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Terminal Games</h3>
        <p className="text-sm text-muted-foreground">Type "help" for available commands</p>
      </div>

      <div className="min-h-[200px] max-h-[200px] overflow-y-auto border rounded-md p-4 font-mono bg-card">
        {output.map((line, i) => (
          <div key={i} className="text-sm">{line}</div>
        ))}
        <div className="flex gap-2 items-center">
          <span className="text-primary">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                handleCommand(input.trim());
              }
            }}
            className="flex-1 bg-transparent border-none focus:outline-none"
            placeholder="Type a command..."
          />
        </div>
      </div>
    </div>
  );
};

export function Games({ setScore }: GamesProps) {
  const games = [
    {
      id: 'memory-hack',
      name: 'Memory Hack',
      description: 'Test your memory by repeating the hack sequence',
      icon: <Brain className="w-5 h-5 text-primary" />,
      component: MemoryHack
    },
    {
      id: 'code-breaker',
      name: 'Code Breaker',
      description: 'Break the security code using logic and deduction',
      icon: <KeyRound className="w-5 h-5 text-secondary" />,
      component: CodeBreaker
    },
    {
      id: 'color-match',
      name: 'Color Match',
      description: 'Test your color perception skills',
      icon: <Palette className="w-5 h-5 text-accent" />,
      component: ColorMatch
    },
    {
      id: 'terminal',
      name: 'Terminal Games',
      description: 'Play games through command line interface',
      icon: <Terminal className="w-5 h-5 text-destructive" />,
      component: TerminalGame
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Cyber Games</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Card key={game.id}>
            <CardHeader>
              <div className="flex items-center gap-2">
                {game.icon}
                <CardTitle>{game.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{game.description}</p>
              <game.component onScore={(points) => setScore(game.id, points)} />
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}