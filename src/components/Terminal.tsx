import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Minimize2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Command {
  command: string;
  output: string;
}

export function TerminalComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = {
    help: 'Available commands: help, clear, echo, whoami, date, hack, score',
    clear: '',
    echo: (args: string) => args,
    whoami: 'Cyberpunk Developer',
    date: () => new Date().toLocaleString(),
    hack: 'Initiating hack sequence... Access granted! 🔓',
    score: () => `Current score: ${localStorage.getItem('gameScore') || '0'}`,
  };

  const handleCommand = (cmd: string) => {
    const [command, ...args] = cmd.trim().split(' ');
    let output = 'Command not found. Type "help" for available commands.';

    if (command in commands) {
      if (typeof commands[command] === 'function') {
        output = commands[command](args.join(' '));
      } else if (command === 'clear') {
        setHistory([]);
        return;
      } else {
        output = commands[command];
      }
    }

    setHistory([...history, { command: cmd, output }]);
    setInput('');
  };

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full shadow-lg hover:shadow-primary/50 transition-shadow"
      >
        <TerminalIcon className="w-6 h-6" />
      </Button>

      {isOpen && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: isMinimized ? 'calc(100% - 2rem)' : 0,
            opacity: 1
          }}
          className="fixed bottom-4 right-4 w-96 h-64 shadow-lg"
        >
          <Card className="h-full">
            <CardHeader className="py-2 px-4 flex flex-row items-center justify-between space-y-0 border-b">
              <span className="text-sm font-semibold">Terminal</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => setIsMinimized(!isMinimized)}>
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <ScrollArea className="h-[calc(100%-2rem)]">
                {history.map((entry, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex gap-2">
                      <span className="text-secondary">$</span>
                      <span>{entry.command}</span>
                    </div>
                    <div className="pl-4 text-sm text-muted-foreground">{entry.output}</div>
                  </div>
                ))}
                <div className="flex gap-2 items-center">
                  <span className="text-secondary">$</span>
                  <Input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && input.trim()) {
                        handleCommand(input);
                      }
                    }}
                    className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                    placeholder="Type 'help' for commands..."
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  );
}