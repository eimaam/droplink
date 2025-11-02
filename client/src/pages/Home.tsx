import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import CoreFeatures from '../components/landing/CoreFeatures';
import WhyDropLink from '../components/landing/WhyDropLink';
import TelegramIntegration from '../components/landing/TelegramIntegration';
import Testimonials from '../components/landing/Testimonials';
import CallToAction from '../components/landing/CallToAction';

const Home = () => {
  return (
    <div className="min-h-screen bg-background-base text-text-primary">
      <Navbar />
      <Hero />
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <WhyDropLink />
      <section id="features">
        <CoreFeatures />
      </section>
      <section id="telegram">
        <TelegramIntegration />
      </section>
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;

