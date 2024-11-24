'use client';

import React from 'react';

const TermsAndServices = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-800 py-16 px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Terms and Services</h1>

        <div className="space-y-8">
          {/* Effective Date */}
          <section>
            <p className="text-gray-600">
              <strong>Effective Date:</strong> 15-01-2024
            </p>
            <p className="mt-2">
              Welcome to Helm Textile Mills. These Terms and Services govern your use of our website, products, and services. By accessing our website or purchasing our products, you agree to be bound by the terms outlined below.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>
              By using our website or services, you confirm that you have read, understood, and agreed to these Terms and Services. If you do not agree, you must not use our website or services.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Scope of Services</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Textile manufacturing and supply services.</li>
              <li>Custom fabric designs and bulk production.</li>
              <li>Sales and support through our website and other communication channels.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Orders and Payments</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>All orders placed through our website or representatives are subject to acceptance and availability.</li>
              <li>Prices are listed in ZAR and may be subject to applicable taxes and shipping charges.</li>
              <li>Payments must be made through approved methods, and orders will only be processed upon receipt of full payment.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Shipping and Delivery</h2>
            <p>
              Shipping timelines are provided as estimates and may vary based on location, order size, and unforeseen circumstances. Helm Textile Mills is not responsible for delays caused by customs, carriers, or other external factors.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Returns and Refunds</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Returns or exchanges are only accepted for defective or damaged items within 14 days of receipt.</li>
              <li>Refunds will be issued once the returned items are inspected and approved.</li>
              <li>Custom orders are non-refundable unless there is a proven defect.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p>
              All content, including images, text, logos, and designs, on the Helm Textile Mills website, are protected by copyright laws. You may not reproduce, distribute, or modify any of our intellectual property without prior written consent.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. User Conduct</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Use our website and services lawfully.</li>
              <li>Not engage in activities that disrupt the website or infringe on others' rights.</li>
              <li>Refrain from sharing malicious software, spam, or unauthorized advertising.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p>
              Helm Textile Mills is not liable for any indirect, incidental, or consequential damages arising from your use of our services or website. Our liability is limited to the amount paid for the products or services in question.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Privacy</h2>
            <p>
              Your use of our services is also governed by our <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>, which explains how we collect, use, and safeguard your data.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
            <p>
              These Terms and Services shall be governed by the laws of Companies Act No. 71 of 2008, without regard to its conflict of law principles.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Modifications to Terms</h2>
            <p>
              Helm Textile Mills reserves the right to update these terms at any time. Changes will be effective upon posting to our website. Your continued use of our services constitutes acceptance of any updated terms.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
            <p>
              For inquiries regarding these Terms and Services, please contact us:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Phone:</strong> +27 11 493 5495</li>
              <li><strong>Email:</strong> <a href="mailto:info@helmtex.co.za" className="text-blue-500 hover:underline">info@helmtex.co.za</a></li>
              <li><strong>Address:</strong> 33 Fennell Street, New Centre, Johannesburg, 2001</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndServices;
