import { motion } from 'framer-motion';
import { Carousel } from 'antd';
import { Code2, Briefcase, Zap } from 'lucide-react';

function Testimonials() {
  const testimonials = [
    {
      icon: Code2,
      quote: "Perfect for sharing code snippets.",
      author: "Sarah Chen",
      role: "Software Developer",
      color: "from-primary to-primary-light"
    },
    {
      icon: Briefcase,
      quote: "I send files to clients securely — no clutter.",
      author: "Marcus Rodriguez",
      role: "Freelance Designer",
      color: "from-primary-light to-primary"
    },
    {
      icon: Zap,
      quote: "My go-to for fast, private file drops.",
      author: "Emily Watson",
      role: "Project Manager",
      color: "from-primary to-primary-dark"
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
          <h2 className="text-5xl font-bold mb-4">Loved by users worldwide</h2>
          <p className="text-xl text-text-secondary">See what people are saying about DropLink</p>
        </motion.div>

        <Carousel
          autoplay
          autoplaySpeed={4000}
          dots={{ className: "custom-dots" }}
          className="testimonials-carousel"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="px-4"
              >
                <div className="max-w-3xl mx-auto bg-surface rounded-2xl p-12 border border-primary/20">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center mb-6 mx-auto`}>
                    <testimonial.icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  <blockquote className="text-2xl text-text-primary md:text-3xl font-bold text-center mb-8">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="text-center">
                    <div className="font-semibold text-lg text-text-primary">{testimonial.author}</div>
                    <div className="text-text-secondary">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default Testimonials;
