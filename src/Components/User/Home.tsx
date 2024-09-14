

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
