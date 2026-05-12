import { AppLayout } from '../../layouts/AppLayout';
import { HeroSection } from './components/HeroSection';
import { LivePreviewSection } from './components/LivePreviewSection';
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
      <LivePreviewSection />
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
