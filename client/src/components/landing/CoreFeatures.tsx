import { motion } from 'framer-motion';
import { Card } from '../ui';
import { Clock, Flame, Lock, QrCode, BarChart3 } from 'lucide-react';

function CoreFeatures() {
  const features = [
    {
      icon: Clock,
      title: 'Temporary Links',
      description: 'Choose from 1h, 24h, or 7d expiry times'
    },
    {
      icon: Flame,
      title: 'Self-destruct Option',
      description: 'Burn after reading for maximum security'
    },
    {
      icon: Lock,
      title: 'Password Protection',
      description: 'Lock your links before sharing'
    },
    {
      icon: QrCode,
      title: 'QR Codes',
      description: 'Share offline instantly with QR codes'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Track views and monitor expiry status'
    }
  ];

  return (
    <section className="py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Core Features</h2>
          <p className="text-base md:text-lg lg:text-xl text-text-secondary">Everything you need for secure, temporary sharing</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card variant="default" padding="md" hover>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-all">
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl text-text-primary font-bold mb-1 md:mb-2">{feature.title}</h3>
                    <p className="text-sm md:text-base text-text-secondary">{feature.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoreFeatures;
