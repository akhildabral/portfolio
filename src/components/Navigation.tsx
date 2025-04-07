import { motion } from 'framer-motion';
import { Terminal, Code2, Gamepad2, Download, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  score: number;
}

export function Navigation({ activeSection, setActiveSection, score }: NavigationProps) {
  return (
    <motion.nav 
      className="fixed top-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-lg border border-primary/20 rounded-full px-6 py-3 z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant={activeSection === 'home' ? 'default' : 'ghost'}
          size="icon"
          onClick={() => setActiveSection('home')}
        >
          <Terminal className="w-5 h-5" />
        </Button>
        
        <Button
          variant={activeSection === 'projects' ? 'default' : 'ghost'}
          size="icon"
          onClick={() => setActiveSection('projects')}
        >
          <Code2 className="w-5 h-5" />
        </Button>
        
        <Button
          variant={activeSection === 'games' ? 'default' : 'ghost'}
          size="icon"
          onClick={() => setActiveSection('games')}
        >
          <Gamepad2 className="w-5 h-5" />
        </Button>
        
        <Button
          variant={activeSection === 'resume' ? 'default' : 'ghost'}
          size="icon"
          onClick={() => setActiveSection('resume')}
        >
          <Download className="w-5 h-5" />
        </Button>
        
        <Button
          variant={activeSection === 'contact' ? 'default' : 'ghost'}
          size="icon"
          onClick={() => setActiveSection('contact')}
        >
          <Send className="w-5 h-5" />
        </Button>

        <div className="border-l border-primary/20 pl-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">Score: {score}</span>
        </div>
      </div>
    </motion.nav>
  );
}