export interface GameScore {
  game: string;
  score: number;
  timestamp: number;
}

export interface GameStats {
  highScore: number;
  totalScore: number;
  gamesPlayed: number;
  lastPlayed: number;
}

export const getGameScores = (): { [key: string]: GameStats } => {
  const scores = localStorage.getItem('gameScores');
  return scores ? JSON.parse(scores) : {};
};

export const updateGameScore = (game: string, score: number): void => {
  const scores = getGameScores();
  const now = Date.now();
  
  if (!scores[game]) {
    scores[game] = {
      highScore: score,
      totalScore: score,
      gamesPlayed: 1,
      lastPlayed: now
    };
  } else {
    scores[game] = {
      highScore: Math.max(scores[game].highScore, score),
      totalScore: scores[game].totalScore + score,
      gamesPlayed: scores[game].gamesPlayed + 1,
      lastPlayed: now
    };
  }
  
  localStorage.setItem('gameScores', JSON.stringify(scores));
};