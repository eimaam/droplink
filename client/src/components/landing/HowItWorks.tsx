import { motion } from 'framer-motion';
import { Button, Card, Badge } from '../ui';
import { FileUp, Link2, Clock3 } from 'lucide-react';

function HowItWorks() {
  const steps = [
    {
      icon: FileUp,
      title: 'Drop your file or text',
      description: 'Upload any file or paste text content in seconds'
    },
    {
      icon: Link2,
      title: 'Get a short, smart link',
      description: 'Instantly receive a shareable, secure link'
    },
    {
      icon: Clock3,
      title: 'Watch it expire automatically',
      description: 'Set custom expiry times for complete control'
    }
  ];

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-text-secondary">Three simple steps to secure sharing</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="relative"
            >
              <Card variant="default" padding="lg" hover>
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                <Badge className="absolute -top-4 -right-4 w-12 h-12 rounded-full" variant="default" size="lg">
                  {index + 1}
                </Badge>

                <h3 className="text-2xl text-text-primary font-bold mb-3">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="primary" size="lg">
            Try Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;
