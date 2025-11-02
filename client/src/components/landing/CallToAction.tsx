import { motion } from 'framer-motion';
import { Button, Badge } from '../ui';
import { ArrowRight } from 'lucide-react';

function CallToAction() {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary-light/20 to-primary/20" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Start Sharing Smarter
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-text-secondary mb-8 md:mb-12 leading-relaxed">
            Join thousands of users who trust DropLink for secure, temporary file sharing
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="primary" size="lg" className="md:!h-14 md:!px-8 md:!text-lg">
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Open Web App
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="md:!h-14 md:!px-8 md:!text-lg">
                Use Telegram Bot
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-text-secondary"
        >
          <div className="flex items-center gap-2">
            <Badge variant="default" size="sm" className="w-2 h-2 rounded-full p-0" />
            <span>Simple email sign-up</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="default" size="sm" className="w-2 h-2 rounded-full p-0 bg-primary-light" />
            <span>Auto-expiring links</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="default" size="sm" className="w-2 h-2 rounded-full p-0 bg-primary-dark" />
            <span>Privacy-first approach</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CallToAction;
