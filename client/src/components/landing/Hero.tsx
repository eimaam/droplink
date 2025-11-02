import { motion } from 'framer-motion';
import { Button } from '../ui';
import { Upload, Send, Clock, Zap } from 'lucide-react';

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background-base to-primary-light/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            Drop. Share. <span className="text-gradient">Simplify.</span>
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
            Share files and messages that auto-expire — via Web or Telegram.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="primary" size="xl">
                Try on Web →
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="xl">
                Use Telegram Bot
              </Button>
            </motion.div>
          </div>

          <div className="flex justify-center items-center gap-8 flex-wrap">
            {[
              { icon: Upload, label: 'Drop', delay: 0.2 },
              { icon: Send, label: 'Link', delay: 0.4 },
              { icon: Clock, label: 'Timer', delay: 0.6 },
              { icon: Zap, label: 'Vanish', delay: 0.8 }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: item.delay, duration: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-surface border border-primary/30 flex items-center justify-center hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/30">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="text-sm text-text-secondary">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
