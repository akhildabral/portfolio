import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Layout,
  Users,
  Cloud,
  Terminal,
  CheckCircle2
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Home() {
  const skills = [
    {
      category: "Frontend Excellence",
      icon: <Layout className="w-6 h-6 text-primary" />,
      items: [
        "React.js & Next.js Expert",
        "Performance Optimization",
        "Micro-Frontend Architecture",
        "Design Systems"
      ]
    },
    {
      category: "Technical Leadership",
      icon: <Users className="w-6 h-6 text-secondary" />,
      items: [
        "Team Mentorship",
        "Architecture Design",
        "Process Improvement",
        "Technical Innovation"
      ]
    },
    {
      category: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6 text-accent" />,
      items: [
        "AWS Services",
        "Docker & Containers",
        "CI/CD Pipelines",
        "Infrastructure Design"
      ]
    }
  ];

  const stats = [
    { label: "Years Experience", value: "10+", color: "text-primary" },
    { label: "Projects Led", value: "50+", color: "text-secondary" },
    { label: "Team Members Mentored", value: "20+", color: "text-accent" },
    { label: "Technologies Mastered", value: "15+", color: "text-green-500" }
  ];

  const socialIcons = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin
  };

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
      className="space-y-12"
    >
      {/* Hero Section */}
      <motion.div 
        className="grid lg:grid-cols-2 gap-8 items-center"
        variants={itemVariants}
      >
        <div className="space-y-8">
          <motion.div 
            className="space-y-3"
            variants={itemVariants}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
              <span className="gradient-text">Akhil Dabral</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-accent">
              Fullstack & Frontend Ninja
            </h2>
            <p className="text-xl text-muted-foreground/80">Building scalable, high-performance web applications with modern technologies</p>
          </motion.div>

          <motion.div 
            className="flex gap-4"
            variants={itemVariants}
          >
            {Object.entries(siteConfig.social).map(([platform, url]) => {
              const Icon = socialIcons[platform as keyof typeof socialIcons];
              return (
                <Button
                  key={platform}
                  variant="outline"
                  size="icon"
                  asChild
                  className="button-glow"
                >
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <Icon className="w-5 h-5" />
                  </a>
                </Button>
              );
            })}
          </motion.div>

          <motion.div 
            className="flex gap-4"
            variants={itemVariants}
          >
            <Button asChild className="button-glow">
              <a href={siteConfig.nav.projects}>View Projects</a>
            </Button>
            <Button variant="outline" asChild className="button-glow">
              <a href={siteConfig.resumeUrl} download={siteConfig.resumeFileName}>
                Download Resume
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className="relative aspect-square max-w-md mx-auto"
          variants={itemVariants}
        >
          
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={containerVariants}
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className={`glow-effect card-glow-${index === 0 ? 'primary' : index === 1 ? 'secondary' : index === 2 ? 'accent' : 'primary'}`}>
              <CardContent className="pt-6">
                <h3 className={`text-2xl md:text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Skills Section */}
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
      >
        <motion.h2 
          className="text-4xl font-bold tracking-tight"
          variants={itemVariants}
        >
          Expertise
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glow-effect">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {skill.icon}
                    <CardTitle>{skill.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {skill.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-muted-foreground flex items-center gap-3 group"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Section */}
      <motion.div variants={itemVariants}>
        <Card className="glow-effect">
          <CardContent className="p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
              <Terminal className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4 gradient-text">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-muted-foreground mb-6">
                With over a decade of experience in frontend architecture, performance optimization, 
                and technical leadership, I can help bring your vision to life with scalable, 
                maintainable, and high-performance solutions.
              </p>
              <Button asChild className="button-glow">
                <a href={siteConfig.nav.contact}>Get In Touch</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}