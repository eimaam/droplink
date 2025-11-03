import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card, Logo, Badge } from '../components/ui';
import { Shield, Zap, Clock } from 'lucide-react';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const features = [
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'No passwords to remember or leak'
    },
    {
      icon: Zap,
      title: 'Instant Access',
      description: 'One click from your email'
    },
    {
      icon: Clock,
      title: 'Auto-Expire',
      description: 'Links vanish when you want'
    }
  ];

  return (
    <div className="min-h-screen bg-background-base flex">
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="inline-block mb-8">
            <Logo size="md" showText showImage animated />
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Welcome to DropLink
            </h1>
            <p className="text-sm md:text-base text-foreground/70">
              Sign in with your Google account to get started. Fast, secure, and simple.
            </p>
          </div>

          <Card variant="default" padding="md" className="mb-6">
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              size="lg"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading}
              className="!bg-white hover:!bg-gray-50 !text-gray-900 !border-gray-300 hover:!border-gray-400 dark:!bg-white dark:hover:!bg-gray-50"
            >
              {isLoading ? (
                'Signing in...'
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.64 9.20443C17.64 8.56625 17.5827 7.95262 17.4764 7.36353H9V10.8449H13.8436C13.635 11.9699 13.0009 12.9231 12.0477 13.5613V15.8194H14.9564C16.6582 14.2526 17.64 11.9453 17.64 9.20443Z" fill="#4285F4"/>
                    <path d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z" fill="#34A853"/>
                    <path d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40664 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z" fill="#FBBC05"/>
                    <path d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z" fill="#EA4335"/>
                  </svg>
                  <span>Continue with Google</span>
                </div>
              )}
            </Button>

            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-foreground/60 text-center">
                By continuing, you agree to our{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/20 via-background-dark to-primary-light/20 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzRoLTJ6bTAtNGgydjJoLTJ2LTJ6bTAtMmgyVjI2aC0ydjJ6bTAtMmgydi0yaC0ydjJ6bS0yLTJoMnYtMmgtMnYyem0tMiAwaDJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-lg"
        >
          <Badge variant="ghost" size="sm" className="mb-6">
            Simple & Secure
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Share files that <span className="text-gradient">vanish</span> on your terms
          </h2>

          <p className="text-base md:text-lg text-foreground/70 mb-12 leading-relaxed">
            Drop files, set expiry, share the link. No permanent storage, no tracking, no complexity.
          </p>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-foreground/10"
          >
            <div className="flex items-center gap-3 text-sm text-foreground/60">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light border-2 border-background-dark"
                  />
                ))}
              </div>
              <p>
                Join <span className="text-foreground font-semibold">1,000+</span> users sharing securely
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary-light/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Auth;

