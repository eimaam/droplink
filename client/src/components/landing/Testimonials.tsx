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
    <section className="py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Loved by users worldwide</h2>
          <p className="text-base md:text-lg lg:text-xl text-text-secondary">See what people are saying about DropLink</p>
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
                className="px-2 md:px-4"
              >
                <div className="max-w-3xl mx-auto bg-surface rounded-xl md:rounded-2xl p-6 md:p-10 lg:p-12 border border-primary/20">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center mb-4 md:mb-6 mx-auto`}>
                    <testimonial.icon className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                  </div>

                  <blockquote className="text-xl md:text-2xl lg:text-3xl text-text-primary font-bold text-center mb-6 md:mb-8">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="text-center">
                    <div className="font-semibold text-base md:text-lg text-text-primary">{testimonial.author}</div>
                    <div className="text-sm md:text-base text-text-secondary">{testimonial.role}</div>
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
