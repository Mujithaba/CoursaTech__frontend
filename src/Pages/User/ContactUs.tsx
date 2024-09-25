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
      <div className="w-full h-20 bg-red-200"></div>
      <div className=" bg-gray-50">
        {/* Background Image */}

        <div className="flex ">
          <img
            className="w-full mx-8 h-96  mt-8 rounded-md"
            src="https://img.freepik.com/free-photo/contact-us-communication-support-service-assistance-concept_53876-128103.jpg?t=st=1726651789~exp=1726655389~hmac=618210b9e547520afe68cf8eea3d12174b233cf06391f31134b2604d1ac24de9&w=1380"
            alt=""
          />
        </div>

        {/* Content Section */}
        <motion.div
          className="relative z-10 max-w-6xl mx-auto p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              className="flex flex-col justify-center items-start space-y-8 p-8 bg-white shadow-lg rounded-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-semibold text-gray-700">
                Reach Out to Us
              </h2>

              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-indigo-600" size={30} />
                <div>
                  <p className="text-gray-600">123 Learning Avenue</p>
                  <p className="text-gray-600">City, State, Country</p>
                </div>
                {/* <ContactusLottie/> */}
              </div>

              <div className="flex items-center space-x-4">
                <FaPhone className="text-indigo-600" size={30} />
                <p className="text-gray-600">+1 234 567 890</p>
              </div>

              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-indigo-600" size={30} />
                <p className="text-gray-600">contact@e-learning.com</p>
              </div>
            </motion.div>

            {/* Social Media or Direct Call Section */}
            <motion.div
              className="flex flex-col justify-center items-start space-y-8 p-8 bg-white shadow-lg rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-3xl font-semibold text-gray-700">
                Connect With Us
              </h2>

              <p className="text-gray-600">
                Follow us on our social media channels or give us a call. We're
                here to help!
              </p>

              <div className="flex space-x-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-700 hover:text-blue-600 transition duration-300"
                  >
                    <FaFacebook size={36} />
                  </motion.div>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-700 hover:text-blue-400 transition duration-300"
                  >
                    <FaTwitter size={36} />
                  </motion.div>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-700 hover:text-pink-500 transition duration-300"
                  >
                    <FaInstagram size={36} />
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
