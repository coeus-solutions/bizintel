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
                By accessing and using BizIntel's services, you accept and agree to be bound by the terms and conditions outlined in this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Description of Services</h2>
              <p className="text-gray-600 mb-4">
                BizIntel provides AI-powered business analysis services, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Competitor analysis</li>
                <li>Market insights</li>
                <li>Customer feedback analysis</li>
                <li>Product and service evaluation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
              <p className="text-gray-600 mb-4">
                You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Use the services in compliance with applicable laws</li>
                <li>Not misuse or attempt to manipulate our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
              <p className="text-gray-600">
                All content, features, and functionality of our services are owned by BizIntel and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Payment Terms</h2>
              <p className="text-gray-600">
                Certain services may require payment. You agree to provide accurate billing information and authorize us to charge the applicable fees. All fees are non-refundable unless otherwise specified.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-600">
                BizIntel shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Termination</h2>
              <p className="text-gray-600">
                We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Contact Information</h2>
              <p className="text-gray-600">
                For any questions regarding these terms, please contact us at:
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