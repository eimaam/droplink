import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, Logo } from '../components/ui';
import {
  Home,
  Search,
  FileQuestion,
  ArrowLeft,
  HelpCircle,
  Mail
} from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* Animated 404 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <motion.h1
                className="text-[150px] sm:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-cyan to-primary bg-[length:200%_auto]"
                animate={{
                  backgroundPosition: ['0% center', '200% center'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                404
              </motion.h1>
              
              {/* Floating Particles */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary/30"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <FileQuestion className="w-8 h-8 text-primary" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Page Not Found
              </h2>
            </div>
            <p className="text-lg text-foreground/60 max-w-md mx-auto mb-2">
              Oops! The page you're looking for has expired, been deleted, or never existed.
            </p>
            <p className="text-sm text-foreground/50">
              Just like our drops, some things are meant to be temporary. 🚀
            </p>
          </motion.div>

          {/* Possible Reasons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left sm:text-center p-6 rounded-xl bg-muted/30 border border-border backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-warning mt-2" />
                <div>
                  <p className="text-sm text-foreground/70">
                    The drop may have <span className="font-semibold text-warning">expired</span>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
                <div>
                  <p className="text-sm text-foreground/70">
                    The link might be <span className="font-semibold text-destructive">incorrect</span>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <div>
                  <p className="text-sm text-foreground/70">
                    The owner <span className="font-semibold text-primary">deleted it</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/')}
              className="shadow-glow-primary min-w-[200px]"
              icon={<Home />}
            >
              Go to Homepage
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(-1)}
              className="min-w-[200px]"
              icon={<ArrowLeft />}
            >
              Go Back
            </Button>
          </motion.div>

          {/* Help Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-sm text-foreground/60 mb-4">
              Need help? Check out these resources:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <button
                onClick={() => navigate('/help')}
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Help Center</span>
              </button>
              <button
                onClick={() => navigate('/about')}
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>About DropLink</span>
              </button>
              <a
                href="mailto:support@droplink.to"
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Support</span>
              </a>
            </div>
          </motion.div>

          {/* Fun Fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-12"
          >
            <div className="inline-flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent-cyan/5 border border-primary/20">
              <div className="text-2xl">💡</div>
              <div className="text-left">
                <p className="text-xs font-semibold text-primary mb-1">Did you know?</p>
                <p className="text-xs text-foreground/60">
                  DropLink drops automatically expire to keep your shared files secure and temporary. 
                  Create your own secure drops today!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-foreground/50">
            © {new Date().getFullYear()} <span className="font-semibold text-primary">DropLink</span> • Secure file sharing that expires automatically
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
