import { useEffect, useState } from "react";
import { ICourseEntrolled } from "../../services/types";
import { entrolledCourseData, getRatings } from "../../api/user";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  Container,
  Rating,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface EnrolledCoursesProps {
  userId: string;
}

export interface CourseRating {
  _id: string;
  title: string;
  averageRating: number;
  totalReviews: number;
}

const MotionBox = motion(Box);

export default function EnrolledCourses({ userId }: EnrolledCoursesProps) {
  const [courses, setCourses] = useState<ICourseEntrolled[]>([]);
  const [ratings, setRatings] = useState<CourseRating[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrolledCourses();
    getAllRatings();
  }, []);

  const getAllRatings = async () => {
    try {
      const response = await getRatings();
      if (response) {
        setRatings(response.getRate);
      }
    } catch (error) {
      console.error("Error fetching the ratings:", error);
      setRatings([]);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const response = await entrolledCourseData(userId);
      if (response && response.data) {
        setCourses(response.data);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.log("Error fetching enrolled courses:", error);
    }
  };

  const getCourseRating = (courseId: string) => {
    const courseRating = ratings.find((rating) => rating._id === courseId);
    return courseRating ? courseRating.averageRating : 1;
  };

  const handleCourseView = (courseId: string) => {
    try {
      navigate("/coursePage/viewCourse", {
        state: {
          CourseData: courseId,
        },
      });
    } catch (error) {
      console.log(
        "Fetching this course encountered an error. Please try again later."
      );
    }
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px - 64px)", 
        overflow: "auto",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Your Enrolled Courses
        </Typography>
        <Grid container spacing={4}>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={course._id}>
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
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ height: 200, objectFit: "cover" }}
                      image={course.thumbnailImgUrl}
                      alt={course.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "bold", mb: 2 }}
                      >
                        {course.title}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          Rating:
                        </Typography>
                        {getCourseRating(course._id as string) ? (
                          <Rating
                            value={getCourseRating(course._id as string) || 0}
                            readOnly
                            precision={0.1}
                            size="small"
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No rating available
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                    <Box sx={{ p: 2 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleCourseView(course._id as string)}
                        sx={{
                          backgroundColor: "#f5f5f6",
                          color: "#000",
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </Card>
                </MotionBox>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                No courses found.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
