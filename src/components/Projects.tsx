import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";

export function Projects() {
  const projects = [
    {
      title: 'Cybersecurity Visualization Platform',
      description: 'Real-time cyber threat monitoring and assessment platform using Cytoscape.js, featuring optimized rendering performance and intuitive visualization.',
      tech: ['React', 'WebSocket', 'Cytoscape.js', 'TypeScript'],
      highlights: [
        'Real-time threat monitoring',
        'Performance optimization',
        'Interactive visualizations'
      ]
    },
    {
      title: 'Enterprise Design System',
      description: 'In-house component library and design system establishing unified design language across multiple projects.',
      tech: ['React', 'Storybook', 'Styled Components', 'Jest'],
      highlights: [
        'Reusable components',
        'Comprehensive documentation',
        'Automated testing'
      ]
    },
    {
      title: 'Compliance Assessment Platform',
      description: 'Enterprise-level platform for managing and conducting compliance assessments with real-time collaboration.',
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
      highlights: [
        'Real-time collaboration',
        'Automated workflows',
        'Scalable architecture'
      ]
    },
    {
      title: 'Property Alert Platform',
      description: 'Real-time analytics and alert system processing millions of property data points with instant notifications.',
      tech: ['React', 'Node.js', 'WebSocket', 'Redis'],
      highlights: [
        'Real-time processing',
        'Scalable architecture',
        'Automated alerts'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div className="space-y-4" variants={itemVariants}>
        <h1 className="text-4xl font-bold tracking-tight">Featured Projects</h1>
        <p className="text-muted-foreground">
          Showcasing innovative solutions in cybersecurity, frontend architecture, and enterprise applications.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-full glow-effect">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="button-glow">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                  <Button variant="outline" size="sm" className="button-glow">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}