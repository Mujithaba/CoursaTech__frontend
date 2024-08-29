// import React, { useEffect, useState } from "react";
// import s from "/Logo/images/ai-generated-8309926_1280.jpg";
// import course from "/Logo/images/otp-backgroud-image.jpg";
// import becomeTutor from "/Logo/images/pexels-george-milton-6954188.jpg";
// import Tutor from "/Logo/images/pexels-hasibullah-zhowandai-248954-819530.jpg";
// // import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logOut } from "../../redux/slices/authSlice";
// import { RootState } from "../../redux/store";
// import { homePageData } from "../../api/user";

// // import React from 'react';
// import { Button, Card, CardContent, CardMedia, Grid, Typography, Box } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   isBlocked: boolean;
// }

// function Home() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [users, setUsers] = useState<User[]>([]);

//   const logoutHandler = async () => {
//     try {
//       dispatch(logOut());
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const { userInfo } = useSelector((state: RootState) => state.auth);

//   const fetchHomeData = async () => {
//     try {
//       if (userInfo) {
//         console.log(userInfo._id, "jjjj");

//         const response = await homePageData(userInfo._id);
//         console.log(response, "home response");
//         if (response.data.data) {
//           if (response.data.data.isBlocked) {
//             dispatch(logOut());
//             navigate("/login");
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   useEffect(() => {
//     fetchHomeData();
//   }, []);

//   // return (
//   //   <div className="bg-gray-100 ">
//   //     <div className="  px-6 py-12 flex flex-col md:flex-row rounded items-center bg-green-100">
//   //       <section className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
//   //         <div className="md:w-1/2">
//   //           <h1 className="text-4xl font-bold mb-4">
//   //             Welcome to Our E-Learning Platform
//   //           </h1>
//   //           <p className="text-xl mb-2">
//   //             Enhance your skills with the best online courses
//   //           </p>
//   //           <h2 className="text-xl font-bold mb-4">Learn from the Best</h2>
//   //           <p className="text-gray-600 mb-4">
//   //             Join our platform and get access to top-notch courses that will
//   //             help you grow your skills and advance your career.
//   //           </p>
//   //           {/* <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">Sign Up</a> */}
//   //           {userInfo ? (
//   //             <button
//   //               className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-blue-400"
//   //               onClick={logoutHandler}
//   //             >
//   //               logout
//   //             </button>
//   //           ) : (
//   //             <Link
//   //               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
//   //               to="/register"
//   //             >
//   //               Sign Up
//   //             </Link>
//   //           )}
//   //         </div>
//   //         <div className="md:w-1/2">
//   //           <img src={s} alt="Learning" className="rounded" />
//   //         </div>
//   //       </section>
//   //     </div>
//   //     {/* Container hero Section */}

//   //     {/* Popular Courses Section */}
//   //     <section className="container mx-auto px-6 py-12">
//   //       <h2 className="text-3xl font-bold text-center mb-6">
//   //         Popular Available Courses
//   //       </h2>
//   //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//   //         <div className="bg-white p-6 rounded shadow-md  hover:bg-green-100">
//   //           <img src={course} alt="Course" className="mb-4 rounded" />
//   //           <h3 className="text-xl font-bold mb-2">Course Title</h3>
//   //           <p className="text-gray-600 mb-4">
//   //             Short description of the course.
//   //           </p>
//   //           <p className="text-gray-600 ">★★★★★</p>
//   //           <a href="#" className="text-blue-500 hover:underline">
//   //             Learn More
//   //           </a>
//   //         </div>
//   //         <div className="bg-white p-6 rounded shadow-md  hover:bg-green-100">
//   //           <img src={course} alt="Course" className="mb-4 rounded" />
//   //           <h3 className="text-xl font-bold mb-2">Course Title</h3>
//   //           <p className="text-gray-600 mb-4">
//   //             Short description of the course.
//   //           </p>
//   //           <p className="text-gray-600 ">★★★★★</p>
//   //           <a href="#" className="text-blue-500 hover:underline">
//   //             Learn More
//   //           </a>
//   //         </div>
//   //         <div className="bg-white p-6 rounded shadow-md  hover:bg-green-100">
//   //           <img src={course} alt="Course" className="mb-4 rounded" />
//   //           <h3 className="text-xl font-bold mb-2">Course Title</h3>
//   //           <p className="text-gray-600 mb-4">
//   //             Short description of the course.
//   //           </p>
//   //           <p className="text-gray-600 ">★★★★★</p>
//   //           <a href="#" className="text-blue-500 hover:underline">
//   //             Learn More
//   //           </a>
//   //         </div>
//   //         <div className="bg-white p-6 rounded shadow-md  hover:bg-green-100">
//   //           <img src={course} alt="Course" className="mb-4 rounded" />
//   //           <h3 className="text-xl font-bold mb-2">Course Title</h3>
//   //           <p className="text-gray-600 mb-4">
//   //             Short description of the course.
//   //           </p>
//   //           <p className="text-gray-600 ">★★★★★</p>
//   //           <a href="#" className="text-blue-500 hover:underline">
//   //             Learn More
//   //           </a>
//   //         </div>
//   //         {/* Repeat similar blocks for more courses */}
//   //       </div>
//   //     </section>

//   //     {/* Main Section */}
//   //     <section className="container mx-auto px-6 py-12 flex flex-col md:flex-row rounded items-center bg-green-100">
//   //       <div className="md:w-1/2 ">
//   //         <img
//   //           src={becomeTutor}
//   //           alt="Main Content"
//   //           className="rounded"
//   //           style={{ width: "500px", height: "500px" }}
//   //         />
//   //       </div>
//   //       <div className="md:w-1/2 md:ml-6 mt-6 md:mt-0">
//   //         <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
//   //         <p className="text-gray-600 mb-4">
//   //           We provide high-quality courses with industry experts to help you
//   //           achieve your goals.
//   //         </p>
//   //       </div>
//   //     </section>

//   //     {/* Top Instructor of the Month */}
//   //     <section className="container mx-auto px-6 py-12 text-center">
//   //       <h2 className="text-3xl font-bold mb-6">Top Instructor of the Month</h2>
//   //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//   //         <div className="p-10">
//   //           <div className="bg-white p-6 rounded shadow-md">
//   //             <img
//   //               src={Tutor}
//   //               alt="Instructor"
//   //               className="rounded-full mb-4 mx-auto w-24 h-24"
//   //             />
//   //             <h3 className="text-xl font-bold mb-2">Instructor Name</h3>
//   //             <p className="text-gray-600 mb-4">★★★★★</p>
//   //           </div>
//   //         </div>
//   //         <div className="p-10">
//   //           <div className="bg-white p-6 rounded shadow-md">
//   //             <img
//   //               src={Tutor}
//   //               alt="Instructor"
//   //               className="rounded-full mb-4 mx-auto w-24 h-24"
//   //             />
//   //             <h3 className="text-xl font-bold mb-2">Instructor Name</h3>
//   //             <p className="text-gray-600 mb-4">★★★★★</p>
//   //           </div>
//   //         </div>
//   //         <div className="p-10">
//   //           <div className="bg-white p-6 rounded shadow-md">
//   //             <img
//   //               src={Tutor}
//   //               alt="Instructor"
//   //               className="rounded-full mb-4 mx-auto w-24 h-24"
//   //             />
//   //             <h3 className="text-xl font-bold mb-2">Instructor Name</h3>
//   //             <p className="text-gray-600 mb-4">★★★★★</p>
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </section>
//   //   </div>
//   // );

//   const topCourses = [
//     { id: 1, title: 'Web Development Bootcamp', instructor: 'John Doe', image: 'https://www.cdmi.in/courses@2x/data-science.webp' },
//     { id: 2, title: 'Data Science Fundamentals', instructor: 'Jane Smith', image: '/path/to/image2.jpg' },
//     { id: 3, title: 'Mobile App Development', instructor: 'Bob Johnson', image: '/path/to/image3.jpg' },
//   ];

//   const topInstructors = [
//     { id: 1, name: 'Dr. Alice Brown', specialization: 'Computer Science', image: '/path/to/instructor1.jpg' },
//     { id: 2, name: 'Prof. Charlie Green', specialization: 'Data Analysis', image: '/path/to/instructor2.jpg' },
//     { id: 3, name: 'Eng. David White', specialization: 'Software Engineering', image: '/path/to/instructor3.jpg' },
//   ];

//   const MotionBox = motion(Box);

//   return (
//     <Box className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
//       {/* Hero Section */}
//       <Box className="hero min-h-screen flex items-center justify-center">
//         <MotionBox
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center"
//         >
//           <Typography variant="h2" component="h1" gutterBottom>
//             Welcome to E-Learning
//           </Typography>
//           <Typography variant="h5" gutterBottom>
//             Empower your future with our cutting-edge online courses.
//           </Typography>
//           <Button variant="contained" color="primary" size="large">
//             Get Started
//           </Button>
//         </MotionBox>
//       </Box>

//       {/* Top Courses Section */}
//       <Box className="py-16">
//         <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Typography variant="h3" component="h2" align="center" gutterBottom>
//             Top Courses
//           </Typography>
//           <Grid container spacing={3} justifyContent="center">
//             {topCourses.map((course, index) => (
//               <Grid item xs={12} sm={6} md={4} key={course.id}>
//                 <MotionBox
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                 >
//                   <Card>
//                     <CardMedia
//                       component="img"
//                       height="140"
//                       image={course.image}
//                       alt={course.title}
//                     />
//                     <CardContent>
//                       <Typography gutterBottom variant="h5" component="div">
//                         {course.title}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Instructor: {course.instructor}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </MotionBox>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       </Box>

//       {/* Top Instructors Section */}
//       <Box className="py-16 bg-gray-100">
//         <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Typography variant="h3" component="h2" align="center" gutterBottom>
//             Top Instructors
//           </Typography>
//           <Grid container spacing={3} justifyContent="center">
//             {topInstructors.map((instructor, index) => (
//               <Grid item xs={12} sm={6} md={4} key={instructor.id}>
//                 <MotionBox
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                 >
//                   <Card>
//                     <CardMedia
//                       component="img"
//                       height="140"
//                       image={instructor.image}
//                       alt={instructor.name}
//                     />
//                     <CardContent>
//                       <Typography gutterBottom variant="h5" component="div">
//                         {instructor.name}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {instructor.specialization}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </MotionBox>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       </Box>

//       {/* Become an Instructor Section */}
//       <Box className="py-16">
//         <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <MotionBox
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center"
//           >
//             <Typography variant="h3" component="h2" gutterBottom>
//               Share Your Knowledge
//             </Typography>
//             <Typography variant="h6" gutterBottom>
//               Become an instructor and help others learn while earning
//             </Typography>
//             <Link to="/become-instructor" style={{ textDecoration: 'none' }}>
//               <Button variant="contained" color="secondary" size="large">
//                 Become an Instructor
//               </Button>
//             </Link>
//           </MotionBox>
//         </Box>
//       </Box>
//     </Box>
//   );

// }

// export default Home;

import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  Container,
  Avatar,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { School, Laptop, Group } from "@mui/icons-material";

const MotionBox = motion(Box);

const Home: React.FC = () => {
  const navigate = useNavigate()
  const topCourses = [
    {
      id: 1,
      title: "Web Development ",
      instructor: "John Doe",
      image: "https://cdn.dribbble.com/users/808903/screenshots/3831862/dribbble_szablon__1_1.png?resize=800x600&vertical=cen",
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      instructor: "Jane Smith",
      image: "https://cdn.dribbble.com/users/808903/screenshots/3831862/dribbble_szablon__1_1.png?resize=800x600&vertical=cen",
    },
    {
      id: 3,
      title: "Mobile App Development",
      instructor: "Bob Johnson",
      image: "https://cdn.dribbble.com/users/808903/screenshots/3831862/dribbble_szablon__1_1.png?resize=800x600&vertical=cen",
    },
  ];

  const topInstructors = [
    {
      id: 1,
      name: "Dr. Alice Brown",
      specialization: "Computer Science",
      image: "https://source.unsplash.com/random/200x200?woman",
    },
    {
      id: 2,
      name: "Prof. Charlie Green",
      specialization: "Data Analysis",
      image: "https://source.unsplash.com/random/200x200?man",
    },
    {
      id: 3,
      name: "Eng. David White",
      specialization: "Software Engineering",
      image: "https://source.unsplash.com/random/200x200?person",
    },
  ];

  return (
    <Box>

      {/* Hero Section */}
      <Box
        sx={{
          height: "90vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          color: "darkblue",
          backgroundImage: "url('https://cdn.pixabay.com/photo/2024/08/14/14/41/home-based-learning-8968710_1280.png')", // Add your image URL here
    backgroundSize: "cover", // Ensures the image covers the entire background
    backgroundPosition: "center", // Centers the image
    backgroundBlendMode: "overlay", // Blends the gradient with the image
        }}
      >
        <Container maxWidth="md">
          
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            {/* <Typography
              variant="h2"
              component="h1"
              gutterBottom
              fontWeight="bold"
              
            >
              Unlock Your Potential with E-Learning
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
              Discover world-class courses and expert instructors to fuel your
              learning journey.
            </Typography> */}
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ fontWeight: "bold", px: 4, py: 1.5 }}
            >
              Explore Courses
            </Button>
          </MotionBox>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Grid container spacing={4}>
          {[
            {
              icon: <School fontSize="large" />,
              title: "Expert Instructors",
              description: "Learn from industry professionals",
            },
            {
              icon: <Laptop fontSize="large" />,
              title: "Flexible Learning",
              description: "Study at your own pace, anywhere",
            },
            {
              icon: <Group fontSize="large" />,
              title: "Community Support",
              description: "Engage with peers and mentors",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {feature.icon}
                  <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Top Courses Section */}
      <Box sx={{ py: 8, backgroundColor: "#f5f5f5" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            fontWeight="bold"
          >
            Top-Rated Courses
          </Typography>
          <Grid container spacing={4}>
            {topCourses.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={course.image}
                      alt={course.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontWeight="bold"
                      >
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Instructor: {course.instructor}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2 }}>
                      <Button variant="outlined" fullWidth>
                        Learn More
                      </Button>
                    </Box>
                  </Card>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Top Instructors Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          fontWeight="bold"
        >
          Meet Our Top Instructors
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {topInstructors.map((instructor, index) => (
            <Grid item xs={12} sm={6} md={4} key={instructor.id}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                  <Avatar
                    src={instructor.image}
                    alt={instructor.name}
                    sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
                  />
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    fontWeight="bold"
                  >
                    {instructor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {instructor.specialization}
                  </Typography>
                </Paper>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Become an Instructor Section */}
      <Box sx={{ py: 8, backgroundColor: "#1a237e", color: "white" }}>
        <Container maxWidth="md">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              fontWeight="bold"
            >
              Share Your Expertise
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
              Become an instructor and inspire learners worldwide
            </Typography>
            <Link to="/tutor/tutorLogin" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ fontWeight: "bold", px: 4, py: 1.5 }}
                
              >
                Start Teaching Today
              </Button>
            </Link>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
