'use client';

import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-800 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Terms of Use</h1>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-gray-600">
              <strong>Effective Date:</strong> 15-01-2024
            </p>
            <p className="mt-2">
              Welcome to Helm Textile Mills' website. By accessing or using our website, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, you must not use our website.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Website Usage</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Users must be at least 18 years old or have parental/guardian consent to use the website.</li>
              <li>Access to certain features of the website may require user registration.</li>
              <li>Users agree to provide accurate, complete, and current information when registering or using our website.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property Rights</h2>
            <p>
              All content on this website, including but not limited to text, graphics, images, logos, and software, is the property of Helm Textile Mills or its licensors. Users may not copy, distribute, or reproduce any content without prior written consent.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Prohibited Activities</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Using the website for illegal purposes or to solicit unlawful activity.</li>
              <li>Attempting to interfere with the website’s functionality, including through hacking or introducing malicious code.</li>
              <li>Impersonating another person or misrepresenting your affiliation with an entity.</li>
              <li>Using automated tools (e.g., bots, spiders) to access or scrape the website.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. User-Generated Content</h2>
            <p>
              Users may submit content (e.g., reviews, comments) to the website, provided it is not illegal, defamatory, or infringing on others' rights. By submitting content, you grant Helm Textile Mills a non-exclusive, royalty-free, worldwide license to use, reproduce, and display the content.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Links to Third-Party Websites</h2>
            <p>
              This website may contain links to external sites for user convenience. Helm Textile Mills does not endorse or control these third-party websites and is not responsible for their content or policies.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p>
              Helm Textile Mills shall not be liable for any damages, including direct, indirect, incidental, or consequential damages, arising from your use or inability to use the website.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
            <p>
              This website is provided "as is" without any warranties, express or implied. Helm Textile Mills makes no representations or warranties about the website's accuracy, completeness, or availability.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Privacy</h2>
            <p>
              Your use of this website is governed by our <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>. By using the website, you consent to our collection and use of your data as outlined in the Privacy Policy.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Indemnification</h2>
            <p>
              Users agree to indemnify and hold harmless Helm Textile Mills and its affiliates from any claims, damages, or expenses arising from their use of the website or violation of these Terms of Use.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Modifications to Terms</h2>
            <p>
              Helm Textile Mills reserves the right to update these Terms of Use at any time. Continued use of the website constitutes acceptance of any changes.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
            <p>
              These Terms of Use shall be governed by the laws of [Insert Jurisdiction], without regard to conflict of law principles.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
            <p>
              For questions or concerns regarding these Terms of Use, please contact us at:
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

export default TermsOfUse;
