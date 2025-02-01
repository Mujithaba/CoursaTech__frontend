import  { useState } from 'react';
import { motion } from "framer-motion";
import aboutSection from "/Logo/images/aboutSection.jpg";

const About = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Placeholder section */}
      <div className="w-full h-10 sm:h-12 md:h-14 bg-red-200"></div>

      {/* About Section */}
      <section id="about" className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Cover Image with Skeleton */}
          <div className="relative w-full mb-8 sm:mb-10 md:mb-12">
            {/* Skeleton */}
            <motion.div
              className={`absolute inset-0 bg-gray-200 animate-pulse rounded-md ${
                imageLoaded ? 'hidden' : 'block'
              }`}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: imageLoaded ? 0 : 0.8 }}
              style={{ height: '24rem' }}
            />
            
            {/* Actual Image */}
            <motion.img
              className="h-48 sm:h-64 md:h-80 lg:h-96 w-full object-cover rounded-md"
              src={aboutSection}
              alt="aboutSection"
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* About Us Text */}
          <motion.div
            className="text-center px-4 sm:px-6 md:px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              About Us
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Welcome to our e-learning platform! We are dedicated to providing
              high-quality, accessible, and engaging learning experiences for
              everyone. Join us to expand your skills and knowledge at your own
              pace, anytime, anywhere.
            </p>
          </motion.div>

          {/* Feature Cards with Staggered Animations */}
          <motion.div
            className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* First Feature */}
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-full"
              variants={featureVariants}
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Expert Tutors
              </h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
                Learn from the best in the industry with experienced tutors and
                mentors who guide you through each step of your learning journey.
              </p>
            </motion.div>

            {/* Second Feature */}
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-full"
              variants={featureVariants}
              whileHover={{ scale: 1.02, rotate: -1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Flexible Learning
              </h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
                Access courses at any time, from anywhere, with a flexible
                curriculum that suits your schedule.
              </p>
            </motion.div>

            {/* Third Feature */}
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-full sm:col-span-2 lg:col-span-1"
              variants={featureVariants}
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Interactive Lessons
              </h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
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












































// import { motion } from "framer-motion";
// import aboutSection from "/Logo/images/aboutSection.jpg";

// const About = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   const featureVariants = {
//     hidden: { opacity: 0, y: 50 },
//     show: { opacity: 1, y: 0 },
//   };

//   return (
//     <>
//       {/* Placeholder section */}
//       <div className="w-full h-10 sm:h-12 md:h-14 bg-red-200"></div>

//       {/* About Section */}
//       <section id="about" className="py-8 sm:py-12 md:py-16 bg-gray-100">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-12">
//           {/* Cover Image */}
//           <motion.div
//             className="w-full mb-8 sm:mb-10 md:mb-12"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <img
//               className="h-48 sm:h-64 md:h-80 lg:h-96 w-full object-cover rounded-md"
//               src={aboutSection}
//               alt="aboutSection"
//             />
//           </motion.div>

//           {/* About Us Text */}
//           <motion.div
//             className="text-center px-4 sm:px-6 md:px-8"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
//               About Us
//             </h2>
//             <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
//               Welcome to our e-learning platform! We are dedicated to providing
//               high-quality, accessible, and engaging learning experiences for
//               everyone. Join us to expand your skills and knowledge at your own
//               pace, anytime, anywhere.
//             </p>
//           </motion.div>

//           {/* Feature Cards with Staggered Animations */}
//           <motion.div
//             className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
//             variants={containerVariants}
//             initial="hidden"
//             animate="show"
//           >
//             {/* First Feature */}
//             <motion.div
//               className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-full"
//               variants={featureVariants}
//               whileHover={{ scale: 1.02, rotate: 1 }}
//               transition={{ type: "spring", stiffness: 200 }}
//             >
//               <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
//                 Expert Tutors
//               </h3>
//               <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
//                 Learn from the best in the industry with experienced tutors and
//                 mentors who guide you through each step of your learning journey.
//               </p>
//             </motion.div>

//             {/* Second Feature */}
//             <motion.div
//               className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-full"
//               variants={featureVariants}
//               whileHover={{ scale: 1.02, rotate: -1 }}
//               transition={{ type: "spring", stiffness: 200 }}
//             >
//               <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
//                 Flexible Learning
//               </h3>
//               <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
//                 Access courses at any time, from anywhere, with a flexible
//                 curriculum that suits your schedule.
//               </p>
//             </motion.div>

//             {/* Third Feature */}
//             <motion.div
//               className="bg-white p-4 sm:p-6 rounded-lg shadow-lg h-full sm:col-span-2 lg:col-span-1"
//               variants={featureVariants}
//               whileHover={{ scale: 1.02, rotate: 1 }}
//               transition={{ type: "spring", stiffness: 200 }}
//             >
//               <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
//                 Interactive Lessons
//               </h3>
//               <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
//                 Engage with interactive lessons and activities designed to make
//                 learning fun and effective.
//               </p>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default About;

