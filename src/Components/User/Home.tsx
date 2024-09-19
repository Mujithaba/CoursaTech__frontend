import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import { getCourses, getHomeData } from "../../api/user";
import { ICourse } from "../../services/types";

const MotionBox = motion(Box);

interface IInstructor {
  _id: string;
  name: string;
  profileUrl: string;
  position: string;
}

interface ICourseHomePage {
  _id: string;
  courseName: string;
  thumbnail: string;
  averageRating: number;
  instructor: IInstructor;
}

const Home: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [ratedCourse, setRatedCourse] = useState<ICourseHomePage[]>([]);
  const [topInstructor, setTopInstructor] = useState<IInstructor[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [courses, setCourses] = useState<ICourse[]>([]);

  const handleCoursePage = () => {
    if (userInfo) {
      navigate("/coursePage");
    } else {
      toast.info(
        <motion.div
          className="p-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-lg font-semibold text-red-600 mb-2">
            You are not logged in! Please log in to continue.
          </div>
          <motion.button
            className="bg-gray-900 text-white py-2 px-6 rounded-full font-mono hover:bg-gray-700 transition-all ease-in-out duration-300"
            onClick={() => navigate("/login")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </motion.div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: true,
          draggable: true,
          hideProgressBar: true,
          icon: <span>🔒</span>,
        }
      );
    }
  };

  useEffect(() => {
    getHomePageData();
    
  }, []);

  const getHomePageData = async () => {
    try {
      const response = await getHomeData();
      if (response) {
        setRatedCourse(response.data.homeData);
        setTopInstructor(response.data.instructorArray);
      }
    } catch (error) {
      console.error("Error fetching the home data:", error);
    }
  };

  console.log(ratedCourse, topInstructor, "popopop");

 

  const handleCourseView = (courseId: string) => {
    try {
      navigate("/coursePage/viewCourse", {
        state: {
          CourseData: courseId,
        },
      });
    } catch (error) {
      console.log("fetching this course have some error, Please try later");
    }
  };

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
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2024/08/14/14/41/home-based-learning-8968710_1280.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <Container maxWidth="md">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ fontWeight: "bold", px: 4, py: 1.5 }}
              onClick={handleCoursePage}
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
            {ratedCourse.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={course.thumbnail}>
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
                      className="h-[200px]"
                      image={course.thumbnail}
                      alt={course.courseName}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontWeight="bold"
                      >
                        {course.courseName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Instructor: {course.instructor.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Reated:{" "}
                        <span className="text-black font-serif font-semibold">
                          {course.averageRating.toFixed(1)}⭐
                        </span>
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2 }}>
                      {userInfo == null ? (
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={handleCoursePage}
                        >
                          Learn More
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={() => handleCourseView(course._id)}
                        >
                          Learn More
                        </Button>
                      )}
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
          {topInstructor.map((instructor, index) => (
            <Grid item xs={12} sm={6} md={4} key={instructor._id}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                  <Avatar
                    src={
                      instructor.profileUrl == "nopic"
                        ? "https://via.placeholder.com/100"
                        : instructor.profileUrl
                    }
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
                    {instructor.position}
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
