import { motion } from 'framer-motion';
import { Card } from '../ui';
import { Timer, Smartphone, Shield } from 'lucide-react';

function WhyDropLink() {
  const features = [
    {
      icon: Timer,
      title: 'Ephemeral Sharing',
      description: 'Auto-deletes when expired. Your content disappears on your terms.',
      gradient: 'from-primary to-primary-light'
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform',
      description: 'Use Telegram or Web seamlessly. One platform, multiple access points.',
      gradient: 'from-primary-light to-primary'
    },
    {
      icon: Shield,
      title: 'Privacy-First',
      description: 'Files stored securely, no sign-up needed. Your privacy is our priority.',
      gradient: 'from-primary to-primary-dark'
    }
  ];

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Why DropLink?</h2>
          <p className="text-base md:text-lg lg:text-xl text-text-secondary">Built for privacy, designed for simplicity</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="group h-full"
            >
              <Card variant="ghost" padding="lg" hover className="h-full bg-surface/50 backdrop-blur-sm">
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 md:mb-6 group-hover:shadow-glow-primary transition-all`}>
                  <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
                </div>

                <h3 className="text-lg md:text-xl lg:text-2xl text-text-primary font-bold mb-3 md:mb-4">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed text-sm md:text-base lg:text-lg">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyDropLink;
