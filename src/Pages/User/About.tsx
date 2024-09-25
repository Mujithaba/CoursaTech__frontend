import { motion } from "framer-motion";
import aboutSection from "/Logo/images/aboutSection.jpg";

const About = () => {
  // Animation variants for staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between each child animation
      },
    },
  };

  // Animation for each feature card
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Placeholder section (if necessary) */}
      <div className="w-full h-14 bg-red-200"></div>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Cover Image */}
          <motion.div
            className="w-full mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              className="h-96 w-full object-cover rounded-md"
              src={aboutSection}
              alt="aboutSection"
            />
          </motion.div>
          {/* About Us Text */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
            <p className="mt-4 text-lg text-gray-600">
              Welcome to our e-learning platform! We are dedicated to providing
              high-quality, accessible, and engaging learning experiences for
              everyone. Join us to expand your skills and knowledge at your own
              pace, anytime, anywhere.
            </p>
          </motion.div>

          {/* Feature Cards with Staggered Animations */}
          <motion.div
            className="mt-12 flex flex-col lg:flex-row justify-between items-center gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* First Feature */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={featureVariants}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                Expert Tutors
              </h3>
              <p className="mt-4 text-gray-600">
                Learn from the best in the industry with experienced tutors and
                mentors who guide you through each step of your learning
                journey.
              </p>
            </motion.div>

            {/* Second Feature */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={featureVariants}
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                Flexible Learning
              </h3>
              <p className="mt-4 text-gray-600">
                Access courses at any time, from anywhere, with a flexible
                curriculum that suits your schedule.
              </p>
            </motion.div>

            {/* Third Feature */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={featureVariants}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                Interactive Lessons
              </h3>
              <p className="mt-4 text-gray-600">
                Engage with interactive lessons and activities designed to make
                learning fun and effective.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
