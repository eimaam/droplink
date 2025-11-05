import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '../components/ui';
import { DashboardSidebar } from '../components/layout';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Book,
  MessageCircle,
  Mail,
  FileText,
  Video,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const Help = () => {
  const [activeTab, setActiveTab] = useState('help');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqs: FAQItem[] = [
    {
      category: 'general',
      question: 'What is DropLink?',
      answer: 'DropLink is a secure, temporary file and text sharing service. Upload files or share text snippets that automatically expire after a set time period, ensuring your shared content doesn\'t stay online forever.'
    },
    {
      category: 'general',
      question: 'How does DropLink work?',
      answer: 'Simply upload a file or paste text, set an expiry time (1 hour to 30 days), and get a shareable link. The content is automatically deleted after the expiry time. You can track downloads and manage all your drops from the dashboard.'
    },
    {
      category: 'sharing',
      question: 'What file types can I share?',
      answer: 'You can share any file type including documents (PDF, DOCX), images (JPG, PNG, GIF), archives (ZIP, RAR), videos, and more. Maximum file size is 50MB per upload.'
    },
    {
      category: 'sharing',
      question: 'Can I share multiple files at once?',
      answer: 'Yes! You can drag and drop multiple files or select multiple files at once. Each file will get its own unique shareable link.'
    },
    {
      category: 'sharing',
      question: 'What is the difference between public and private drops?',
      answer: 'Public drops can be accessed by anyone with the link. Private drops require the recipient to have the access code or password used to encrypt the file. Private drops are perfect for sensitive information.'
    },
    {
      category: 'security',
      question: 'Is my data secure?',
      answer: 'Yes! All uploads are encrypted in transit using SSL/TLS. Files are stored securely and automatically deleted after expiration. Private drops have additional access controls.'
    },
    {
      category: 'security',
      question: 'Can I delete a drop before it expires?',
      answer: 'Absolutely! You can manually delete any drop from your dashboard at any time. Once deleted, the link immediately stops working.'
    },
    {
      category: 'limits',
      question: 'What are the upload limits?',
      answer: 'Free accounts can upload files up to 50MB with a storage limit of 5GB. You can have unlimited active drops, and each drop can be set to expire from 1 hour to 30 days.'
    },
    {
      category: 'limits',
      question: 'How long can drops be active?',
      answer: 'You can set expiry times from as short as 1 hour to as long as 30 days. Once expired, the drop and its link are permanently deleted.'
    },
    {
      category: 'account',
      question: 'Do I need an account to share files?',
      answer: 'Yes, you need an account to share files. You can create one in 5 seconds and start sharing immediately! 🎉 No Verification Needed. Track downloads, manage drops, pin important items etc'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Topics', icon: HelpCircle },
    { id: 'general', label: 'General', icon: Book },
    { id: 'sharing', label: 'Sharing', icon: FileText },
    { id: 'security', label: 'Security', icon: HelpCircle },
    { id: 'limits', label: 'Limits', icon: FileText },
    { id: 'account', label: 'Account', icon: HelpCircle }
  ];

  const filteredFAQs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const resources = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of DropLink in 5 minutes',
      icon: Book,
      link: '#'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides',
      icon: Video,
      link: '#'
    },
    {
      title: 'Documentation',
      description: 'Comprehensive technical documentation',
      icon: FileText,
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-background-base">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 overflow-auto pb-20 md:pb-0 md:ml-64">
        <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                How can we help you?
              </h1>
              <p className="text-sm text-foreground/70">
                Find answers to common questions and get support
              </p>
            </div>

            {/* Quick Help Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card variant="default" hover className="text-center">
                <a href="mailto:hello@eimaam.dev" className="block">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Email Support</h3>
                  <p className="text-xs text-foreground/60">Get help via email</p>
                </a>
              </Card>

              <Card variant="default" hover className="text-center">
                <a href="#" className="block">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Live Chat</h3>
                  <p className="text-xs text-foreground/60">Chat with our team</p>
                </a>
              </Card>

              <Card variant="default" hover className="text-center">
                <a href="#" className="block">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Book className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Documentation</h3>
                  <p className="text-xs text-foreground/60">Browse our docs</p>
                </a>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card variant="default" padding="sm" className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/30 text-foreground/70 hover:bg-muted/50'
                      }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* FAQ List */}
              <div className="space-y-3">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                      className="w-full text-left p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-sm font-semibold text-foreground">
                          {faq.question}
                        </h3>
                        {openFAQ === index ? (
                          <ChevronUp className="w-5 h-5 text-foreground/60 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-foreground/60 flex-shrink-0" />
                        )}
                      </div>
                      {openFAQ === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-border"
                        >
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Resources */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Additional Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {resources.map((resource, index) => (
                  <Card key={index} variant="default" hover>
                    <a href={resource.link} className="block">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <resource.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-foreground">
                              {resource.title}
                            </h3>
                            <ExternalLink className="w-3.5 h-3.5 text-foreground/40" />
                          </div>
                          <p className="text-xs text-foreground/60">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <Card variant="gradient" padding="sm" className="border border-primary/30 text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Still need help?
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                Our support team is here to help you with any questions
              </p>
              <Link to="mailto:support@droplink.eimaam.dev">
                <Button variant="primary" size="md">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Help;
