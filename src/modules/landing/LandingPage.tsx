import { AppLayout } from '../../layouts/AppLayout';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { TemplatesSection } from './components/TemplatesSection';
import { PricingSection } from './components/PricingSection';
import { ComplianceSection } from './components/ComplianceSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';

export function LandingPage() {
  return (
    <AppLayout>
      <HeroSection />
      <HowItWorks />
      <TemplatesSection />
      <PricingSection />
      <ComplianceSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </AppLayout>
  );
}
