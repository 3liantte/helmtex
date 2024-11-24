import React from "react";
import Footer from "../Footer/Footer";

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-between pt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {/* Contact Information */}
        <div className="bg-[#00378b] text-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-6">Say something to start a live chat!</p>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="material-icons mr-3">phone</span>
              <span>+1 012 3456 789</span>
            </div>
            <div className="flex items-center">
              <span className="material-icons mr-3">email</span>
              <span>demo@gmail.com</span>
            </div>
            <div className="flex items-center">
              <span className="material-icons mr-3">location_on</span>
              <span>33 Fennell Street, New Centre, Johannesburg, 2001</span>
            </div>
          </div>
          <div className="flex mt-6 space-x-4">
            {/* Social Icons */}
            <a href="#" className="text-xl hover:text-gray-300">Twitter</a>
            <a href="#" className="text-xl hover:text-gray-300">Instagram</a>
            <a href="#" className="text-xl hover:text-gray-300">Whatsapp</a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-[#00378b] p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-6">Any questions or remarks? Just write us a message!</p>
          <form>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Subject:</label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="subject"
                    className="mr-2"
                  />
                  General Inquiry
                </label>
                <label>
                  <input
                    type="radio"
                    name="subject"
                    className="mr-2"
                  />
                  Feedback
                </label>
                <label>
                  <input
                    type="radio"
                    name="subject"
                    className="mr-2"
                  />
                  Support
                </label>
              </div>
            </div>
            <div className="mb-6">
              <textarea
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#00378b] text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 w-full">
        <Footer/>
      </div>
    </div>
  );
};

export default ContactPage;