import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Trophy, Clock, Hash, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { getGameScores, type GameStats } from '@/lib/scores';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function ScoreDialog() {
  const [scores] = useState(() => getGameScores());

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Trophy className="w-4 h-4" />
          <span>View Scores</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Scores</DialogTitle>
          <DialogDescription>
            Your gaming achievements and statistics
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {Object.entries(scores).map(([game, stats]: [string, GameStats], index) => (
              <motion.div
                key={game}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{game}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-primary" />
                        <span className="text-sm">High Score: {stats.highScore}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-secondary" />
                        <span className="text-sm">Games: {stats.gamesPlayed}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-accent" />
                        <span className="text-sm">Total: {stats.totalScore}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Last: {formatDate(stats.lastPlayed)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index < Object.entries(scores).length - 1 && (
                  <Separator className="my-4" />
                )}
              </motion.div>
            ))}
            {Object.keys(scores).length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">No games played yet!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}