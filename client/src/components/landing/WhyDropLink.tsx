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
    <section className="py-24 px-6 bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">Why DropLink?</h2>
          <p className="text-xl text-text-secondary">Built for privacy, designed for simplicity</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
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
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-glow-primary transition-all`}>
                  <feature.icon className="w-10 h-10 text-primary-foreground" />
                </div>

                <h3 className="text-2xl text-text-primary font-bold mb-4">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed text-lg">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyDropLink;
