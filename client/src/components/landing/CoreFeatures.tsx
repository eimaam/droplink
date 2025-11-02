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
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">Core Features</h2>
          <p className="text-xl text-text-secondary">Everything you need for secure, temporary sharing</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-all">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-xl text-text-primary font-bold mb-2">{feature.title}</h3>
                    <p className="text-text-secondary">{feature.description}</p>
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
