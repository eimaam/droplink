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
    <section className="py-12 md:py-24 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">How It Works</h2>
          <p className="text-base md:text-lg lg:text-xl text-text-secondary">Three simple steps to secure sharing</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
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
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-4 md:mb-6">
                  <step.icon className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                </div>

                <Badge className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 rounded-full text-sm md:text-base" variant="default">
                  {index + 1}
                </Badge>

                <h3 className="text-lg md:text-xl lg:text-2xl text-text-primary font-bold mb-2 md:mb-3">{step.title}</h3>
                <p className="text-sm md:text-base text-text-secondary leading-relaxed">{step.description}</p>
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
