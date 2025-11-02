import { motion } from 'framer-motion';
import { Button, Badge, Logo } from '../ui';
import { Send, FileText, Link2, CheckCircle, Clock, Copy, ExternalLink, Shield } from 'lucide-react';

function TelegramIntegration() {
  const steps = [
    { icon: Send, text: 'Open Telegram Bot' },
    { icon: FileText, text: 'Send /dropfile command' },
    { icon: Link2, text: 'Get instant share link' },
    { icon: CheckCircle, text: 'Share securely' }
  ];

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Telegram Bot Integration</h2>
            <p className="text-base md:text-lg lg:text-xl text-text-secondary mb-6 md:mb-8 leading-relaxed">
              Share files directly from Telegram with our powerful bot. No need to switch between apps.
            </p>

            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3 md:gap-4"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                  </div>
                  <span className="text-base md:text-lg text-text-primary">{step.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="primary" size="xl">
                <Send className="w-5 h-5 mr-2" />
                Start the Bot
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
              <div className="bg-gradient-to-r from-primary/20 to-primary-light/20 px-4 py-3 border-b border-border backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Logo size="sm" showText={false} />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-card" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base">DropLink Bot</span>
                      <Badge variant="ghost" size="sm">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <div className="text-xs text-text-secondary">Active now</div>
                  </div>
                </div>
              </div>

              <div className="bg-background-dark p-3 md:p-4 h-[400px] md:h-[480px] overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex justify-center mb-6">
                    <Badge variant="secondary" size="sm">
                      <Clock className="w-3 h-3 mr-1" />
                      Today
                    </Badge>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[75%]">
                      <div className="bg-surface rounded-2xl rounded-tl-md px-4 py-3 border border-border">
                        <p className="text-sm mb-3">👋 Welcome to DropLink!</p>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          Send me any file or text and I'll create a secure, temporary share link for you.
                        </p>
                      </div>
                      <div className="text-xs text-text-secondary mt-1 ml-2">14:23</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[75%]">
                      <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl rounded-tr-md px-4 py-3 shadow-lg shadow-primary/20">
                        <p className="text-sm font-mono text-primary-foreground">/dropfile</p>
                      </div>
                      <div className="text-xs text-text-secondary mt-1 mr-2 text-right">14:24</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[75%]">
                      <div className="bg-surface rounded-2xl rounded-tl-md px-4 py-3 border border-border">
                        <p className="text-sm">📁 Send me the file you want to share</p>
                      </div>
                      <div className="text-xs text-text-secondary mt-1 ml-2">14:24</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[75%]">
                      <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl rounded-tr-md px-4 py-3 shadow-lg shadow-primary/20">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-primary-foreground truncate">presentation-deck.pdf</p>
                            <p className="text-xs text-primary-foreground/70 mt-0.5">2.4 MB</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-text-secondary mt-1 mr-2 text-right">14:25</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[85%]">
                      <div className="bg-surface rounded-2xl rounded-tl-md px-4 py-3 border border-border">
                        <p className="text-sm mb-3">✨ Your link is ready!</p>
                        
                        <div className="bg-background rounded-lg p-3 mb-3 border border-primary/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-text-secondary">Share Link</span>
                            <Badge variant="success" size="sm">Active</Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <code className="text-xs font-mono text-primary flex-1 truncate">
                              droplink.to/x7k9mN2p
                            </code>
                            <button className="p-1.5 hover:bg-muted rounded transition-colors">
                              <Copy className="w-3.5 h-3.5 text-text-secondary" />
                            </button>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-text-secondary">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Expires in 24h
                            </span>
                          </div>
                        </div>

                        <button className="w-full bg-primary hover:bg-primary-dark text-primary-foreground rounded-lg px-3 py-2 text-sm font-medium transition-all flex items-center justify-center gap-2 group">
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          Open Link
                        </button>
                      </div>
                      <div className="text-xs text-text-secondary mt-1 ml-2">14:25</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="bg-surface px-4 py-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-background rounded-full px-4 py-2 text-sm text-text-secondary border border-border">
                    Type a message...
                  </div>
                  <button className="w-9 h-9 rounded-full bg-primary hover:bg-primary-dark transition-all flex items-center justify-center">
                    <Send className="w-4 h-4 text-primary-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default TelegramIntegration;
