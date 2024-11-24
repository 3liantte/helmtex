'use client';

import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-800 py-16 px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Refund Policy</h1>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-gray-600">
              <strong>Effective Date:</strong> [Insert Date]
            </p>
            <p className="mt-2">
              At Helm Textile Mills, we are committed to customer satisfaction. If you are not satisfied with your purchase, we are here to help. Please review our refund policy for more information on how we handle returns, exchanges, and refunds.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Refund Eligibility</h2>
            <p>
              To be eligible for a refund, your purchase must meet the following conditions:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>The item must be unused and in the same condition that you received it.</li>
              <li>The item must be in the original packaging.</li>
              <li>The item must be returned within [X] days from the date of purchase.</li>
            </ul>
            <p className="mt-2">
              If the item is damaged, defective, or incorrect, please contact us immediately for assistance.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Non-Refundable Items</h2>
            <p>
              Certain items are not eligible for a refund, including:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Customized or personalized items.</li>
              <li>Items marked as non-returnable at the time of purchase.</li>
              <li>Gift cards or promotional items.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How to Request a Refund</h2>
            <p>
              To request a refund, please follow these steps:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Contact our customer service team at <a href="mailto:info@helmtex.co.za" className="text-blue-500 hover:underline">info@helmtex.co.za</a> with your order number and a description of the issue.</li>
              <li>Provide any required documentation, including images of the item and proof of purchase.</li>
              <li>Once we process your request, we will issue a refund to your original payment method.</li>
            </ul>
            <p className="mt-2">
              Please allow 1 - 5 business days for processing and refunds to be reflected in your account.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Exchanges</h2>
            <p>
              If you would like to exchange an item for a different size or color, please contact us within 7 days of receiving the item. If the exchange is approved, we will provide instructions for returning the original item and receiving the replacement.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Processing Time</h2>
            <p>
              Refunds and exchanges typically take up to 14 business days to process. You will be notified via email once your request has been approved.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Shipping Costs</h2>
            <p>
              Shipping costs for returning an item are the responsibility of the customer, unless the item is defective or incorrect. We recommend using a trackable shipping service or purchasing shipping insurance for returns. We do not guarantee that we will receive your returned item.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Refunds Processing</h2>
            <p>
              Once we receive your returned item and approve the refund, we will initiate the refund to your original payment method. Depending on your payment provider, it may take additional time for the refund to appear in your account.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about our refund policy or need further assistance, please contact our customer support team at:
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

export default RefundPolicy;
