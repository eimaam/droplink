import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import WhyDropLink from './components/WhyDropLink';
import CoreFeatures from './components/CoreFeatures';
import TelegramIntegration from './components/TelegramIntegration';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
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
}

export default App;
