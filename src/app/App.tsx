import { Routes, Route } from 'react-router-dom';
import { LandingPage } from '../modules/landing/LandingPage';
import { Step1Page } from '../modules/order/step1/Step1Page';
import { Step2Page } from '../modules/order/step2/Step2Page';
import { Step3Page } from '../modules/order/step3/Step3Page';
import { SuccessPage } from '../modules/order/success/SuccessPage';

export function App() {
  return (
    <Routes>
      <Route path="/"              element={<LandingPage />} />
      <Route path="/order/step-1"  element={<Step1Page />} />
      <Route path="/order/step-2"  element={<Step2Page />} />
      <Route path="/order/step-3"  element={<Step3Page />} />
      <Route path="/order/success" element={<SuccessPage />} />
    </Routes>
  );
}
