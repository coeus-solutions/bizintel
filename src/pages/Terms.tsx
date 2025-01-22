import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Footer } from '../components/landing/Footer';

export const Terms = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90">
              <BarChart2 className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold">BizIntel</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using BizIntel's website and services, you expressly acknowledge and agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
              <p className="text-gray-600">
                BizIntel grants you a limited, non-exclusive, non-transferable license to access and use our services for your business purposes in accordance with these terms. This license is strictly for your use of BizIntel's services and does not extend to any commercial redistribution or unauthorized modifications of our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Disclaimer</h2>
              <p className="text-gray-600">
                The services and materials on BizIntel's platform are provided on an 'as is' and 'as available' basis. BizIntel makes no representations or warranties of any kind, express or implied, regarding the operation of our services or the information, content, materials, or products included in our platform. To the fullest extent permissible by law, we disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement of intellectual property or other proprietary rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Limitations of Liability</h2>
              <p className="text-gray-600">
                To the maximum extent permitted by applicable law, BizIntel and its affiliates, officers, directors, employees, agents, and suppliers shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or inability to access or use) our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Privacy Policy</h2>
              <p className="text-gray-600">
                Your privacy is important to us. The use of BizIntel's services is governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. By using our services, you consent to the data practices described in our <a href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Governing Law</h2>
              <p className="text-gray-600">
                These Terms of Service and any separate agreements shall be governed by and construed in accordance with the laws of the State of Texas, United States. You agree to submit to the exclusive jurisdiction of the courts located in Texas for the resolution of any disputes arising from or relating to these terms or your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Contact Information</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <address className="text-gray-600 mt-2 not-italic">
                1606 Headway Cir<br />
                STE 9810<br />
                Austin, TX 78754<br />
                United States
              </address>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}; 