'use client';

import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-800 pt-24">
      {/* Header Section */}
      <header>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
      </header>

      {/* Content Section */}
      <main className="py-12 px-4 max-w-7xl mx-auto">
        {/* Intro */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold">Introduction</h2>
          <p className="mt-4 text-gray-600">
            At <span className="font-medium">Helm Textile Mills</span>, your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services.
          </p>
        </section>

        {/* Section 1: Information We Collect */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold">1. Information We Collect</h3>
          <p className="mt-4 text-gray-600">
            We collect different types of information to provide and improve our services:
          </p>
          <ul className="mt-4 list-disc pl-6 text-gray-600 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone number, shipping/billing address, and company details.
            </li>
            <li>
              <strong>Usage Data:</strong> IP address, browser type, pages visited, and access time.
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> Used to enhance your browsing experience.
            </li>
          </ul>
        </section>

        {/* Section 2: How We Use Your Information */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold">2. How We Use Your Information</h3>
          <p className="mt-4 text-gray-600">
            We use the collected information for purposes such as:
          </p>
          <ul className="mt-4 list-disc pl-6 text-gray-600 space-y-2">
            <li>Processing and fulfilling orders</li>
            <li>Responding to inquiries and providing customer support</li>
            <li>Sending updates about products or services</li>
            <li>Improving our website and tailoring content</li>
          </ul>
        </section>

        {/* Section 3: How We Share Your Information */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold">3. How We Share Your Information</h3>
          <ul className="mt-4 list-disc pl-6 text-gray-600 space-y-2">
            <li>
              <strong>Service Providers:</strong> Trusted third parties for payment processing or logistics.
            </li>
            <li>
              <strong>Legal Compliance:</strong> Information shared when required by law.
            </li>
            <li>
              <strong>Business Transactions:</strong> In cases of mergers or acquisitions.
            </li>
          </ul>
          <p className="mt-4 text-gray-600">
            We do not sell your personal information to third parties.
          </p>
        </section>

        {/* Section 4: Data Security */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold">4. Data Security</h3>
          <p className="mt-4 text-gray-600">
            We implement reasonable safeguards to protect your information. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        {/* Section 5: Your Rights */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold">5. Your Rights</h3>
          <p className="mt-4 text-gray-600">
            Depending on your location, you may have rights such as accessing, correcting, or deleting your data. To exercise these rights, contact us at <strong>info@helmtex.co.za</strong>.
          </p>
        </section>

        {/* Section 6: Updates */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold">6. Updates to This Privacy Policy</h3>
          <p className="mt-4 text-gray-600">
            We may update this Privacy Policy periodically. Please check this page for changes.
          </p>
        </section>

        {/* Section 7: Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
            <p>
              If you have questions or concerns, please contact us:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Phone:</strong> +27 11 493 5495</li>
              <li><strong>Email:</strong> <a href="mailto:info@helmtex.co.za" className="text-blue-500 hover:underline">info@helmtex.co.za</a></li>
              <li><strong>Address:</strong> 33 Fennell Street, New Centre, Johannesburg, 2001</li>
            </ul>
          </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#00378b] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Helm Textile Mills. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
