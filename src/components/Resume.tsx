import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { siteConfig } from '@/config/site';
import {
  Layout,
  Server,
  Database,
  Cloud,
  Layers,
  Wrench,
  Terminal,
} from 'lucide-react';

const skills = [
  {
    category: "Frontend Development",
    icon: <Layout className="w-6 h-6 text-blue-500" />,
    gradient: "from-blue-500 via-blue-400 to-blue-600",
    items: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 95 },
      { name: "Next.js", level: 85 },
      { name: "Vue.js", level: 70 },
      { name: "Tailwind CSS", level: 90 },
    ]
  },
  {
    category: "Backend Development",
    icon: <Server className="w-6 h-6 text-green-500" />,
    gradient: "from-green-500 via-green-400 to-green-600",
    items: [
      { name: "Node.js", level: 95 },
      { name: "Python", level: 85 },
      { name: "GraphQL", level: 80 },
      { name: "REST APIs", level: 90 },
    ]
  },
  {
    category: "Database & Storage",
    icon: <Database className="w-6 h-6 text-yellow-500" />,
    gradient: "from-yellow-500 via-yellow-400 to-yellow-600",
    items: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Redis", level: 75 },
      { name: "Firebase", level: 85 },
    ]
  },
  {
    category: "DevOps & Cloud",
    icon: <Cloud className="w-6 h-6 text-purple-500" />,
    gradient: "from-purple-500 via-purple-400 to-purple-600",
    items: [
      { name: "AWS", level: 85 },
      { name: "Docker", level: 80 },
      { name: "Kubernetes", level: 75 },
      { name: "CI/CD", level: 90 },
    ]
  },
  {
    category: "Architecture & Patterns",
    icon: <Layers className="w-6 h-6 text-red-500" />,
    gradient: "from-red-500 via-red-400 to-red-600",
    items: [
      { name: "Microservices", level: 85 },
      { name: "System Design", level: 90 },
      { name: "Design Patterns", level: 85 },
      { name: "API Design", level: 90 },
    ]
  },
  {
    category: "Tools & Utilities",
    icon: <Wrench className="w-6 h-6 text-indigo-500" />,
    gradient: "from-indigo-500 via-indigo-400 to-indigo-600",
    items: [
      { name: "Git", level: 95 },
      { name: "Webpack", level: 85 },
      { name: "Vite", level: 85 },
      { name: "Jest", level: 80 },
    ]
  }
];

const SkillLevel = ({ level, gradient }: { level: number; gradient: string }) => {
  return (
    <div className="flex items-center gap-2 w-32">
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${gradient} rounded-full relative`}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-white/10 animate-pulse" />
        </motion.div>
      </div>
      <span className="text-xs font-medium tabular-nums w-8">
        {level}%
      </span>
    </div>
  );
};

export function Resume() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = siteConfig.resumeUrl;
    link.download = siteConfig.resumeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tight">Technical Skills</h1>
        <Button variant="outline" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download Resume
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-2">
                  {category.icon}
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.items.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                      <SkillLevel level={skill.level} gradient={category.gradient} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="mt-8 border-dashed">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 text-muted-foreground">
            <Terminal className="w-5 h-5" />
            <p className="text-sm">
              This is just a snapshot of my technical skills. Download my full resume to learn more about my experience and projects.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}