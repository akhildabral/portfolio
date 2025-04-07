import { useState, useEffect, useRef } from 'react';
import { Terminal, Code2, Gamepad2, Download, Send, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from '@/components/theme-provider';
import { ScoreDialog } from '@/components/ScoreDialog';
import { Home } from '@/components/Home';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Games } from '@/components/Games';
import { Resume } from '@/components/Resume';
import { TerminalComponent } from '@/components/Terminal';
import { updateGameScore } from '@/lib/scores';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/config/site';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('gameScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const mainRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem('gameScore', score.toString());
  }, [score]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const handleScoreUpdate = (game: string, points: number) => {
    setScore((prev) => prev + points);
    updateGameScore(game, points);
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', icon: <Terminal className="w-5 h-5" />, label: 'Home' },
    { id: 'projects', icon: <Code2 className="w-5 h-5" />, label: 'Projects' },
    { id: 'games', icon: <Gamepad2 className="w-5 h-5" />, label: 'Games' },
    { id: 'resume', icon: <Download className="w-5 h-5" />, label: 'Resume' },
    { id: 'contact', icon: <Send className="w-5 h-5" />, label: 'Contact' },
  ];

  const Navigation = ({ mobile = false }) => (
    <div className="space-y-2">
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant={activeSection === item.id ? 'default' : 'ghost'}
          className={`w-full justify-start gap-3 ${!isNavExpanded && !mobile && 'justify-center'} transition-colors duration-200`}
          onClick={() => scrollToSection(item.id)}
        >
          {item.icon}
          {(isNavExpanded || mobile) && <span>{item.label}</span>}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
      
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-b border-primary/20 z-50 flex items-center justify-between">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Navigation</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <Navigation mobile />
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex items-center gap-4">
          <ScoreDialog />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>
      
      {/* Desktop Header */}
      <header className="hidden lg:block fixed top-0 right-0 p-4 z-50">
        <div className="flex items-center gap-4">
          <ScoreDialog />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>
      
      {/* Desktop Sidebar Navigation */}
      <nav className={`hidden lg:block fixed left-0 top-0 h-full bg-background/80 backdrop-blur-lg border-r border-primary/20 transition-all duration-300 z-50 ${isNavExpanded ? 'w-64' : 'w-20'}`}>
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsNavExpanded(!isNavExpanded)}
            className="mb-6 ml-1"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Navigation />
        </div>
      </nav>
      
      {/* Main Content */}
      <main 
        ref={mainRef}
        className={`flex-1 transition-all duration-300 ${isNavExpanded ? 'lg:pl-64' : 'lg:pl-20'} pt-20 lg:pt-16`}
      >
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="space-y-32">
            <section id="home" className="scroll-mt-20">
              <Home />
            </section>
            
            <section id="projects" className="scroll-mt-20">
              <Projects />
            </section>
            
            <section id="games" className="scroll-mt-20">
              <Games setScore={handleScoreUpdate} />
            </section>
            
            <section id="resume" className="scroll-mt-20">
              <Resume />
            </section>
            
            <section id="contact" className="scroll-mt-20">
              <Contact />
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-32 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${isNavExpanded ? 'lg:pl-64' : 'lg:pl-20'}`}>
        <div className="container mx-auto px-4 lg:px-8 py-10">
          <div className="flex flex-col items-center gap-4">
            <p className="text-center text-sm leading-loose text-muted-foreground">
              Built by{" "}
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-primary"
              >
                {siteConfig.name.split(" - ")[0]}
              </a>
              . The source code is available on{" "}
              <a
                href={`${siteConfig.social.github}/portfolio`}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-primary"
              >
                GitHub
              </a>
              .
            </p>
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.name.split(" - ")[0]}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <TerminalComponent />
      <Toaster />
    </div>
  );
}

export default App;