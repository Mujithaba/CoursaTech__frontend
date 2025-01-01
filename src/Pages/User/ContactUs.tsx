import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const ContactPage: React.FC = () => {
  return (
    <>
      <div className="w-full h-12 sm:h-16 md:h-20 bg-red-200"></div>
      <div className="bg-gray-50 min-h-screen">
        {/* Background Image */}
        <div className="px-4 sm:px-6 md:px-8">
          <img
            className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover mt-4 sm:mt-6 md:mt-8 rounded-md"
            src="https://img.freepik.com/free-photo/contact-us-communication-support-service-assistance-concept_53876-128103.jpg?t=st=1726651789~exp=1726655389~hmac=618210b9e547520afe68cf8eea3d12174b233cf06391f31134b2604d1ac24de9&w=1380"
            alt="Contact Us Banner"
          />
        </div>

        {/* Content Section */}
        <motion.div
          className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Contact Information */}
            <motion.div
              className="flex flex-col justify-center items-start space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">
                Reach Out to Us
              </h2>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <FaMapMarkerAlt className="text-indigo-600 text-2xl sm:text-3xl flex-shrink-0" />
                <div>
                  <p className="text-sm sm:text-base text-gray-600">123 Learning Avenue</p>
                  <p className="text-sm sm:text-base text-gray-600">City, State, Country</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <FaPhone className="text-indigo-600 text-2xl sm:text-3xl flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-600">+1 234 567 890</p>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <FaEnvelope className="text-indigo-600 text-2xl sm:text-3xl flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-600 break-all">contact@e-learning.com</p>
              </div>
            </motion.div>

            {/* Social Media Section */}
            <motion.div
              className="flex flex-col justify-center items-start space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">
                Connect With Us
              </h2>

              <p className="text-sm sm:text-base text-gray-600">
                Follow us on our social media channels or give us a call. We're
                here to help!
              </p>

              <div className="flex space-x-4 sm:space-x-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-transform duration-300 hover:scale-110"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-700 hover:text-blue-600 transition duration-300"
                  >
                    <FaFacebook className="w-8 h-8 sm:w-9 sm:h-9" />
                  </motion.div>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-transform duration-300 hover:scale-110"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-700 hover:text-blue-400 transition duration-300"
                  >
                    <FaTwitter className="w-8 h-8 sm:w-9 sm:h-9" />
                  </motion.div>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-transform duration-300 hover:scale-110"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-700 hover:text-pink-500 transition duration-300"
                  >
                    <FaInstagram className="w-8 h-8 sm:w-9 sm:h-9" />
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ContactPage;