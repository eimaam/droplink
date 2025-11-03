import { motion } from 'framer-motion';
import { Button, Card, Badge, Divider } from '../components/ui';
import { Zap, Shield, Clock, Target, Heart, Rocket, ArrowRight, Send, Globe, Mail } from 'lucide-react';
import { Twitter } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const About = () => {
  const coreValues = [
    {
      icon: Zap,
      title: 'Simplicity',
      description: 'It should take seconds, not minutes, to share something.',
      gradient: 'from-primary to-primary-light'
    },
    {
      icon: Shield,
      title: 'Privacy',
      description: 'Every drop expires : no hidden tracking, no data leftovers.',
      gradient: 'from-primary-light to-primary'
    },
    {
      icon: Clock,
      title: 'Speed',
      description: 'Instant links. Real-time Telegram sync. Zero friction.',
      gradient: 'from-primary to-primary-dark'
    },
    {
      icon: Target,
      title: 'Control',
      description: 'You decide when your data disappears. Always.',
      gradient: 'from-primary-dark to-primary'
    }
  ];

  const useCases = [
    {
      icon: Heart,
      title: 'For Individuals',
      description: 'Share quick files or snippets securely without the hassle.'
    },
    {
      icon: Globe,
      title: 'For Developers',
      description: 'Drop code, logs, or temporary builds with instant access.'
    },
    {
      icon: Rocket,
      title: 'For Teams',
      description: 'Share internal docs or credentials without clutter.'
    }
  ];

  return (
    <div className="min-h-screen bg-background-base">
      <Navbar />

      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background-base to-primary-light/10" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="ghost" size="sm" className="mb-4">
              About DropLink
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tight text-foreground">
              Building the simplest way to <span className="text-gradient">share, privately</span>
            </h1>

            <p className="text-base md:text-lg text-foreground/70 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto">
              DropLink was crafted to make temporary sharing effortless. No clutter. No complications. 
              Just quick, secure drops — built by a creator who believes in privacy and speed.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-16 px-4 md:px-6 bg-background-dark">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-foreground">
              💡 Why DropLink Exists
            </h2>

            <Card variant="ghost" padding="md" className="bg-surface/30 backdrop-blur-sm border border-primary/10">
              <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-4">
                Sometimes you just want to send a file, not create an account, not sync drives, 
                not leave it online forever. <span className="text-primary font-semibold">DropLink was built for that moment.</span>
              </p>

              <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-4">
                A bridge between speed and security. Telegram convenience and web flexibility. 
                A small tool that feels simple but works powerfully behind the scenes.
              </p>

              <Divider className="my-4" />

              <p className="text-sm md:text-base text-foreground/80 leading-relaxed italic">
                "I built DropLink after realizing how unnecessarily complex file sharing had become. 
                I wanted something fast — a tool I could use without signing in or worrying about cleanup later."
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              🧩 What DropLink Stands For
            </h2>
            <p className="text-sm md:text-base text-foreground/70">
              Four core values that drive every decision we make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -3 }}
              >
                <Card variant="default" padding="md" hover className="h-full">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-3`}>
                    <value.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-base md:text-lg font-bold mb-2 text-foreground">
                    {value.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-foreground/70 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 px-4 md:px-6 bg-background-dark">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="text-4xl mb-4">👋</div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Hi, I'm Imam
            </h2>

            <Card variant="ghost" padding="md" className="bg-surface/20 backdrop-blur-sm text-left">
              <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-3">
                I'm a software engineer passionate about building tools that make digital life simpler.
              </p>

              <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-3">
                DropLink started as one of my many "Telegram Bot" ideas and evolved into a full 
                web + bot experience. I often needed to share quick files, snippets, and links 
                between my devices or with people on Telegram, and I wanted it to be 
                <span className="text-primary font-semibold"> instant, clean, and relatively smart</span>.
              </p>

              <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-4">
                DropLink is part of my mission to create privacy-first products that feel human, and
                products that don't need accounts, marketing popups, or permission to work.
              </p>

              <Divider className="my-4" />

              <div className="flex flex-wrap gap-3 justify-center">
                <motion.a
                  href="https://x.com/eimaam_d"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface hover:bg-surface-hover border border-border hover:border-primary transition-all text-sm text-foreground/80 hover:text-primary"
                >
                  <Twitter className="w-4 h-4" />
                  <span>Follow on X</span>
                </motion.a>

                <motion.a
                  href="mailto:imamddahir@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface hover:bg-surface-hover border border-border hover:border-primary transition-all text-sm text-foreground/80 hover:text-primary"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </motion.a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              🌍 Built for Everyone
            </h2>
            <p className="text-sm md:text-base text-foreground/70">
              DropLink fits into any workflow that values speed, privacy, and clarity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -3 }}
              >
                <Card variant="default" padding="md" hover className="h-full">
                  <useCase.icon className="w-8 h-8 text-primary mb-3" />
                  
                  <h3 className="text-base md:text-lg font-bold mb-2 text-foreground">
                    {useCase.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-foreground/70 leading-relaxed">
                    {useCase.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="gradient" padding="md" className="text-center border border-primary/30">
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">
                💬 Our Vision
              </h3>
              
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed mb-3 max-w-2xl mx-auto">
                To make secure, ephemeral sharing a natural part of digital life. 
                To remove friction between "I need to send this" and "It's safely gone now."
              </p>

              <p className="text-sm md:text-base text-foreground leading-relaxed font-semibold">
                DropLink isn't about storage — it's about moments of sharing done right.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-16 px-4 md:px-6 bg-gradient-to-r from-primary/20 via-primary-light/20 to-primary/20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              Try DropLink Today
            </h2>
            
            <p className="text-sm md:text-base text-foreground/70 mb-6 leading-relaxed">
              Built for people who care about privacy, simplicity, and speed
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/auth">
                  <Button variant="primary" size="md">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Use DropLink on Web
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="md">
                  <Send className="w-4 h-4 mr-2" />
                  Start Telegram Bot
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

